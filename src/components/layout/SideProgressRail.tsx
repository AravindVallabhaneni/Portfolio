import React from 'react';
import { motion } from 'framer-motion';

interface SideProgressRailProps {
  activeSection: string;
  scrollProgress: number;
  onNavigate: (sectionId: string) => void;
}

const RAIL_SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'building', label: 'Building' },
  { id: 'skills', label: 'Skills' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const SideProgressRail: React.FC<SideProgressRailProps> = ({
  activeSection,
  scrollProgress,
  onNavigate,
}) => {
  return (
    <aside
      aria-label="Page scroll progress"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* Background Line */}
      <div className="relative w-[2px] h-48 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-warm rounded-full"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Dots for each Section */}
      <div className="flex flex-col items-center gap-2">
        {RAIL_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tooltip on Hover */}
              <span className="absolute right-7 px-2 py-0.5 rounded text-[11px] font-mono tracking-wide bg-dark-surface dark:bg-dark-card text-dark-heading border border-dark-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {sec.label}
              </span>

              {/* Dot Indicator */}
              <motion.span
                animate={{
                  scale: isActive ? 1.4 : 1,
                  backgroundColor: isActive ? '#38BDF8' : 'currentColor',
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive
                    ? 'ring-4 ring-accent-blue/30'
                    : 'text-slate-300 dark:text-dark-border hover:text-accent-blue'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

