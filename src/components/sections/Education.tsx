import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, Star } from 'lucide-react';
import { educationData, achievementsData } from '../../data/education';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Education: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="education" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <Badge variant="blue" size="sm">
            ACADEMIC FOUNDATION
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight">
            Education &amp; Achievements
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            Consistent top-tier academic trajectory in science and computing, reinforcing algorithmic rigor and engineering discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-heading font-bold text-xl text-light-heading dark:text-dark-heading flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-blue" />
              Academic Degrees &amp; Diplomas
            </h3>

            <div className="space-y-6 relative border-l-2 border-light-border dark:border-dark-border ml-3 pl-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={prefersReduced ? false : { opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-3"
                >
                  {/* Timeline Node Point */}
                  <span className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-accent-blue ring-4 ring-light-surface dark:ring-dark-bg" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
                      {item.institution}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-light-subtext dark:text-dark-subtext">
                      <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-accent-blue dark:text-accent-cyan">
                    {item.degree}
                  </p>

                  <div className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    {item.score}
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-2 text-xs text-light-subtext dark:text-dark-subtext">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-blue">&bull;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic & Competitive Achievements (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-heading font-bold text-xl text-light-heading dark:text-dark-heading flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-warm" />
              Honors &amp; Milestones
            </h3>

            <div className="space-y-4">
              {achievementsData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-2 hover:border-accent-warm/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-accent-warm/10 text-accent-warm flex items-center justify-center font-bold">
                      <Star className="w-4 h-4" />
                    </span>
                    {item.date && (
                      <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-base text-light-heading dark:text-dark-heading pt-1">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext leading-relaxed">
                    {item.context}
                  </p>
                </motion.div>
              ))}

              {/* Verified Commitment */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-warm/10 border border-accent-blue/30 space-y-2">
                <span className="text-xs font-mono font-bold text-accent-cyan uppercase tracking-wider block">
                  Engineering Integrity
                </span>
                <p className="text-xs text-light-text dark:text-dark-text leading-relaxed">
                  "I keep an honest fresher standing: every repository is open-source, code is documented, and architectural decisions are explainable."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
