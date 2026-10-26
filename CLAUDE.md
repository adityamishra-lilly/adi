# CLAUDE.md — Aditya Mishra personal website

Personal site for Aditya Mishra (CS student at the University of Surrey, Software Engineer placement at Eli Lilly). It will eventually hold an About/home page, Projects, Blogs, Notes and a Papershelf. It is a static site, self-hosted on a k3s homelab behind Cloudflare.

## Current stage: Stage 1 — Homepage only

**Only build what is in this section.** Later stages are listed below for context, so that Stage 1 decisions don't block them. Do not implement them.

### Stage 1 deliverables

1. An Astro + TypeScript project scaffold (see Tech stack).
2. A base layout used by every future page: `<head>` with meta/OG tags, the site header, the main content slot, and the footer.
3. Site header:
   - The wordmark "Aditya Mishra", linking to `/`.
   - The nav, rendered from `src/config/sections.ts`. Only sections with `status: "live"` appear in the nav.
   - A light/dark theme toggle (see Theme).
   - On the active page, a 3px accent underline under the wordmark or the matching nav item.
4. Homepage (`src/pages/index.astro`), top to bottom:
   - **Hero:** the greeting heading "Hey, I am Adi", a one-line tagline in the accent colour, and a profile photo on the right on desktop and above the text on mobile.
   - **Bio:** 3–5 short paragraphs with inline links. The copy lives in `src/content/home/bio.md` so it can be edited without touching code.
   - **Social links:** a row of bordered pill buttons, each an icon plus a label (GitHub, LinkedIn, Email, CV). The URLs come from `src/config/site.ts`. No follower counts.
   - **Explore grid:** a heading, a one-line subheading, and one card per section from `src/config/sections.ts`. See the card spec under Design. Sections with `status: "soon"` render as a non-clickable card with "Coming soon" instead of a count and a link.
5. Footer: copyright line and social icons.
6. Deployment files in this repo: a `Dockerfile` and an `nginx.conf` (see Deployment).

### Stage 1 acceptance criteria

- `npm run build` and `npx astro check` pass with no errors or warnings.
- The output has no client-side JavaScript except the inline theme script.
- The layout works from 360px to 1600px wide, with no horizontal scroll.
- Lighthouse scores of 95 or more for Performance and Accessibility, and 100 for Best Practices and SEO.
- Keyboard navigation works, with a visible focus ring. `prefers-reduced-motion` is respected. Text contrast is WCAG AA in both themes.
- The built image serves the site on port 8080 as a non-root user.

## Future stages (context only, do not build yet)

- **Stage 2, Blogs and Notes:** Astro content collections with Zod schemas (title, date, category, tags, draft, optional TL;DR). List pages grouped by year with category filter chips and counts, an RSS feed, and post pages with breadcrumbs, a byline with date and reading time, a TOC for long posts, Shiki code highlighting, Mermaid diagrams, an author sidebar, and previous/next links. Notes are short-form and each gets its own page.
- **Stage 3, Projects:** a card grid with name, description, language, a GitHub star count fetched at build time, and [code] and [website] links. Includes a status and a manual sort order.
- **Stage 4, Papershelf:** papers with authors, year, venue, link, tags, reading status, date read, and an annotation. Filterable by status and tag.
- **Stage 5, Topics:** tag pages shared across blogs, notes and papers, with type badges.
- The Explore-grid counts become live counts from the content collections as each section ships.

What this means for Stage 1:

- Keep `sections.ts` as the single source of truth for nav and cards.
- Keep layout pieces (header, breadcrumbs, the card) as reusable components.
- Don't hard-code anything that a later stage will need to change.

## Tech stack

- **Framework:** Astro (latest stable), TypeScript in strict mode, and npm. Astro 7 needs Node >= 22.23.4.
- **Styling:** plain CSS with custom properties in `src/styles/tokens.css`, plus scoped `<style>` blocks inside components. No Tailwind and no CSS-in-JS.
- **Fonts:** self-hosted through `@fontsource` packages. No Google Fonts requests at runtime.
- **Icons:** inline SVG components in `src/components/icons/`. No icon font.
- **Dependencies:** ask before adding any runtime dependency. Build-time integrations (`@astrojs/sitemap`, and later `@astrojs/rss` and `@astrojs/mdx`) are fine.

## Repo layout

```
src/
  config/site.ts        # name, tagline, social URLs, site URL
  config/sections.ts    # sections: id, title, description, href, status
  content/home/bio.md
  components/           # Header, Footer, ThemeToggle, SectionCard, SocialLinks, icons/
  layouts/BaseLayout.astro
  pages/index.astro
  styles/tokens.css, global.css
  assets/profile.jpg    # placeholder until Aditya supplies a photo
design-docs/screenshots/ # screenshots of the reference site (see Design)
Dockerfile
nginx.conf
```

## Design

### Reference

