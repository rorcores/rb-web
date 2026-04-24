"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const VIDEOS = [
  "/videos/intro-1.mp4",
  "/videos/intro-2.mp4",
  "/videos/intro-3.mp4",
  "/videos/intro-4.mp4",
  "/videos/intro-5.mp4",
];

const PLAYBACK_SPEED = 0.5;
const EDGE = 0.15;

function PingPongVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelled = false;
    let direction: 1 | -1 = 1;
    let rafId = 0;
    let lastFrameTime = 0;

    const playForward = () => {
      if (cancelled) return;
      direction = 1;
      video.playbackRate = PLAYBACK_SPEED;
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const stepReverse = (now: number) => {
      if (cancelled) return;

      if (lastFrameTime === 0) {
        lastFrameTime = now;
        rafId = requestAnimationFrame(stepReverse);
        return;
      }

      const dt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      const next = video.currentTime - PLAYBACK_SPEED * dt;

      if (next <= EDGE) {
        try {
          video.currentTime = EDGE;
        } catch {}
        lastFrameTime = 0;
        playForward();
        return;
      }

      try {
        video.currentTime = next;
      } catch {}
      rafId = requestAnimationFrame(stepReverse);
    };

    const startReverse = () => {
      if (cancelled) return;
      direction = -1;
      video.pause();
      lastFrameTime = 0;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(stepReverse);
    };

    const onTimeUpdate = () => {
      if (
        direction === 1 &&
        Number.isFinite(video.duration) &&
        video.currentTime >= video.duration - EDGE
      ) {
        startReverse();
      }
    };

    const onEnded = () => {
      if (direction === 1) startReverse();
    };

    const start = () => {
      if (cancelled) return;
      video.pause();
      try {
        video.currentTime = EDGE;
      } catch {}
      playForward();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= 2 && video.duration) {
      start();
    } else {
      video.addEventListener("loadeddata", start, { once: true });
    }

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        cancelAnimationFrame(rafId);
      } else {
        if (direction === 1) playForward();
        else {
          lastFrameTime = 0;
          rafId = requestAnimationFrame(stepReverse);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", start);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={styles.video}
      src={src}
      muted
      playsInline
      preload="auto"
      disableRemotePlayback
    />
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.videoGrid} aria-hidden="true">
        {VIDEOS.map((src) => (
          <PingPongVideo key={src} src={src} />
        ))}
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.rb}>RB</h1>
        <p className={styles.contact}>team@rorybuilds.com</p>
      </div>
    </main>
  );
}
