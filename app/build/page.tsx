'use client';

import { useState, ChangeEvent } from 'react';

type LayoutType = 'stay' | 'eat' | 'do';

interface BuilderState {
  layout: LayoutType;
  siteName: string;
  tagline: string;
  highlight: string;
  heroImageDataUrl: string | null;
}

const DEFAULT_IMAGE =
  'https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function BuildPage() {
  const [state, setState] = useState<BuilderState>({
    layout: 'stay',
    siteName: 'Smoky Mountain Getaway',
    tagline: 'Unplug, unwind, and wake up in the clouds.',
    highlight: 'Mountain views • Fast Wi-Fi • Cozy fireplaces',
    heroImageDataUrl: null,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleLayoutChange = (layout: LayoutType) => {
    setState((prev) => ({ ...prev, layout }));
  };

  const handleInputChange =
    (field: keyof BuilderState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setState((prev) => ({
        ...prev,
        heroImageDataUrl: typeof reader.result === 'string' ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const currentHeroImage = state.heroImageDataUrl || DEFAULT_IMAGE;

  const layoutLabel = (layout: LayoutType) => {
    switch (layout) {
      case 'stay':
        return 'Where to Stay';
      case 'eat':
        return 'Where to Eat';
      case 'do':
        return 'What to Do';
      default:
        return 'Layout';
    }
  };

  const generateHtml = () => {
    const title = state.siteName || 'SmokyVerse Site';
    const layoutText =
      state.layout === 'stay'
        ? 'Where to Stay'
        : state.layout === 'eat'
        ? 'Where to Eat'
        : 'What to Do';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --bg: #020617;
      --card: #020617;
      --accent: #22d3ee;
      --accent-soft: rgba(34,211,238,0.25);
      --text-main: #e5f2ff;
      --text-muted: #8ca2c0;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: radial-gradient(circle at top, #0b1120 0, #000 60%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      align-items: stretch;
      justify-content: center;
    }
    .shell {
      max-width: 1100px;
      width: 100%;
      margin: 24px;
      border-radius: 24px;
      padding: 24px;
      background: linear-gradient(135deg, #020617, #020617);
      border: 1px solid rgba(148,163,184,0.4);
      box-shadow:
        0 0 0 1px rgba(15,23,42,0.9),
        0 0 40px rgba(56,189,248,0.35);
    }
    .badge {
      display: inline-flex;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.5);
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
      background: rgba(15,23,42,0.9);
    }
    .hero {
      display: grid;
      gap: 20px;
    }
    @media (min-width: 900px) {
      .hero {
        grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
        align-items: center;
      }
    }
    .hero-main-title {
      font-size: 34px;
      line-height: 1.05;
      margin: 12px 0 8px;
    }
    @media (min-width: 900px) {
      .hero-main-title { font-size: 40px; }
    }
    .hero-tagline {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 460px;
    }
    .hero-highlight {
      margin-top: 16px;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid rgba(56,189,248,0.4);
      background: radial-gradient(circle at left, rgba(56,189,248,0.18), rgba(15,23,42,0.95));
      color: #e0faff;
      font-size: 13px;
    }
    .hero-image-shell {
      border-radius: 20px;
      padding: 6px;
      background: radial-gradient(circle at top, rgba(56,189,248,0.85), rgba(15,23,42,1));
      box-shadow:
        0 0 45px rgba(56,189,248,0.55),
        0 0 0 1px rgba(15,23,42,1);
    }
    .hero-image-inner {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(15,23,42,0.9);
      background: #020617;
    }
    .hero-image-inner img {
      display: block;
      width: 100%;
      height: 260px;
      object-fit: cover;
    }
    @media (min-width: 900px) {
      .hero-image-inner img {
        height: 320px;
      }
    }
    .pill-row {
      display: inline-flex;
      gap: 8px;
      margin-top: 20px;
      font-size: 11px;
    }
    .pill {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.6);
      color: var(--text-muted);
      background: rgba(15,23,42,0.9);
    }
    .pill--accent {
      border-color: rgba(56,189,248,0.95);
      color: #e0faff;
      background: radial-gradient(circle at top, rgba(56,189,248,0.85), rgba(15,23,42,0.95));
    }
    .footer {
      margin-top: 26px;
      padding-top: 18px;
      border-top: 1px dashed rgba(51,65,85,0.9);
      font-size: 11px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    a {
      color: #38bdf8;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main class="shell">
    <span class="badge">${layoutText} • Powered by SmokyVerse Co-op</span>
    <section class="hero">
      <div>
        <h1 class="hero-main-title">${title}</h1>
        <p class="hero-tagline">${state.tagline}</p>
        <div class="hero-highlight">${state.highlight}</div>
        <div class="pill-row">
          <span class="pill pill--accent">Built with SmokyVerse Builder</span>
          <span class="pill">Locally owned. Community grown.</span>
        </div>
      </div>
      <div class="hero-image-shell">
        <div class="hero-image-inner">
          <img src="${currentHeroImage}" alt="Hero image" />
        </div>
      </div>
    </section>
    <div class="footer">
      <span>Customize this file as much as you want. It’s all yours.</span>
      <span>Generated with ♥ by SmokyVerse Co-op Builder.</span>
    </div>
  </main>
</body>
</html>`;

    return html;
  };

  const handleGenerateClick = () => {
    setIsGenerating(true);
    try {
      const html = generateHtml();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-100 flex items-stretch justify-center px-4 py-8">
      <div className="w-full max-w-6xl border border-slate-800 rounded-3xl bg-gradient-to-b from-slate-950 to-slate-950/80 shadow-[0_0_80px_rgba(56,189,248,0.4)] p-5 md:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-sky-300/70">
              SmokyVerse Co-op
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">
              Site Builder • <span className="text-sky-300">V2</span>
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] text-slate-300/80 bg-slate-900/70 border border-sky-500/50 rounded-full px-3 py-1 shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live preview on the right • Download-ready HTML</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,1.4fr] items-start">
          {/* LEFT: Controls */}
          <div className="space-y-5">
            {/* Layout picker */}
            <section className="rounded-2xl border border-sky-500/40 bg-slate-950/70 p-4 shadow-[0_0_35px_rgba(56,189,248,0.35)]">
              <p className="text-xs font-semibold tracking-wide text-slate-300/80 mb-3">
                1 · CHOOSE LAYOUT
              </p>
              <div className="flex flex-wrap gap-2">
                {([
                  ['stay', 'Where to Stay'],
                  ['eat', 'Where to Eat'],
                  ['do', 'What to Do'],
                ] as [LayoutType, string][]).map(([value, label]) => {
                  const active = state.layout === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleLayoutChange(value)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition ${
                        active
                          ? 'bg-sky-400 text-slate-900 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]'
                          : 'bg-slate-900/70 text-slate-200 border-slate-700 hover:border-sky-400/70 hover:text-sky-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Text fields */}
            <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4 space-y-3">
              <p className="text-xs font-semibold tracking-wide text-slate-300/80">
                2 · BASIC DETAILS
              </p>

              <div className="space-y-2">
                <label className="text-[11px] text-slate-300/80">Site name</label>
                <input
                  type="text"
                  value={state.siteName}
                  onChange={handleInputChange('siteName')}
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 text-sm px-3 py-2 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70"
                  placeholder="Smoky Mountain Hideaway"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-slate-300/80">Tagline</label>
                <textarea
                  value={state.tagline}
                  onChange={handleInputChange('tagline')}
                  rows={2}
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 text-sm px-3 py-2 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70 resize-none"
                  placeholder="One or two sentences that describe the vibe."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-slate-300/80">Highlight line</label>
                <input
                  type="text"
                  value={state.highlight}
                  onChange={handleInputChange('highlight')}
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 text-sm px-3 py-2 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70"
                  placeholder="What makes this place special?"
                />
              </div>
            </section>

            {/* Image upload */}
            <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4 space-y-3">
              <p className="text-xs font-semibold tracking-wide text-slate-300/80">
                3 · HERO IMAGE (UPLOAD FROM YOUR COMPUTER)
              </p>
              <p className="text-[11px] text-slate-400">
                Pick a photo from your computer. It will show up in the live preview and in the
                generated HTML. If you don&apos;t upload anything, a default mountain image is used.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-[11px] text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-slate-950 hover:file:bg-sky-400"
              />
              {state.heroImageDataUrl && (
                <p className="text-[11px] text-emerald-400 mt-1">
                  ✅ Image loaded – check the preview on the right.
                </p>
              )}
            </section>

            {/* Generate button */}
            <section className="rounded-2xl border border-sky-500/40 bg-slate-950/80 p-4 flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-wide text-slate-300/80">
                4 · GENERATE YOUR SITE
              </p>
              <button
                type="button"
                onClick={handleGenerateClick}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 text-slate-950 font-semibold text-sm py-2.5 px-4 shadow-[0_0_35px_rgba(56,189,248,0.85)] hover:bg-sky-300 active:bg-sky-500 disabled:opacity-60 disabled:cursor-wait transition"
              >
                {isGenerating ? 'Building HTML…' : 'Generate My Site (opens new tab)'}
              </button>
              <p className="text-[11px] text-slate-400">
                When the new tab opens, you can use your browser&apos;s{' '}
                <span className="text-sky-300">Save Page As…</span> to download the file and upload
                it to Everything Smokys or any host.
              </p>
            </section>
          </div>

          {/* RIGHT: Live preview */}
          <div className="rounded-3xl border border-sky-500/40 bg-slate-950/80 p-4 md:p-5 shadow-[0_0_60px_rgba(56,189,248,0.55)] flex flex-col gap-4">
            <div className="flex items-center justify-between text-[11px] text-slate-300/80 mb-1">
              <span className="uppercase tracking-[0.2em] text-sky-300/80">Live preview</span>
              <span className="text-slate-400">
                Layout:&nbsp;
                <span className="text-sky-300">{layoutLabel(state.layout)}</span>
              </span>
            </div>

            <div className="relative rounded-2xl border border-sky-500/40 bg-gradient-to-b from-slate-950 to-slate-950/80 overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent)] pointer-events-none" />
              <div className="relative p-4 md:p-6 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-[11px] text-slate-300/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant mirror of what your visitors will see</span>
                </div>

                <div className="grid gap-4 md:grid-cols-[1.2fr,1.1fr] items-center">
                  {/* Preview text */}
                  <div className="space-y-3">
                    <p className="inline-flex px-3 py-1 rounded-full border border-slate-700 bg-slate-900/80 text-[10px] uppercase tracking-[0.2em] text-slate-300/80">
                      {layoutLabel(state.layout)}
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold leading-tight">
                      {state.siteName || 'Your SmokyVerse Site'}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-300/80">
                      {state.tagline ||
                        'Add a short tagline here so visitors instantly feel the vibe of your place.'}
                    </p>
                    <p className="text-xs text-sky-200/90 bg-slate-900/80 border border-sky-500/40 rounded-2xl px-3 py-2 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                      {state.highlight ||
                        'Highlight the top reasons people will love this spot – views, Wi-Fi, trails, food, or vibes.'}
                    </p>
                  </div>

                  {/* Preview image */}
                  <div className="relative">
                    <div className="rounded-2xl p-1 bg-gradient-to-b from-sky-400/80 via-sky-500/40 to-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.9)]">
                      <div className="rounded-xl overflow-hidden border border-slate-900/80 bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentHeroImage}
                          alt="Preview hero"
                          className="w-full h-52 md:h-60 object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-2 text-[10px] bg-slate-950/95 border border-sky-500/60 text-sky-100 px-2 py-1 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.8)]">
                      Local image ready for export
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              This preview is **exactly** what will be baked into the generated HTML file. No
              backend, no database – just clean, portable code you can drop onto any host.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
