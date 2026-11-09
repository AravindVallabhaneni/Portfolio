import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'warm' | 'emerald' | 'purple' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  pulseDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  pulseDot = false,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-accent-blue/10 text-accent-cyan border-accent-blue/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    warm: 'bg-accent-warm/10 text-accent-warmLight border-accent-warm/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    slate:
      'bg-slate-200 dark:bg-dark-card text-slate-700 dark:text-dark-subtext border-slate-300 dark:border-dark-border',
    outline: 'bg-transparent text-light-subtext dark:text-dark-subtext border-dark-border',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs sm:text-sm px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
      {children}
    </span>
  );
};

