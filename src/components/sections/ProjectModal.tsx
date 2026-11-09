import React from 'react';
import { ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Cpu } from 'lucide-react';
import { ProjectItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose} title={project.title} maxWidth="3xl">
      <div className="space-y-6">
        {/* Tagline & Category */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={project.category === 'AI / ML' ? 'purple' : 'blue'}>
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
              Role: {project.role}
            </span>
          </div>
          <p className="text-base text-accent-blue dark:text-accent-cyan font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons: Live App + GitHub */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.links.live && (
            <Button
              variant="primary"
              size="md"
              asLink
              href={project.links.live}
              target="_blank"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              <span>Visit Production Live App</span>
            </Button>
          )}

          {project.links.repo && project.links.repo !== 'TODO: confirm repo link' ? (
            <Button
              variant="secondary"
              size="md"
              asLink
              href={project.links.repo}
              target="_blank"
              icon={<Github className="w-4 h-4" />}
            >
              <span>View Source on GitHub</span>
            </Button>
          ) : (
            <Badge variant="warm" size="md">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{project.links.repo}</span>
            </Badge>
          )}
        </div>

        {/* The Problem Breakdown */}
        <div className="p-4 rounded-xl bg-light-card dark:bg-dark-hover/50 border border-light-border dark:border-dark-border space-y-1.5">
          <h4 className="font-heading font-semibold text-sm text-light-heading dark:text-dark-heading flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-accent-warm" />
            The Real Problem Solved:
          </h4>
          <p className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Architecture & Engineering Highlights */}
        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-base text-light-heading dark:text-dark-heading flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accent-cyan" />
            Key Architecture &amp; System Highlights
          </h4>
          <ul className="space-y-2.5">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Notes List if present */}
        {project.architectureNotes && (
          <div className="p-4 rounded-xl bg-dark-bg/60 border border-dark-border space-y-2 font-mono text-xs text-dark-text">
            <span className="text-accent-cyan font-bold block mb-1">
              // ARCHITECTURAL SPECIFICATION
            </span>
            {project.architectureNotes.map((note, idx) => (
              <p key={idx} className="text-dark-subtext">
                &bull; {note}
              </p>
            ))}
          </div>
        )}

        {/* Full Tech Stack Taxonomy */}
        <div className="space-y-2">
          <h4 className="font-heading font-semibold text-sm text-light-heading dark:text-dark-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-blue" />
            Full Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-heading dark:text-dark-heading"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Quantified Results & Metrics (Honest Fresher Standard) */}
        <div className="p-4 rounded-xl border border-dashed border-accent-warm/40 bg-accent-warm/5 space-y-1">
          <span className="text-xs font-mono font-semibold text-accent-warm block">
            Impact &amp; Quantified Results:
          </span>
          <p className="text-sm font-mono text-light-subtext dark:text-dark-subtext">
            {project.result}
          </p>
        </div>
      </div>
    </Modal>
  );
};

