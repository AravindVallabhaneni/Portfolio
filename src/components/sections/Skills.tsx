import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Brain, Wrench, Layers } from 'lucide-react';
import { skillGroups } from '../../data/skills';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const prefersReduced = useReducedMotion();

  const categories = ['All', ...skillGroups.map((g) => g.category)];

  const displayedGroups =
    selectedCategory === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 className="w-5 h-5 text-accent-cyan" />;
      case 'Frontend Development':
        return <Layers className="w-5 h-5 text-accent-blue" />;
      case 'Backend & APIs':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Databases & Spatial':
        return <Database className="w-5 h-5 text-accent-warm" />;
      case 'AI & Machine Learning':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Developer Tools & Cloud':
      default:
        return <Wrench className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-10">
          <Badge variant="blue" size="sm">
            TECHNICAL ARSENAL
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight">
            Skills &amp; Capabilities
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            Specialized around the modern TypeScript / Node / React ecosystem, relational databases with PostGIS, and data heuristics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-accent-blue text-white shadow-md shadow-accent-blue/30 scale-105'
                  : 'bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={prefersReduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: groupIdx * 0.05 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between hover:border-accent-blue/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
                      {group.category}
                    </h3>
                    <p className="text-xs text-light-subtext dark:text-dark-subtext mt-0.5">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        skill.isPrimary
                          ? 'bg-accent-blue/10 dark:bg-accent-blue/20 text-accent-blue dark:text-accent-cyan border border-accent-blue/30 font-semibold'
                          : 'bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text'
                      }`}
                    >
                      {skill.isPrimary && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      )}
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-light-border dark:border-dark-border flex items-center justify-between text-[11px] font-mono text-light-subtext dark:text-dark-subtext">
                <span>{group.skills.length} core technologies</span>
                <span className="text-accent-cyan">Production Ready</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

