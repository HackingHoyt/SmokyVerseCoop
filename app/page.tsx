'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="home-container">
      <h1 className="hero-title">
        Welcome to <span className="highlight">SmokyVerse Co-op</span>
      </h1>
      <p className="hero-subtitle">
        Your gateway to locally-owned digital experiences — build your own website or upgrade an existing one to Web3.
      </p>
      <Link href="/build">
        <img
          src="/images/sample.jpg"
          alt="SmokyVerse Co-op"
          className="homepage-image"
        />
      </Link>
    </main>
  );
}
