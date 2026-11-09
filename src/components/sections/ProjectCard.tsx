import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isStacked?: boolean;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isStacked = false,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || isStacked || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    // Calculate subtle 3D tilt angles (max +/- 8 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        y: isHovered && !isStacked && !prefersReduced ? -8 : 0,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`group relative rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border p-6 shadow-lg hover:shadow-2xl hover:border-accent-blue/50 dark:hover:border-accent-cyan/40 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
        isStacked ? 'w-full max-w-lg mx-auto shadow-2xl' : 'w-full'
      }`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && !prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Top Meta: Category + Index */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={project.category === 'AI / ML' ? 'purple' : 'blue'} size="sm">
            {project.category}
          </Badge>
          <span className="font-mono text-xs text-light-subtext dark:text-dark-subtext">
            0{index + 1} // 03
          </span>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-light-heading dark:text-dark-heading group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-accent-blue dark:text-accent-cyan/90 font-medium mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Problem Teaser */}
        <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext line-clamp-3 leading-relaxed">
          {project.problem}
        </p>

        {/* Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-light-card dark:bg-dark-hover border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md text-accent-cyan">
              +{project.stack.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="relative z-10 pt-6 mt-6 border-t border-light-border dark:border-dark-border flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-accent-blue dark:text-accent-cyan group-hover:translate-x-1 transition-transform">
          <span>View Architecture &amp; Spec</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>

        {/* External direct links */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.links.repo && project.links.repo !== 'TODO: confirm repo link' && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="p-1.5 rounded-lg text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="p-1.5 rounded-lg text-accent-blue dark:text-accent-cyan hover:bg-accent-blue/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
