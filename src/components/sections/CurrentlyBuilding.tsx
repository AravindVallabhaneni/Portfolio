import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, ExternalLink, Hammer } from 'lucide-react';
import { inProgressProjects } from '../../data/inProgress';
import { InProgressProject } from '../../types';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CurrentlyBuilding: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const getStatusBadge = (status: InProgressProject['status']) => {
    switch (status) {
      case 'Building':
        return (
          <Badge variant="blue" pulseDot size="sm">
            Building
          </Badge>
        );
      case 'Testing':
        return (
          <Badge variant="emerald" pulseDot size="sm">
            Testing
          </Badge>
        );
      case 'Planning':
      default:
        return (
          <Badge variant="warm" size="sm">
            Planning
          </Badge>
        );
    }
  };

  return (
    <section id="building" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <Badge variant="warm" size="sm">
            ACTIVE ROADMAP
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight flex items-center gap-2.5">
            <span>Currently Building</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-warm opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-warm"></span>
            </span>
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            Transparent look into my workbench: upcoming microservices, APIs, and open-source explorations in active development.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between hover:border-accent-warm/40 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header: Status Badge + Live Dot */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(item.status)}
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-light-subtext dark:text-dark-subtext">
                    <GitCommit className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{item.lastCommitDate || 'Recent'}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-light-subtext dark:text-dark-subtext">Completion</span>
                    <span className="text-accent-blue dark:text-accent-cyan font-semibold">
                      {item.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-light-card dark:bg-dark-bg border border-light-border dark:border-dark-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progressPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full"
                    />
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.techChips.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-light-card dark:bg-dark-hover border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-6 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                {item.repoUrl ? (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-blue dark:text-accent-cyan hover:underline"
                  >
                    <span>Inspect Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext flex items-center gap-1">
                    <Hammer className="w-3.5 h-3.5 text-accent-warm" />
                    <span>In Local Prototyping</span>
                  </span>
                )}

                <span className="text-[11px] font-mono text-light-subtext dark:text-dark-subtext">
                  v0.{Math.floor(item.progressPercent / 10)}.0
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
