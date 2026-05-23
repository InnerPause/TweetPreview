# A Simple Tweet Preview

A clean, accurate browser-based tool for previewing how a post will appear on X (formerly Twitter) — including precise image cropping, profile picture lookup, and an authentic X UI aesthetic. No installation, no dependencies, no data sent anywhere. Just open the file and use it.

---

## Features

- **Accurate image cropping** — Multi-image layouts match X's actual feed behavior exactly:
  - 1 image: natural aspect ratio, clamped between 3:4 (portrait) and 2:1 (landscape)
  - 2 images: side-by-side, each cropped to 7:8
  - 3 images: left image at 7:8, right two stacked at 7:4 each
  - 4 images: 2×2 grid, each cropped to 16:9
- **Live profile picture lookup** — Type any X handle and the real profile picture is fetched and displayed in the preview automatically
- **Drag-to-reorder images** — Reorder uploaded images by dragging thumbnails, with full touch support for mobile
- **Character counter** — Live ring indicator matching X's compose UI, with colour warnings at 20 remaining and over-limit
- **Hashtag & mention highlighting** — `#hashtags` and `@mentions` render in blue in the preview
- **Randomised engagement stats** — Reply, retweet, and like counts are randomly generated on each load, always in a realistic order (likes > retweets > replies)
- **Dark & light mode** — Defaults to dark mode, theme preference saved across sessions via localStorage
- **Authentic X aesthetic** — Colours, typography, spacing, and UI patterns match the X interface closely
- **Fully self-contained** — Single HTML file, zero external dependencies, no build step required

---

## Usage

### Option A — Use the live GitHub Pages site

Visit the hosted version directly in your browser:
```
https://innerpause.github.io/TweetPreview/
```

### Option B — Run locally

1. Clone or download the repository
2. Open `index.html` in any modern browser
3. No server required — the file runs entirely in the browser

```bash
git clone https://github.com/innerpause/TweetPreview.git
cd TweetPreview
open index.html   # macOS
# or just double-click index.html on Windows/Linux
```

---

## How to Use

| Field | Description |
|---|---|
| **Handle** | Enter an X username (without `@`). The real profile picture will load automatically after a short delay. |
| **Display Name** | The name displayed in bold above the handle in the preview. |
| **Post Text** | The body of the tweet. Supports hashtags and mentions. 280 character limit with live counter. |
| **Images** | Upload up to 4 images via click or drag-and-drop. Drag the numbered thumbnails to reorder them. Click ✕ to remove an image. |

**Theme toggle** — The "Light Mode / Dark Mode" button in the top-right corner switches themes. Your preference is remembered for future visits.

**Reordering images on mobile** — Hold and drag a thumbnail to a new position. A floating ghost image follows your finger to indicate what you're moving.

---

## Image Crop Reference

This tool replicates X's dynamic image cropping system. Here's what to expect:

| Images | Layout |
|---|---|
| 1 | Full width, aspect ratio preserved between 3:4 and 2:1 |
| 2 | Side by side, each cell 7:8 (portrait) |
| 3 | Left column 7:8, right column two cells each 7:4 |
| 4 | 2×2 grid, each cell 16:9 |

The **first image in the list** occupies the dominant position (full left column for 3 images, top-left for 4). Use the drag-to-reorder feature to control which image is most prominent.

---

## Progressive Web App (PWA)

A Simple Tweet Preview is installable as a PWA on both mobile and desktop.

**On mobile (iOS / Android):**
Open the site in your browser, tap the share icon, and choose **"Add to Home Screen"**. The app will appear on your home screen with its own icon and launch in standalone mode — no browser chrome, no address bar, just the tool.

**On desktop (Chrome / Edge):**
An install icon appears in the browser address bar when you visit the site. Click it to install the app as a standalone window.

**Offline support:**
Once installed, the app shell is cached by the Service Worker and works fully offline. The only feature that requires a live network connection is profile picture lookup — if offline, the avatar gracefully falls back to the display name initial with no error shown.

---

## Repository Structure

```
TweetPreview/
├── index.html          # The entire application
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline caching & PWA logic
├── icons/
│   ├── icon-192.png    # App icon (192×192) — replace with your own
│   └── icon-512.png    # App icon (512×512) — replace with your own
└── README.md
```

---



- **No frameworks or libraries** — written in plain HTML, CSS, and vanilla JavaScript
- **No server-side code** — everything runs in the browser
- **Profile picture fetching** uses [unavatar.io](https://unavatar.io), a free open-source service for fetching social avatars. Lookups are cached within the session to avoid redundant requests. If a handle is not found or the account is private, the avatar gracefully falls back to the first initial of the display name.
- **Theme persistence** uses `localStorage`. If unavailable (e.g. private browsing with storage blocked), the app defaults to dark mode silently.
- **Touch drag-and-drop** is implemented with native touch events (`touchstart`, `touchmove`, `touchend`) rather than the HTML5 Drag API, which does not fire on touch screens.

---

## Browser Compatibility

Works in all modern browsers. Requires support for:
- CSS custom properties
- CSS `aspect-ratio`
- `FileReader` API
- `localStorage` (optional — used only for theme persistence)

| Browser | Support |
|---|---|
| Chrome / Edge 88+ | ✅ Full |
| Firefox 89+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Mobile Chrome / Safari | ✅ Full (including touch reorder) |

---

## Limitations

- Profile picture lookup relies on the third-party [unavatar.io](https://unavatar.io) service. Private accounts, deactivated accounts, or rate-limited requests will fall back to the initial letter avatar.
- This is a **preview tool only** — it does not post to X or interact with the X API in any way.
- Animated GIF playback in the image grid is not guaranteed across all browsers.

---

## Credits

Developed by [@InnerPause](https://x.com/InnerPause)

---

## License

This project is open source. Feel free to fork, modify, and use it however you like.
