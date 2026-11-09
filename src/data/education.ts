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
      'Active focus in modern web technologies, spatial computing, and applied machine learning heuristics.',
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
    id: 'achieve-1',
    title: 'Top Tier Academic Standing at VIT-AP',
    context: 'Consistently maintaining an 8.86/10 CGPA in B.Tech Computer Science & Engineering.',
    date: '2023 – Present',
  },
  {
    id: 'achieve-2',
    title: 'TODO: Hackathons & Coding Competitions',
    context: 'TODO: list any hackathons, competitive programming contests, or university technical symposium awards won.',
    date: 'TODO: Date',
  },
];

