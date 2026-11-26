# Kunal Deshmukh — Portfolio (kunaldeshmukh.dev)

Single-page portfolio: 3D laptop hero (Three.js), GSAP + ScrollTrigger, Lenis smooth scroll, and a small gravity sandbox.
Everything is bundled locally. No build step, no install, works offline.

## Folder
```
index.html          the whole site (HTML + CSS + JS)
favicon.svg  og-image.png  robots.txt  sitemap.xml
assets/js/          three, gsap, ScrollTrigger, TextPlugin, lenis (local copies)
assets/fonts/       Space Grotesk + Instrument Serif (woff2)
assets/css/fonts.css
```

## Preview locally
Double-click `index.html`, or: `python -m http.server 8000` and open http://localhost:8000

## Deploy to kunaldeshmukh.dev
1. Put this folder on any static host. Easiest: **Netlify** (drag the folder onto app.netlify.com/drop) or **Vercel** (`vercel` inside the folder) or **GitHub Pages**.
2. In the host's dashboard open **Domain settings > Add custom domain** and enter `kunaldeshmukh.dev`.
3. At your domain registrar, set the DNS records the host shows you (usually an A record for the root and a CNAME for `www`).
4. Wait for HTTPS to turn on (a few minutes). The canonical link, social preview image and sitemap already point to `https://kunaldeshmukh.dev/`.

## What to update later (all in index.html)
- New project: copy one `<article class="card pj">` block inside `#trk`.
- New certificate: copy one `<div class="card tilt rv cert">` block inside `#credentials`.
- Journey entry: add an `<li>` in `#experience` (the animated scene supports 3 steps).
- Everything shown here (ranks, scores, dates, links) comes from your resume and public GitHub README. Re-check it before big changes.

## Notes
- Light and dark theme follow the device, with a toggle in the nav.
- Respects the "reduce motion" accessibility setting.
- Libraries: three r128, GSAP 3.12.5, Lenis 1.1.13 (each keeps its own licence).
