import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid, Layers, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { Badge } from '../ui/Badge';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectsSectionProps {
  _isFannedOut?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <Badge variant="cyan" size="sm">
              FEATURED ENGINEERING
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight">
              Production-Grade Projects
            </h2>
            <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
              Deployed, real-world systems built with end-to-end typing, PostGIS spatial computation, and AI inference fallbacks.
            </p>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="p-1 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-accent-blue text-white shadow-sm'
                    : 'text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading'
                }`}
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  viewMode === 'carousel'
                    ? 'bg-accent-blue text-white shadow-sm'
                    : 'text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading'
                }`}
                aria-label="Carousel layout"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Deck</span>
              </button>
            </div>

            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Display: Grid vs 3D Deck Carousel */}
        {viewMode === 'grid' ? (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={prefersReduced ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* 3D Carousel / Deck view */
          <div className="relative min-h-[480px] flex items-center justify-center py-6">
            <div className="w-full max-w-xl mx-auto relative h-[420px]">
              <AnimatePresence mode="popLayout">
                {projectsData.map((project, idx) => {
                  const offset = (idx - currentIndex + projectsData.length) % projectsData.length;
                  const isCenter = offset === 0;

                  // Render only center and adjacent cards for 3D depth
                  if (offset > 1 && offset < projectsData.length - 1) return null;

                  const xPos = isCenter ? 0 : offset === 1 ? 120 : -120;
                  const zIndex = isCenter ? 30 : 10;
                  const scale = isCenter ? 1 : 0.88;
                  const opacity = isCenter ? 1 : 0.45;

                  return (
                    <motion.div
                      key={project.id}
                      style={{ position: 'absolute', inset: 0, zIndex }}
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                      animate={{
                        x: prefersReduced ? 0 : xPos,
                        scale,
                        opacity,
                        rotateY: prefersReduced ? 0 : isCenter ? 0 : offset === 1 ? -12 : 12,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    >
                      <ProjectCard
                        project={project}
                        index={idx}
                        isStacked={!isCenter}
                        onSelect={(p) => {
                          if (isCenter) {
                            setSelectedProject(p);
                          } else {
                            setCurrentIndex(idx);
                          }
                        }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Feature Hint Banner */}
        <div className="mt-12 p-4 rounded-xl bg-light-surface/60 dark:bg-dark-card/60 border border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-light-subtext dark:text-dark-subtext gap-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-warm" />
            <span>Click any project card to inspect full technical architecture &amp; database schemas.</span>
          </span>
          <span className="text-accent-blue dark:text-accent-cyan">
            3 High-Impact Repositories
          </span>
        </div>
      </div>

      {/* Shared-Element Full Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
