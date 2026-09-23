# Visit Jonava

A one-page travel guide to Jonava, Lithuania, built as a Scrimba "Hometown homepage" project.

**[Live demo](https://brutall100.github.io/scrimba-hometown-jonava/)** · **[Source code](https://github.com/brutall100/scrimba-hometown-jonava)**

![Visit Jonava homepage in dark mode](docs/screenshot.png)

## About

Jonava is a small town on the Neris river, about 30 km from Kaunas. This page shows visitors the three best things to do there and introduces a local guide. It started as a simple exercise from the Scrimba Frontend Developer course. Later I redesigned it into a modern, responsive landing page with light and dark themes.

## Features

- Full-width hero with an animated headline, a pulsing location tag and clear buttons
- "Jonava in numbers" strip with numbers that count up when the page loads
- Three activity cards that lift and zoom on hover
- Guide section with a demo profile (Alex Doe) and a "Book a walk" button that shows a small toast
- Buttons that lift on hover, press down on click and send out a ripple
- Dot-grid background with a slowly pulsing glow; the grid lights up around the mouse pointer
- Light and dark themes that follow the system setting, plus a toggle that remembers your choice
- Works on phones (tested at 390px width) with no sideways scrolling
- Accessible: skip link, visible keyboard focus (`:focus-visible`), alt text and `prefers-reduced-motion` support

## Built with

- HTML5 (semantic sections, landmarks)
- CSS3: custom properties, Grid, Flexbox, `clamp()`, `color-mix()`, keyframe animations
- Vanilla JavaScript: `IntersectionObserver`, `requestAnimationFrame`, `matchMedia`
- Google Fonts: Barlow Condensed, Barlow and JetBrains Mono

## What I learned

- How to plan a page with design tokens (CSS variables) so the dark theme only changes a few colours
- How to respect user settings such as `prefers-color-scheme` and `prefers-reduced-motion`
- How to animate with `transform` and `opacity` only, so animations stay smooth and cheap
- How to throttle pointer events with `requestAnimationFrame`
- How to make a layout that works from 390px phones to wide desktop screens

## Run it locally

No build step is needed.

```bash
git clone https://github.com/brutall100/scrimba-hometown-jonava.git
cd scrimba-hometown-jonava
python3 -m http.server 8000
```

Then open <http://localhost:8000>. You can also just open `index.html` in a browser.

## Project structure

```
.
├── index.html        # page markup
├── style.css         # design tokens, layout, themes and animations
├── script.js         # theme toggle, ripple, reveal-on-scroll, count-up
├── images/           # photos of Jonava
│   ├── jonava-hero.jpg
│   ├── culture-center.jpg
│   ├── jonava-valley.jpg
│   └── bike-park.jpg
└── docs/
    └── screenshot.png
```

## Credits

- Project idea: [Scrimba](https://scrimba.com/) Frontend Developer career path
- Photos of Jonava are used for learning purposes only; all rights belong to their original authors
- The guide "Alex Doe" is a made-up demo profile
