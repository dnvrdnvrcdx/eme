# Denver — Personal Archive

A minimal, dark-mode personal profile and toolkit page designed to be hosted with GitHub Pages and embedded in Google Sites.

## Design

- Near-black background with muted sage accents
- Space Grotesk headings, DM Sans body text, IBM Plex Mono metadata
- Responsive profile section
- Crossfade profile-image hover interaction
- Tool groups for creative/design, development, and AI/research
- No build step or dependencies required

## Customize your profile images

Replace these two files with your own images, keeping the same filenames:

- `assets/profile.svg` — default image
- `assets/profile-alt.svg` — image shown on hover

If you use JPG or PNG instead, update the `src` paths in `index.html` to match.

## Customize your GitHub link

In `index.html`, find the `https://github.com/` link and replace it with your profile URL.

## Publish with GitHub Pages

1. Upload the repository contents to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. Wait for the published URL to appear in Pages settings.
5. Open Google Sites, choose **Insert → Embed → By URL**, and paste the published URL.

Google Fonts are loaded from Google Fonts when online. The page remains usable if fonts cannot load, using system fallbacks.
