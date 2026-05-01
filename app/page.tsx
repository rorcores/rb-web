import styles from "./page.module.css";

type Sponsor = {
  name: string;
  src: string;
};

const SPONSORS: Sponsor[] = [
  { name: "Partiful", src: "/sponsors/partiful.png" },
  { name: "Checkmate", src: "/sponsors/checkmate.svg" },
  { name: "Migrate", src: "/sponsors/migrate.svg" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <img
          className={styles.prism}
          src="/brand/prism.png"
          alt=""
          aria-hidden="true"
        />
        <p className={styles.byline}>By Rory Garton-Smith</p>
        <h1 className={styles.wordmark}>For Those Who Build</h1>
        <div className={styles.meta}>
          <a className={styles.contact} href="mailto:team@forthosewho.build">
            team@forthosewho.build
          </a>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.season}>Season 01 — Coming Soon</span>
        </div>
      </section>

      <Sponsors />
    </main>
  );
}

function Sponsors() {
  return (
    <section className={styles.sponsorsBlock} aria-label="Sponsors">
      <div className={styles.sponsorsHeader}>Supported By</div>
      <div className={styles.sponsorsRow}>
        {SPONSORS.map((s) => (
          <div
            key={s.name}
            role="img"
            aria-label={s.name}
            className={styles.sponsor}
            style={{
              WebkitMaskImage: `url(${s.src})`,
              maskImage: `url(${s.src})`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
