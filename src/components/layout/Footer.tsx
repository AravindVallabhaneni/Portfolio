import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText, Heart } from 'lucide-react';
import { profileData } from '../../data/profile';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-light-border dark:border-dark-border">
          {/* Brand & Positioning */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
              {profileData.name}
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext max-w-md">
              {profileData.positioningLine}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading hover:border-accent-blue/50 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-[#0077B5] hover:border-[#0077B5]/50 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.links.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-accent-warm hover:border-accent-warm/50 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
            </a>
            <button
              onClick={onBackToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-accent-blue dark:hover:text-accent-cyan hover:border-accent-blue/50 transition-colors ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-light-subtext dark:text-dark-subtext gap-3">
          <p className="flex items-center gap-1.5">
            <span>Designed &amp; Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in React 18, Node.js &amp; Tailwind</span>
          </p>

          <p>&copy; {currentYear} Aravind Vallabhaneni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

