# Project AgroScan — Documentation Website

33 pages, fully static (no build step). Nature/field-journal theme, animated intro,
responsive nav, schema.org markup on every page (Organization, WebSite, Breadcrumb,
Person, Product, FAQPage, ImageObject, EducationalOrganization, DigitalDocument),
a photo gallery, a full downloads archive, and a dedicated Project Director page.

## Deploy to Netlify (free) — 2 minutes

1. Go to https://app.netlify.com → **Add new site → Deploy manually**.
2. Drag this entire folder (the one containing `index.html`) into the upload box.
   Netlify deploys it instantly at a random `*.netlify.app` URL.
3. Go to **Site configuration → Domain management → Add a custom domain**.
4. Enter `2026.agroscan.dpdns.org` and follow Netlify's DNS instructions —
   since `dpdns.org` is a Duck DNS-style dynamic subdomain service, you'll add
   a **CNAME record** pointing `2026` to your Netlify site's `xxxx.netlify.app`
   address, wherever you manage that dpdns.org subdomain's DNS.
5. Netlify auto-provisions a free HTTPS certificate once DNS resolves (can take
   a few minutes to a few hours).

## What's inside

- `index.html` + 31 other pages — see `sitemap.html` for the full list, or
  `sitemap.xml` / `llms.txt` for machine-readable versions.
- `assets/css/style.css` — the whole design system (one file, no build tools).
- `assets/js/main.js` — intro animation, mobile nav, scroll reveal, contact form.
- `assets/img/` — team photos, hero image, gallery images, logo.
- `downloads/` — all 14 original project documents (docx/pdf), linked from
  the Downloads page and cross-linked from the page that covers each one.
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO + AI-crawler groundwork.

## After deploying — a few things worth doing yourself

- **Swap the mailto fallback for a real form handler.** The contact form
  currently opens the visitor's email client (works with zero setup, but isn't
  a true silent submission). Netlify Forms is the easiest free upgrade: add
  `netlify` and `data-netlify="true"` attributes to the `<form>` tag in
  `contact.html` and Netlify will start capturing submissions automatically.
- **Verify the Director's portfolio link** (`abhinavranjan.qzz.io`) resolves —
  it's linked from `director.html` exactly as given.
- **Compress `agroscan-logo.png`** (currently ~1.2MB) if you want faster
  first-paint; everything else is already web-sized.
- **Google Search Console**: once live, submit `sitemap.xml` there so the
  ~30 pages get indexed and the schema markup (FAQ, Person, Product, images)
  becomes eligible for rich results.
