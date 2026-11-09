# Aravind Vallabhaneni — Senior Developer Portfolio

> **Fresher full-stack developer building production-grade web apps, from geospatial maps to AI-powered tools.**

[![CI Pipeline](https://github.com/AravindVallabhaneni/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AravindVallabhaneni/Portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built With: React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

---

## 📑 Table of Contents
1. [Design Direction & Engineering Standard](#1-design-direction--engineering-standard)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Full Project File Tree](#3-full-project-file-tree)
4. [Local Development & Setup](#4-local-development--setup)
5. [Content Management (No Code Edits)](#5-content-management-no-code-edits)
6. [Profile Video & Media Optimization (FFmpeg)](#6-profile-video--media-optimization-ffmpeg)
7. [Vercel Deployment & Custom Domain Guide](#7-vercel-deployment--custom-domain-guide)
8. [5 Highest-Impact Post-Launch Improvements](#8-5-highest-impact-post-launch-improvements)

---

## 1. Design Direction & Engineering Standard
- **Aesthetic:** Modern developer-editorial with deep navy base (`#0A0E14` / `#0D1117`), electric blue accents (`#0284C7`), cyan highlights (`#38BDF8`), and warm amber tones (`#F59E0B`).
- **Typography:** Space Grotesk (geometric headings), Inter (clean readable body), and JetBrains Mono (code highlights).
- **Interactivity:** 30fps-capped canvas particles that pause when off-screen, interactive 3D perspective tilt cards with cursor-following radial spotlights, and a session-persisted intro preloader.
- **Accessibility:** Full WCAG AA contrast compliance, semantic landmarks, tab-index traps, ARIA roles, and total degradation to simple layouts under `prefers-reduced-motion`.
- **Honest Fresher Positioning:** Focuses on demonstrated engineering depth (PostGIS geospatial radius clustering, recursive centroids, Supabase Realtime WebSocket streams, Groq LLM fallbacks, and strict TypeScript) without fabricating years of corporate tenure.

---

## 2. Tech Stack & Architecture

- **Frontend Core:** React 18 + Vite + TypeScript (Strict Mode).
- **Styling:** Tailwind CSS with custom editorial dark/light themes.
- **Animations:** Framer Motion (GPU-accelerated transform & opacity only).
- **Backend / Edge:** Vercel Serverless Functions (`/api/leetcode.ts`) with Edge caching (`s-maxage=600, stale-while-revalidate=3600`) and graceful in-memory fallbacks.
- **Testing:** Node.js native test runner & Vitest for the LeetCode data adapter transformer.
- **Continuous Integration:** GitHub Actions checking linting, type safety, test execution, and production builds.

---

## 3. Full Project File Tree

```
Portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline
├── api/
│   └── leetcode.ts              # Vercel serverless function (CORS & GraphQL adapter)
├── public/
│   ├── media/
│   │   ├── aravind.jpg          # Profile photo fallback
│   │   ├── aravind.webp         # Modern WebP poster image
│   │   ├── aravind-loop.mp4     # Looping video clip
│   │   └── cert-placeholder.svg # Certificate preview asset
│   ├── favicon.svg              # AV brand monogram favicon
│   ├── og-image.png             # Social OpenGraph banner
│   ├── og-image.svg             # Vector OpenGraph banner source
│   ├── robots.txt               # SEO search spider instructions
│   └── sitemap.xml              # Search engine sitemap
├── scripts/
│   └── postinstall-fallback.mjs # Universal WASM/Node compatibility hook
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.tsx# Crash prevention wrapper
│   │   │   └── NotFound.tsx     # Graceful 404 handler
│   │   ├── layout/
│   │   │   ├── Footer.tsx       # Semantic footer with social links
│   │   │   ├── Navbar.tsx       # Sticky blur navigation & mobile drawer
│   │   │   ├── Preloader.tsx    # Session-persisted intro animation
│   │   │   └── SideProgressRail.tsx # Vertical section scroll tracker
│   │   ├── sections/
│   │   │   ├── About.tsx        # Bio, availability, and academic standing
│   │   │   ├── Certifications.tsx # Filterable credential grid + lightbox
│   │   │   ├── Contact.tsx      # Formspree form with honeypot & mailto fallback
│   │   │   ├── CurrentlyBuilding.tsx # In-progress microservices & progress bars
│   │   │   ├── Education.tsx    # Degree milestones & honors
│   │   │   ├── Hero.tsx         # Hero banner, media frame & CTA buttons
│   │   │   ├── HeroBackdrop.tsx # 30fps capped particle backdrop canvas
│   │   │   ├── LeetCodeSection.tsx # Real-time solve rings, rank, and heatmap
│   │   │   ├── ProjectCard.tsx  # 3D tilt card with cursor spotlight
│   │   │   ├── ProjectModal.tsx # Full architectural schematic modal
│   │   │   ├── Projects.tsx     # 3D Deck carousel & grid switcher
│   │   │   └── Skills.tsx       # Grouped categorized technical capabilities
│   │   └── ui/
│   │       ├── Badge.tsx        # Status pill component with pulsing dot
│   │       ├── Button.tsx       # Accessible interactive button
│   │       └── Modal.tsx        # Keyboard-accessible dialog modal
│   ├── data/
│   │   ├── certifications.ts    # Centralized certifications data
│   │   ├── education.ts         # Education and achievements list
│   │   ├── inProgress.ts        # In-progress workbench data
│   │   ├── profile.ts           # Bio, contacts, links, availability
│   │   ├── projects.ts          # Flagship projects & architecture notes
│   │   └── skills.ts            # Categorized skills matrix
│   ├── hooks/
│   │   ├── useLeetCode.ts        # Page Visibility polling hook (5-min TTL)
│   │   ├── useReducedMotion.ts  # System motion preference listener
│   │   ├── useScrollSpy.ts      # Active section & scroll percentage tracker
│   │   └── useTheme.ts          # Dark/light zero-shift theme switcher
│   ├── services/
│   │   ├── leetcodeAdapter.ts   # GraphQL response validator & transformer
│   │   └── leetcodeAdapter.test.ts # Vitest suite for adapter
│   ├── types/
│   │   └── index.ts             # Strict TypeScript domain interfaces
│   ├── App.tsx                  # Main single-page application layout
│   ├── index.css                # Tailwind directives & accessibility rules
│   ├── main.tsx                 # React DOM mount point & analytics toggle
│   └── vite-env.d.ts            # Vite client type references
├── tests/
│   └── run-tests.mjs            # Zero-dependency test runner
├── .env.example                 # Example environment variables
├── .eslintrc.cjs                # ESLint configuration
├── .prettierrc                  # Prettier code formatting rules
├── index.html                   # HTML entry with preload, meta & JSON-LD schema
├── package.json                 # Dependencies and execution scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Design system palette and keyframes
├── TODO.md                      # Actionable checklist of all user placeholders
├── tsconfig.json                # Strict TypeScript configuration
├── vercel.json                  # CDN caching and HTTP security headers
└── vite.config.ts               # Vite configuration and bundle chunking
```

---

## 4. Local Development & Setup

### Prerequisites
- Node.js v18+ (tested on Node 20 and 24)
- npm v9+

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/AravindVallabhaneni/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your LeetCode username and Formspree form ID:
```ini
LEETCODE_USERNAME="your_actual_leetcode_username"
VITE_LEETCODE_USERNAME="your_actual_leetcode_username"
VITE_FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"
```

### 3. Run Development Server
```bash
# Start frontend client on http://localhost:3000
npm run dev
```

### 4. Run With Vercel Serverless Functions Locally
To test the `/api/leetcode` edge function locally with real API calls:
```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Run local serverless environment
vercel dev
```

### 5. Run Tests, Linting, & Type Checks
```bash
# Run unit tests
npm test

# Run strict TypeScript compiler check
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Content Management (No Code Edits)

All personal content is separated from React components in `src/data/`:

### Adding or Updating a Project
Open `src/data/projects.ts` and add an entry:
```typescript
{
  id: 'my-new-project',
  title: 'Project Title',
  tagline: 'Short 1-line description',
  category: 'Full-Stack',
  featured: true,
  problem: 'What problem does this project solve?',
  role: 'Your specific technical role',
  stack: ['React', 'Node.js', 'PostgreSQL'],
  highlights: [
    'Architectural accomplishment 1',
    'Architectural accomplishment 2'
  ],
  result: 'Measured latency, test metrics, or outcomes',
  links: {
    repo: 'https://github.com/AravindVallabhaneni/repo-name',
    live: 'https://project-demo.vercel.app'
  }
}
```

### Adding a Certification
Open `src/data/certifications.ts`:
```typescript
{
  id: 'aws-cloud-practitioner',
  title: 'AWS Certified Cloud Practitioner',
  issuer: 'Amazon Web Services',
  issueDate: 'March 2025',
  credentialUrl: 'https://www.credly.com/your-badge-link',
  badgeImage: '/media/aws-badge.png',
  category: 'Cloud & Web'
}
```
*(If you have no certifications yet, set `certificationsData = []` and the section will automatically hide without leaving empty cards).*

### Adding an In-Progress Project
Open `src/data/inProgress.ts`:
```typescript
{
  id: 'distributed-cache',
  title: 'In-Memory Key-Value Store',
  description: 'Building an LRU cache with Redis-compatible TCP protocol in Node.js.',
  status: 'Building', // 'Planning' | 'Building' | 'Testing'
  progressPercent: 45,
  techChips: ['TypeScript', 'TCP', 'Algorithms'],
  repoUrl: 'https://github.com/AravindVallabhaneni/key-value-store',
  lastCommitDate: 'Yesterday'
}
```

---

## 6. Profile Video & Media Optimization (FFmpeg)

To get smooth crossfades with zero stutter, optimize your profile video and photo:

### 1. Compress Your 3–5s Video Clip
Run the following FFmpeg command in your terminal to compress a 480x480 square looping clip to **under 1.5MB**:
```bash
# MP4 (H.264)
ffmpeg -i input-video.mov -vf "scale=480:480:force_original_aspect_ratio=increase,crop=480:480" -c:v libx264 -crf 28 -an -pix_fmt yuv420p -movflags +faststart public/media/aravind-loop.mp4

# WebM (VP9 - optional for even smaller payload)
ffmpeg -i input-video.mov -vf "scale=480:480:force_original_aspect_ratio=increase,crop=480:480" -c:v libvpx-vp9 -b:v 0 -crf 32 -an public/media/aravind-loop.webm
```

### 2. Generate a WebP Poster Image
```bash
ffmpeg -i public/media/aravind-loop.mp4 -ss 00:00:01 -vframes 1 -c:v libwebp -quality 85 public/media/aravind.webp
```

---

## 7. Vercel Deployment & Custom Domain Guide

### Step 1: Deploy to Vercel
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production portfolio"
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository (`Portfolio`).
4. Framework Preset will auto-detect as **Vite**.
5. Under **Environment Variables**, add:
   - `LEETCODE_USERNAME` = `your_username`
   - `VITE_LEETCODE_USERNAME` = `your_username`
   - `VITE_FORMSPREE_ENDPOINT` = `https://formspree.io/f/your_id`
   - `VITE_ENABLE_ANALYTICS` = `false` (or `true` if desired)
6. Click **Deploy**.

### Step 2: Connect Custom Domain
1. In the Vercel Project Dashboard, navigate to **Settings > Domains**.
2. Type your domain (e.g., `aravindvallabhaneni.dev`).
3. Add the following DNS records at your domain registrar (Namecheap, Porkbun, Cloudflare, or GoDaddy):
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. Vercel will automatically provision a free Let's Encrypt SSL/TLS certificate and configure automatic redirect from `www` to your root domain.

---

## 8. 5 Highest-Impact Post-Launch Improvements

For a fresher full-stack developer seeking competitive internships and entry-level engineering roles, these 5 additions provide the highest hiring return:

1. **Interactive In-Browser Demos or Embedded Loom Walkthroughs (2 mins each)**
   - *Why:* Hiring managers and lead engineers spend an average of 45 seconds reviewing portfolios. An embedded, silent, auto-playing 30-second video showing PostGIS report clustering in action on CivicPulse immediately proves the app is genuine and working.

2. **Quantified System Architecture Case Studies**
   - *Why:* Instead of standard bullet points, add a detailed "Engineering Deep Dive" modal or standalone markdown write-up covering:
     - Why PostGIS `ST_DWithin` was chosen over MongoDB `$geoWithin`.
     - How database indexing lowered query execution time.
     - How edge cases (e.g. centroid recalculation when reports are resolved) are handled.

3. **Technical Blog / Learn-in-Public Articles**
   - *Why:* Publish 2-3 focused technical articles, such as:
     - *"Implementing Real-Time Geospatial Incident Clustering in Supabase & React"*
     - *"Building Resilient LLM Inference Pipelines with Groq and Natural Language Fallbacks"*
   - Demonstrates clear communication and self-driven problem solving.

4. **Live System Health / Ping Monitor Widget**
   - *Why:* Add a subtle green badge next to your live project buttons indicating "API Status: Operational" (via a lightweight health-check endpoint). This highlights operational maturity and DevOps awareness.

5. **Open Source Contributions & PR Highlights**
   - *Why:* Contributing even small bug fixes, type definition corrections, or documentation improvements to established repositories (such as Leaflet plugins, Express middlewares, or Zod schemas) provides undeniable third-party validation of your code quality.

