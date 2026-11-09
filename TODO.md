# TODO.md — Outstanding Action Items

Checked items are done. Items below are what still needs your attention.

---

## 🔴 Blockers (Must complete before launch)

- [ ] **Your LeetCode Username**
  - **File:** `.env` (lines 1–2) and Vercel Dashboard → Environment Variables
  - **Keys:** `LEETCODE_USERNAME` and `VITE_LEETCODE_USERNAME`
  - **Action:** Replace `TODO: LEETCODE_USERNAME` with your actual LeetCode handle.
  - **Why it matters:** Until set, the LeetCode section shows example/demo data with a yellow warning banner.

- [ ] **Profile Photo**
  - **File:** `public/media/aravind.jpg`
  - **Action:** Drop your square portrait photo (minimum 480×480px) here, overwriting the placeholder SVG.
  - **Also:** Optionally add `public/media/aravind.webp` (use ffmpeg command in README).

- [ ] **Looping Profile Video**
  - **File:** `public/media/aravind-loop.mp4`
  - **Action:** Drop your 3–5 second looping video clip here. The hero crossfades to it on hover.
  - **Compress it first (see README):** `ffmpeg -i input.mov -vf "scale=480:480:force_original_aspect_ratio=increase,crop=480:480" -c:v libx264 -crf 28 -an -movflags +faststart public/media/aravind-loop.mp4`

---

## 🟡 Important (Affects content quality)

- [ ] **Location / Work Preference**
  - **File:** `src/data/profile.ts` → `availability.locationPreference`
  - **Current:** `'TODO: city/remote preference'`
  - **Action:** Set to something like `'Hyderabad / Remote (Open to Relocation)'`

- [ ] **Academic Foresight — GitHub Repo Link**
  - **File:** `src/data/projects.ts` → `academic-foresight` → `links.repo`
  - **Current:** `'TODO: confirm repo link'`
  - **Action:** Add the actual GitHub repository URL for this project.

- [ ] **SecureLoop — GitHub Repo URL**
  - **File:** `src/data/inProgress.ts` → `secureloop` → `repoUrl`
  - **Current:** `undefined`
  - **Action:** Once you push the SecureLoop repo to GitHub, paste the URL here.

- [ ] **Contact Form (Formspree)**
  - **File:** `.env` → `VITE_FORMSPREE_ENDPOINT`
  - **Current:** `https://formspree.io/f/TODO_FORMSPREE_ID`
  - **Action:**
    1. Register at [formspree.io](https://formspree.io)
    2. Create a new form linked to `aravindvallabhaneni10@gmail.com`
    3. Paste the endpoint (e.g. `https://formspree.io/f/abcdefgh`) into `.env` and Vercel dashboard
  - **Fallback if skipped:** Contact form automatically opens the user's default mail client instead (graceful degradation).

---

## 🟢 Nice to Have (Improves perception)

- [ ] **Certifications**
  - **File:** `src/data/certifications.ts`
  - **Current:** 2 placeholder entries
  - **Options:**
    - Replace with real certificates (AWS, Coursera, Meta, HackerRank, etc.) — add badge images to `public/media/`
    - OR set `export const certificationsData: CertificationItem[] = []` to cleanly hide the entire section automatically

- [ ] **Hackathons & Competition Awards**
  - **File:** `src/data/education.ts` → `achievementsData` array
  - **Current:** Placeholder item for hackathons
  - **Action:** Add any real competitive programming rankings (CodeChef / HackerRank ratings), university hackathon placements, or technical paper presentations.

- [ ] **Custom Domain**
  - **Action:** In Vercel Project Settings → Domains, link `aravindvallabhaneni.dev` (or your chosen domain). Set DNS as described in README (A record → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`).

---

## ✅ Already Done

- [x] Removed all fabricated/invented project metrics
- [x] CivicPulse result: honest deployed system description
- [x] ResumeAI result: honest deployed system description
- [x] Academic Foresight result: honest model comparison outcome
- [x] Removed Family Finance Backend from in-progress section
- [x] Added SecureLoop as in-progress project with full tech stack
- [x] Profile bio, links, GitHub, LinkedIn, resume, email — all real
- [x] Education data (VIT-AP, Narayana, Bell & Bennett) — all real
- [x] All 3 deployed project cards (CivicPulse, ResumeAI, Academic Foresight) with live links
- [x] LeetCode serverless pipeline with graceful fallback
- [x] Contact form with honeypot + mailto fallback
- [x] Dark/light theme, mobile menu, side progress rail
- [x] TypeScript strict mode: 0 errors
- [x] ESLint: 0 warnings
- [x] Production build: successful
- [x] Unit tests: 6/6 passing
