import { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: 'Aravind Vallabhaneni',
  fullName: 'Vallabhaneni Naga Aravind Babu',
  role: 'Full Stack Developer (MERN) & AI/ML Explorer',
  positioningLine:
    'Fresher full-stack developer building production-grade web apps, from geospatial maps to AI-powered tools.',
  bio: [
    'I am a B.Tech Computer Science and Engineering student at VIT-AP University (2023–2027) maintaining an 8.86/10 CGPA.',
    'I specialize in engineering robust web applications, high-throughput REST APIs, and database-backed architectures using React, Node.js, Express, and Supabase / PostgreSQL.',
    'I have shipped deployed, production-grade applications featuring geospatial PostGIS clustering, real-time sync, and LLM integrations.',
    'Currently deepening my focus in cloud deployment strategies, advanced NLP pipelines, and end-to-end TypeScript architecture.',
  ],
  availability: {
    status: 'available',
    headline: 'Open for Opportunities',
    roles: [
      'Full Stack Development Internships',
      'Software Engineering Entry-Level Roles',
      'Open Source Collaboration',
    ],
    // Explicit TODO marker for user confirmation
    locationPreference: 'Relocation-ready',
  },
  links: {
    github: 'https://github.com/AravindVallabhaneni',
    linkedin: 'https://www.linkedin.com/in/aravind-babu-vallabhaneni/',
    email: 'aravindvallabhaneni10@gmail.com',
    resume: 'https://drive.google.com/file/d/11am3b-B6A_K9Y3s8XUV_jgybI35Gr-pS/view?usp=drive_link',
  },
  media: {
    poster: '/media/aravind.jpg',
    videoMp4: '/media/aravind-loop.mp4',
    alt: 'Aravind Vallabhaneni - Full Stack Developer',
  },
};

