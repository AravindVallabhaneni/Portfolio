import { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    description: 'Core programming and scripting languages used for production systems and algorithms',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Proficient', isPrimary: true },
      { name: 'Python', level: 'Proficient', isPrimary: true },
      { name: 'Java', level: 'Intermediate', isPrimary: false },
      { name: 'SQL', level: 'Proficient', isPrimary: true },
    ],
  },
  {
    category: 'Frontend Development',
    description: 'Component architecture, responsive state management, and modern styling pipelines',
    skills: [
      { name: 'React 18', level: 'Proficient', isPrimary: true },
      { name: 'Vite', level: 'Proficient', isPrimary: true },
      { name: 'Tailwind CSS', level: 'Proficient', isPrimary: true },
      { name: 'HTML5 / CSS3', level: 'Proficient', isPrimary: false },
      { name: 'Zustand', level: 'Intermediate', isPrimary: false },
      { name: 'Framer Motion', level: 'Intermediate', isPrimary: false },
    ],
  },
  {
    category: 'Backend & APIs',
    description: 'Scalable server design, middleware security, and robust RESTful services',
    skills: [
      { name: 'Node.js', level: 'Proficient', isPrimary: true },
      { name: 'Express.js', level: 'Proficient', isPrimary: true },
      { name: 'REST API Design', level: 'Proficient', isPrimary: true },
      { name: 'Authentication & JWT', level: 'Intermediate', isPrimary: false },
      { name: 'Zod Validation', level: 'Intermediate', isPrimary: false },
    ],
  },
  {
    category: 'Databases & Spatial',
    description: 'Relational data modeling, spatial indexing, and managed cloud databases',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient', isPrimary: true },
      { name: 'MongoDB (Certified DBA)', level: 'Proficient', isPrimary: true },
      { name: 'Supabase', level: 'Proficient', isPrimary: true },
      { name: 'PostGIS (Spatial)', level: 'Intermediate', isPrimary: true },
      { name: 'MySQL', level: 'Intermediate', isPrimary: false },
    ],
  },
  {
    category: 'AI & Machine Learning',
    description: 'Data analysis, optimization heuristics, and LLM orchestration',
    skills: [
      { name: 'LLM APIs (Groq/OpenAI)', level: 'Proficient', isPrimary: true },
      { name: 'Scikit-learn', level: 'Intermediate', isPrimary: false },
      { name: 'Pandas & NumPy', level: 'Proficient', isPrimary: false },
      { name: 'Fuzzy Logic Systems', level: 'Intermediate', isPrimary: false },
      { name: 'Genetic Algorithms', level: 'Intermediate', isPrimary: false },
    ],
  },
  {
    category: 'Developer Tools & Cloud',
    description: 'Version control workflows, cloud hostings, and deployment pipelines',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient', isPrimary: true },
      { name: 'Vercel', level: 'Proficient', isPrimary: true },
      { name: 'Render', level: 'Intermediate', isPrimary: false },
      { name: 'Postman', level: 'Proficient', isPrimary: false },
      { name: 'Linux / Bash', level: 'Intermediate', isPrimary: false },
    ],
  },
];

