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
    let lastTime = 0;
    let rafId = 0;

    video.playbackRate = PLAYBACK_SPEED;
    video.muted = true;

    const safePlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const tick = (now: number) => {
      if (cancelled) return;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (lastTime === 0) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 1 / 15);
      lastTime = now;

      if (direction === 1) {
        if (video.playbackRate !== PLAYBACK_SPEED) {
          video.playbackRate = PLAYBACK_SPEED;
        }
        if (video.paused && !document.hidden) {
          safePlay();
        }
        if (video.currentTime >= duration - EDGE) {
          direction = -1;
          video.pause();
        }
      } else {
        if (!video.paused) video.pause();
        const next = video.currentTime - PLAYBACK_SPEED * dt;
        if (next <= EDGE) {
          try {
            video.currentTime = EDGE;
          } catch {}
          direction = 1;
          if (!document.hidden) safePlay();
        } else {
          try {
            video.currentTime = next;
          } catch {}
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (cancelled) return;
      try {
        video.currentTime = EDGE;
      } catch {}
      safePlay();
      lastTime = 0;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 2 && Number.isFinite(video.duration)) {
      start();
    } else {
      video.addEventListener("loadeddata", start, { once: true });
    }

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        lastTime = 0;
        if (direction === 1) safePlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
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
        <img
          className={styles.prism}
          src="/brand/prism.png"
          alt=""
          aria-hidden="true"
        />
        <h1 className={styles.wordmark}>
          <span>For</span> <span>Those</span> <span>Who</span>{" "}
          <span className={styles.wordmarkAccent}>Build</span>
        </h1>
        <p className={styles.byline}>
          By <em>Rory Garton-Smith</em>
        </p>
        <p className={styles.contact}>team@forthosewho.build</p>
        <p className={styles.season}>
          <span className={styles.seasonDot} aria-hidden="true" />
          Season 01 — Coming Soon
        </p>
      </div>
      <Sponsors />
    </main>
  );
}

type Sponsor = {
  name: string;
  src: string;
  asMask?: boolean;
};

const SPONSORS: Sponsor[] = [
  { name: "Partiful", src: "/sponsors/partiful.png" },
  { name: "Checkmate", src: "/sponsors/checkmate.svg", asMask: true },
  { name: "Migrate", src: "/sponsors/migrate.svg", asMask: true },
];

function Sponsors() {
  return (
    <section className={styles.sponsorsBlock} aria-label="Sponsors">
      <div className={styles.sponsorsHeader}>
        Proudly <em>Supported</em> By
      </div>
      <div className={styles.sponsorsRow}>
        {SPONSORS.map((s) => (
          <div className={styles.sponsorTile} key={s.name}>
            <span className={styles.cornerBL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />
            {s.asMask ? (
              <div
                role="img"
                aria-label={s.name}
                className={styles.sponsorLogoMask}
                style={{
                  WebkitMaskImage: `url(${s.src})`,
                  maskImage: `url(${s.src})`,
                }}
              />
            ) : (
              <img
                className={styles.sponsorLogo}
                src={s.src}
                alt={s.name}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
