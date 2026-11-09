import React from 'react';
import { Home } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-light-bg dark:bg-dark-bg text-light-heading dark:text-dark-heading font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-center space-y-4 shadow-xl">
        <span className="font-mono text-5xl font-extrabold text-accent-blue dark:text-accent-cyan block">
          404
        </span>
        <h2 className="text-2xl font-heading font-bold">Route Out of Bounds</h2>
        <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext">
          The requested coordinate does not exist on this deployment.
        </p>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-mono font-medium hover:bg-accent-electric transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </button>
      </div>
    </div>
  );
};
