<<<<<<< HEAD
# 3D Developer Portfolio

A minimalist, responsive developer portfolio built with **React + Vite**, **Material UI**, **React Three Fiber / drei** and **Framer Motion**.

## Run locally

Requires Node.js 18+ (20+ recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Make it yours (no code changes needed outside `src/data/`)

| What | File |
| --- | --- |
| Name, initials, tagline, email, resume path, About text and highlights | `src/data/profile.js` |
| GitHub / LinkedIn links | `socials` in `src/data/profile.js` |
| Skills (keep only what you can genuinely claim) | `src/data/skills.js` |
| Projects (title, features, tech, repo, live link, screenshot) | `src/data/projects.js` |
| Experience / certifications / hackathons | `src/data/experience.js` |
| Accent colour and fonts | `src/theme/theme.js` (`ACCENT`) |
| Page title, description, social-share tags | `index.html` |

Everything marked `[PLACEHOLDER]` must be replaced. Sample projects show a "Placeholder" badge until you set `placeholder: false`.

### Resume
Replace `public/resume.pdf` with your real PDF (keep the same name, or change `resumeUrl` in `profile.js`). Both the navbar and hero buttons use it.

### Project screenshots
Add images to `public/projects/` (WebP/AVIF, about 1280×720, under ~200 KB) and set `image: '/projects/my-app.webp'`. Empty or broken images fall back to a neat placeholder. Leave `repo` / `live` as `''` to hide a button.

### Experience section
It is hidden automatically while `items` in `experience.js` is empty. Only add things that are real.

### Contact form
The form is **hidden until you configure an endpoint**, so it can never fake a success. To enable it:
1. Create a free form at [formspree.io](https://formspree.io) (or any service accepting a JSON POST).
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxx`.
3. On Vercel/Netlify, add the same variable in the project's Environment Variables.

## Deploy

### Vercel
1. Push the project to GitHub.
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build: `npm run build`, output: `dist`. Click **Deploy**.

### Netlify
1. Push to GitHub, then Netlify → **Add new site → Import an existing project**.
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`). Deploy.

After deploying, update the `og:` / `twitter:` tags in `index.html` with your real URL and a 1200×630 PNG/JPG share image (many platforms don't render SVG previews).

## Structure

```
src/
  components/   Reveal, SectionHeading, SocialLinks, ProjectCard, Hero3D, ErrorBoundary
  sections/     Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
  data/         all editable content
  theme/        central MUI theme
  hooks/        usePrefersReducedMotion, useCanRender3D
```

## Performance and accessibility notes
- The 3D canvas is lazy-loaded, skipped on small/low-power devices or without WebGL (a CSS orb is shown instead), paused when scrolled out of view, and rendered as a single static frame for reduced-motion users.
- Sections below the hero are code-split.
- Skip link, semantic landmarks, visible focus rings, `aria-live` form feedback, and `rel="noopener noreferrer"` on external links.
=======
# portfolio
>>>>>>> 23f85cb71d9039204389d2a6dbf1b4496de4fcd3
