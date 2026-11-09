import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Skip if already seen in this session
    const seen = sessionStorage.getItem('portfolio_preloader_seen');
    return !seen;
  });

  const handleSkip = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio_preloader_seen', 'true');
    } catch {
      // ignore
    }
    setIsVisible(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) {
      sessionStorage.setItem('portfolio_preloader_seen', 'true');
      setIsVisible(false);
      onComplete();
      return;
    }

    if (!isVisible) {
      onComplete();
      return;
    }

    // Auto complete after 2.0s
    const timer = setTimeout(() => {
      handleSkip();
    }, 2000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, prefersReduced, onComplete, handleSkip]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg text-dark-heading select-none cursor-pointer"
          onClick={handleSkip}
          role="dialog"
          aria-label="Welcome Intro Animation"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 bg-accent-blue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Monogram Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-electric flex items-center justify-center font-heading font-bold text-2xl text-white shadow-xl shadow-accent-blue/30 mb-6"
            >
              AV
            </motion.div>

            {/* Revealing Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-white mb-2"
            >
              Aravind Vallabhaneni
            </motion.h1>

            {/* Monospace Code Pill */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono text-accent-cyan tracking-wider uppercase mb-6"
            >
              Full Stack Developer &amp; Systems Builder
            </motion.p>

            {/* Animated Progress Bar */}
            <div className="w-48 h-1 bg-dark-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-warm"
              />
            </div>

            {/* Skip Hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-[11px] font-mono text-dark-subtext hover:text-white transition-colors"
            >
              Press ESC or click to skip
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
