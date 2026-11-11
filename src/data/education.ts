import { EducationItem, AchievementItem } from '../types';

export const educationData: EducationItem[] = [
  {
    id: 'vit-ap',
    institution: 'VIT-AP University',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2023 – 2027',
    score: 'CGPA: 8.86 / 10.0',
    highlights: [
      'Core coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks.',
      'Active focus on modern full-stack web architectures, database locking systems, and scalable backend design.',
    ],
  },
  {
    id: 'narayana',
    institution: 'Narayana Junior College',
    degree: 'Intermediate (MPC - Mathematics, Physics, Chemistry)',
    period: '2021 – 2023',
    score: 'Percentage: 98.1%',
    highlights: [
      'Strong academic focus on analytical problem solving, calculus, and foundational physics.',
    ],
  },
  {
    id: 'bell-and-bennett',
    institution: 'Bell and Bennett High School',
    degree: 'Secondary School Certificate (SSC)',
    period: '2020 – 2021',
    score: 'Percentage: 99.5%',
    highlights: [
      'Graduated with top academic standing across mathematics and physical sciences.',
    ],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: 'leadership-kalki-2',
    title: 'Kalki Personality Development Club — Event Management Department',
    context:
      'Served as a core member in the Event Management Department during 2nd year: organized campus workshops, coordinated venue logistics, schedule execution, and managed audience engagement for student empowerment events.',
    date: '2nd Year (2024 – 2025)',
  },
  {
    id: 'leadership-kalki-1',
    title: 'Kalki Personality Development Club — PR & Outreach Department',
    context:
      'Worked in the Public Relations and Outreach Department during 1st year: led student engagement initiatives, inter-departmental communications, and campus awareness campaigns.',
    date: '1st Year (2023 – 2024)',
  },
  {
    id: 'academic-standing',
    title: 'Top Tier Academic Standing at VIT-AP',
    context: 'Consistently maintaining an 8.86/10 CGPA across B.Tech Computer Science & Engineering semesters.',
    date: '2023 – Present',
  },
  {
    id: 'cert-faceprep',
    title: 'Certified MongoDB Associate Database Administrator',
    context:
      'Achieved official certification from FACE Prep (Reg No: 23BCE9825, Score: 74/100) validating competency in MongoDB architecture, document schema design, indexing strategies, and aggregation pipelines.',
    date: 'July 2026',
  },
];
