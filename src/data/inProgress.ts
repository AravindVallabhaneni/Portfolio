import { InProgressProject } from '../types';

export const inProgressProjects: InProgressProject[] = [
  {
    id: 'secureloop',
    title: 'SecureLoop',
    description:
      'AI-assisted secure code review platform that scans repositories for OWASP vulnerabilities using Semgrep, generates targeted fixes via Gemini API, and verifies each fix by re-scanning an isolated copy before acceptance. Includes a tiered quiz system with misconception tracking and a learner dashboard — developers learn why the code was vulnerable, not just what to patch.',
    status: 'Building',
    progressPercent: 60,
    techChips: ['React', 'Node.js', 'Express', 'MongoDB', 'Semgrep', 'Gemini API'],
    repoUrl: undefined, // Add repo URL once public
    lastCommitDate: 'Recent',
  },
  {
    id: 'portfolio-v2',
    title: 'Editorial Portfolio & LeetCode Pipeline',
    description:
      'High-performance personal web platform featuring 3D card deck interactions, serverless LeetCode sync, and zero-shift theme switching.',
    status: 'Building',
    progressPercent: 95,
    techChips: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel Serverless'],
    repoUrl: 'https://github.com/AravindVallabhaneni/Portfolio',
    lastCommitDate: 'Today',
  },
];