The screenshots in `design-docs/screenshots/` show another engineer's site. **Use them for structure, rhythm and density, not to clone its look.** Take the following from them:

- The layout of the hero, social pills and Explore grid.
- The three-role type system: an expressive display serif for headings, a clean sans for body text, and a monospace face for metadata.
- Card anatomy: a small mono label top-left, a count top-right in the accent colour, a bold title, a two-line description, a dashed divider, and a mono "View x" link with an arrow at the bottom.
- The calm, dark-by-default, content-first feel with generous line height.
- A very faint grid pattern on the page background.

Do **not** copy its exact red accent, its fonts, its wording or its photo treatment. This site should be recognisably Aditya's own.

### Tokens (starting point, all in `tokens.css`)

| Token                                   | Dark      | Light     |
| --------------------------------------- | --------- | --------- |
| `--bg`                                  | `#1d1f21` | `#fafaf7` |
| `--surface` (cards, pills)              | `#26292c` | `#ffffff` |
| `--border`                              | `#383c40` | `#e2e2dc` |
| `--text`                                | `#e8e6e3` | `#1d1f21` |
| `--text-muted`                          | `#9aa0a6` | `#5f6368` |
| `--link`                                | `#7fb2ff` | `#1a5fd0` |
| `--accent` (underline, tagline, counts) | `#f0a830` | `#a35f00` |

The accent colour is a placeholder that Aditya may change. (Light accent was darkened from `#b86e00` to `#a35f00` to pass WCAG AA for small text.) Every colour must be used through a variable, with no raw hex values in components.

- **Type:** display is Fraunces Italic, used for the h1, section headings and the tagline. Body is IBM Plex Sans at a 17–18px base with line height 1.65. Mono is IBM Plex Mono at 0.8rem for labels, dates and counts.
- **Scale:** an approximate 1.25 ratio. The hero h1 uses `clamp(2.25rem, 5vw, 3.25rem)`.
- **Layout:** a 1200px max content width. Bio text is capped at about 70ch. The hero is a two-column grid (text about 60%, photo about 35%) that stacks on mobile. The Explore grid has 4 columns on desktop, 2 on tablet and 1 on mobile, with 24px gaps.
- **Shape:** 8px radius on cards, 6px on pills, and 16px on the photo. Borders are 1px `--border`. Cards have no drop shadows except a subtle border-colour change on hover.
- **Motion:** none on load. Only hover and focus state changes, at 150ms or less.

### Theme

- The theme toggle sets `data-theme` on `<html>`. Stored choice → `localStorage` (try/catch), else `prefers-color-scheme`.
- To avoid a flash of the wrong theme, set the theme with a small inline script in `<head>` before first paint.

### Checking the design

After any visual change:

1. Run the dev server.
2. Take screenshots at 375px and 1440px, in both themes, if a browser or Playwright tool is available.
3. Compare them against the reference for spacing and hierarchy. Fix what's off before calling the work done.

## Content placeholders (Aditya will edit these)

- **Tagline:** "distributed systems, platforms and applied AI. building in public." (TODO: confirm)
- **Bio facts:**
  - BSc Computer Science with Placement Year, University of Surrey (2023–2027).
  - Software Engineer placement at Eli Lilly (June 2025 – Sept 2026), working on distributed systems and platform/agentic AI.
  - AWS Certified Solutions Architect – Associate.
  - Runs a Kubernetes homelab and builds side projects implementing papers such as a Java MapReduce framework.
- Social URLs and the CV link are TODO in `site.ts`.
- The site URL is TODO; the domain has not been decided yet.

## Deployment (context)

- **Pipeline:** GitHub Actions builds a multi-arch image (`linux/amd64,linux/arm64`) and pushes it to GHCR.
- **Delivery:** Flux image automation in a **separate fleet repo** updates the tag. The Kubernetes manifests (Deployment, Service, Traefik IngressRoute) live in that fleet repo, not here.
- **Dockerfile:** a multi-stage build, with `node:22-alpine` for the build stage and `nginxinc/nginx-unprivileged:alpine` serving `dist/` on port 8080.
- **nginx.conf:**
  - Assets under `/_astro/*` get `Cache-Control: public, max-age=31536000, immutable`.
  - HTML gets `Cache-Control: public, max-age=0, must-revalidate`.
  - Gzip on, and a custom 404 page.
- **Edge:** Cloudflare sits in front, so don't add TLS handling inside the container.

## Commands

- `npm run dev` starts the local dev server.
- `npm run build` builds the site.
- `npx astro check` runs type and template checks.
- `docker build -t site .` followed by `docker run -p 8080:8080 site` tests the image locally.

## Working conventions

- Make small, focused commits using Conventional Commit messages (`feat:`, `fix:`, `chore:`).
- Use semantic HTML: one `<h1>` per page, landmarks, and alt text on every image.
- If something in this file is ambiguous or conflicts with what you find, ask instead of guessing.
