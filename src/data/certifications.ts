import { CertificationItem } from '../types';

/**
 * Data-driven certifications collection.
 * Real verified certification from FACE Prep.
 */
export const certificationsData: CertificationItem[] = [
  {
    id: 'mongodb-associate-dba',
    title: 'MongoDB Associate Database Administrator',
    issuer: 'FACE Prep',
    issueDate: 'July 2026',
    credentialUrl: undefined, // Document issued directly by FACE Prep
    badgeImage: '/media/mongodb-cert.png',
    pdfUrl: '/media/mongodb-cert.pdf',
    category: 'Database Administration',
    description:
      'Certified by FACE Prep (Reg No: 23BCE9825, Score: 74/100). Validates competency in MongoDB architecture, document schema design, indexing strategies, aggregation pipelines, and secure database operations.',
  },
];
