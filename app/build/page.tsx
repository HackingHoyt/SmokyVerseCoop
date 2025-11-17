'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function BuildPage() {
  // Site name + selected layout
  const [siteName, setSiteName] = useState('');
  const [layout, setLayout] = useState<'WHAT_TO_DO' | 'WHERE_TO_EAT' | 'WHERE_TO_STAY' | ''>('');

  // All form fields
  const [fields, setFields] = useState({
    address: '',
    phone: '',
    email: '',
    website: '',
    hours: '',
    logoUrl: '',
    // layout-specific bits
    activityType: '',     // What to Do
    restaurantType: '',   // Where to Eat
    lodgingType: '',      // Where to Stay
    details: '',          // long details / story
    shortDescription: '', // short teaser
  });

  // Handle any input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle layout button click
  const handleLayoutSelect = (selected: 'WHAT_TO_DO' | 'WHERE_TO_EAT' | 'WHERE_TO_STAY') => {
    setLayout(selected);
  };

    const handleGenerateClick = async () => {
    if (!siteName || !layout) {
      alert('Please enter a site name and choose a layout.');
      return;
    }

    // Decide layout text based on selection
    let layoutHeading = '';
    ...


    // Optional logo (uses URL entered by the user)
    const logoBlock = fields.logoUrl
      ? `<div class="logo-wrap">
           <img src="${fields.logoUrl}" alt="${siteName} logo" class="logo" />
         </div>`
      : '';

    // Build full HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${siteName}</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #141b3a 0, #050712 45%, #020308 100%);
      color: #e6f3ff;
    }
    .page {
      max-width: 960px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 3rem;
    }
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    header h1 {
      font-size: 2rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #00aaff;
      text-shadow: 0 0 12px rgba(0, 170, 255, 0.85);
      margin-bottom: 0.4rem;
    }
    header p {
      margin: 0.1rem 0;
      color: #9fb4ff;
      font-size: 0.95rem;
    }
    .built-with {
      font-size: 0.8rem;
      margin-top: 0.4rem;
    }
    .layout-label {
      margin-top: 0.75rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #7fd2ff;
    }
    .tagline {
      margin-top: 0.2rem;
      font-size: 0.95rem;
      color: #c6d7ff;
    }
    .logo-wrap {
      margin-top: 1.2rem;
    }
    .logo {
      max-width: 220px;
      border-radius: 12px;
      box-shadow: 0 0 25px rgba(0, 170, 255, 0.75);
    }
    .section {
      margin-top: 2rem;
      padding-top: 1.3rem;
      border-top: 1px solid rgba(0, 170, 255, 0.35);
    }
    .section h2 {
      font-size: 1.2rem;
      margin: 0 0 0.7rem;
      color: #7fd2ff;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .section p {
      margin: 0.25rem 0;
      font-size: 0.98rem;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem 1.5rem;
      margin-top: 0.75rem;
      font-size: 0.95rem;
    }
    .contact-grid p {
      margin: 0.15rem 0;
    }
    .footer-note {
      margin-top: 2.5rem;
      font-size: 0.8rem;
      color: #8d9cff;
      text-align: center;
      opacity: 0.85;
    }
    a {
      color: #5fd0ff;
    }
    @media (max-width: 640px) {
      .page {
        padding: 2rem 1.1rem 2.5rem;
      }
      header h1 {
        font-size: 1.65rem;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <header>
      <h1>${siteName}</h1>
      <p class="built-with">Built with the SmokeyVerse Co-op Website Builder.</p>
      <p class="layout-label">${layoutHeading.toUpperCase()} &mdash; Smokey Mountains</p>
      <p class="tagline">${layoutTagline}</p>
      ${logoBlock}
    </header>

    ${layoutBody}

    <section class="section">
      <h2>Plan Your Visit</h2>
      <div class="contact-grid">
        <p><strong>Location:</strong> ${fields.address || '123 Smoky Mountain Way'}</p>
        <p><strong>Phone:</strong> ${fields.phone || 'Add your phone number here'}</p>
        <p><strong>Email:</strong> ${fields.email || 'Add your email here'}</p>
        <p><strong>Website:</strong> ${
          fields.website
            ? `<a href="${fields.website}" target="_blank" rel="noreferrer">${fields.website}</a>`
            : 'Add your website link here'
        }</p>
        <p><strong>Hours:</strong> ${fields.hours || 'Add your hours here'}</p>
      </div>
    </section>

    ${
      fields.shortDescription
        ? `<section class="section">
             <h2>Quick Snapshot</h2>
             <p>${fields.shortDescription}</p>
           </section>`
        : ''
    }

    <p class="footer-note">
      Want your own site? Visit <a href="https://smokyversecoop.com" target="_blank" rel="noreferrer">SmokeyVerse Co-op</a>.
    </p>
  </div>
</body>
</html>`;

    // Zip it and download
    const zip = new JSZip();
    zip.file('index.html', htmlContent);
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${siteName || 'smokyverse-site'}.zip`);
  };

  return (
    <main>
      {/* Title */}
      <div className="builder-header">
        <h1 className="builder-title">SmokeyVerse Website Builder</h1>
        <p className="builder-subtitle">
          Create a one-page site and download it as a ZIP – ready to upload anywhere.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleGenerateClick(); }} className="builder-card">
        {/* Site Name */}
        <section className="field-group">
          <h2 className="builder-section-title">Site Name</h2>
          <input
            type="text"
            name="siteName"
            placeholder="Hoyt&apos;s Hangings"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </section>

        {/* Layout selector */}
        <section className="field-group">
          <h2 className="builder-section-title">Choose a Layout</h2>
          <p className="builder-helper">
            Use these for &quot;What to Do&quot;, &quot;Where to Eat&quot;, or &quot;Where to Stay&quot; listings.
          </p>
          <div className="layout-selector">
            <button
              type="button"
              className={layout === 'WHAT_TO_DO' ? 'active' : ''}
              onClick={() => handleLayoutSelect('WHAT_TO_DO')}
            >
              What to Do
            </button>
            <button
              type="button"
              className={layout === 'WHERE_TO_EAT' ? 'active' : ''}
              onClick={() => handleLayoutSelect('WHERE_TO_EAT')}
            >
              Where to Eat
            </button>
            <button
              type="button"
              className={layout === 'WHERE_TO_STAY' ? 'active' : ''}
              onClick={() => handleLayoutSelect('WHERE_TO_STAY')}
            >
              Where to Stay
            </button>
          </div>
        </section>

        {/* Contact info */}
        <section className="field-group">
          <h2 className="builder-section-title">Contact Info</h2>
          <div className="contact-grid">
            <div className="field-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Smoky Mountain Way, Gatlinburg, TN"
                value={fields.address}
                onChange={handleChange}
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(865) 123-4567"
                value={fields.phone}
                onChange={handleChange}
              />
            </div>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-grid">
            <div className="field-group">
              <label htmlFor="website">Website (optional)</label>
              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={fields.website}
                onChange={handleChange}
              />
            </div>
            <div className="field-group">
              <label htmlFor="hours">Hours</label>
              <input
                id="hours"
                name="hours"
                type="text"
                placeholder="Mon–Sat: 10am – 8pm"
                value={fields.hours}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Logo URL */}
        <section className="field-group">
          <h2 className="builder-section-title">Logo Image URL (optional)</h2>
          <p className="builder-helper">
            Paste a direct link to an image (PNG / JPG). It will show near the top of your site.
          </p>
          <input
            name="logoUrl"
            type="url"
            placeholder="https://example.com/your-logo.png"
            value={fields.logoUrl}
            onChange={handleChange}
          />
        </section>

        {/* Layout-specific details */}
        <section className="field-group">
          <h2 className="builder-section-title">Layout Details</h2>

          {layout === 'WHAT_TO_DO' && (
            <div className="field-group">
              <label htmlFor="activityType">Activity Type</label>
              <input
                id="activityType"
                name="activityType"
                type="text"
                placeholder="Hiking tour, museum, escape room, ghost walk, etc."
                value={fields.activityType}
                onChange={handleChange}
              />
            </div>
          )}

          {layout === 'WHERE_TO_EAT' && (
            <div className="field-group">
              <label htmlFor="restaurantType">Restaurant Type</label>
              <input
                id="restaurantType"
                name="restaurantType"
                type="text"
                placeholder="BBQ, diner, coffee shop, food truck, etc."
                value={fields.restaurantType}
                onChange={handleChange}
              />
            </div>
          )}

          {layout === 'WHERE_TO_STAY' && (
            <div className="field-group">
              <label htmlFor="lodgingType">Lodging Type</label>
              <input
                id="lodgingType"
                name="lodgingType"
                type="text"
                placeholder="Cabin, motel, campground, glamping, etc."
                value={fields.lodgingType}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="field-group">
            <label htmlFor="details">Long Details / Story</label>
            <textarea
              id="details"
              name="details"
              rows={4}
              placeholder="Describe what makes this place or experience unique."
              value={fields.details}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="shortDescription">Short teaser (optional)</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={2}
              placeholder="One- or two-sentence highlight visitors will see near the bottom."
              value={fields.shortDescription}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Main CTA */}
        <button type="submit" className="primary-cta">
          Generate &amp; Download My Site
        </button>
        <p className="builder-footer-text">
          Your ZIP will include a single <code>index.html</code> file you can upload anywhere.
        </p>
      </form>
    </main>
  );
}
