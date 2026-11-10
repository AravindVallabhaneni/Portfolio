# TODO.md — Outstanding Action Items

Checked items are done. Items below are what still needs your attention.

---

## 🟡 Remaining Action Items Before Launch

- [ ] **Academic Foresight — GitHub Repo Link**
  - **File:** `src/data/projects.ts` → `academic-foresight` → `links.repo`
  - **Current:** `'TODO: confirm repo link'`
  - **Action:** Add the actual GitHub repository URL for this project once ready.

- [ ] **SecureLoop — GitHub Repo URL**
  - **File:** `src/data/inProgress.ts` → `secureloop` → `repoUrl`
  - **Current:** `undefined`
  - **Action:** Once you push the SecureLoop repo to GitHub, paste the URL here.

- [ ] **Contact Form Verification**
  - **File:** `.env` → `VITE_FORMSPREE_ENDPOINT`
  - **Current:** Set to `https://formspree.io/f/xkjjlodj`
  - **Action:** Send a test message on your running site to ensure emails arrive in your inbox.

- [ ] **Certifications (Optional)**
  - **File:** `src/data/certifications.ts`
  - **Current:** 2 placeholder entries
  - **Options:**
    - Replace with real certificates (AWS, Coursera, Meta, HackerRank, etc.)
    - OR set `export const certificationsData: CertificationItem[] = []` to cleanly hide the entire section automatically.

- [ ] **Hackathons & Competition Awards (Optional)**
  - **File:** `src/data/education.ts` → `achievementsData` array
  - **Action:** Add any real competitive programming rankings (CodeChef / HackerRank ratings) or hackathon placements.

- [ ] **Custom Domain Setup on Vercel**
  - **Action:** In Vercel Project Settings → Domains, link `aravindvallabhaneni.dev` (or your chosen domain). Set DNS records as described in README.

---

## ✅ Completed & Verified

- [x] **LeetCode Integration Active & Verified**:
  - Username configured: `Aravind_Vallabhaneni`
  - Verified Live Stats: 131 Solved (40 Easy, 75 Medium, 16 Hard), 75.7% Acceptance, Global Rank #1,376,258, 61 Active Days, 11-day streak.
  - Dual-layer serverless & Alfa proxy fallback with dev middleware active.
- [x] **Hero Media Presentation Fixed**:
  - Photo is displayed by default with full contrast and sharpness.
  - Video fitting fixed with `object-contain` + ambient reflection: 100% of the 1280x720 video is visible without side-cropping.
  - Added interactive mode switcher pill: `[ 📷 Photo | ▶ Video Reel ]`.
- [x] **Location Preference**: Set to `'Relocation-ready'`.
- [x] **Removed Family Finance project** and added **SecureLoop** with full OWASP & AI code review description.
- [x] **Formspree Endpoint**: Configured in `.env` (`xkjjlodj`).
- [x] **Git Repository**: Initialized on `main` branch with comprehensive `.gitignore`.
- [x] **Tests & Build**: 6/6 tests passing, 0 TypeScript errors, 0 ESLint warnings, production build successful in 4.3s.
