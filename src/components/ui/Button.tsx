import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium font-sans rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-accent-electric to-accent-blue text-white shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-heading dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover active:scale-[0.98]',
    outline:
      'border-2 border-accent-blue/60 text-accent-blue dark:text-accent-cyan hover:border-accent-cyan hover:bg-accent-blue/10 active:scale-[0.98]',
    ghost:
      'text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-card/60 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  const combinedClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asLink && href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer ' + (rel || '') : rel}
        className={combinedClass}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass}
      disabled={disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};

