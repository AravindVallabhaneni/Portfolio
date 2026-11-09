import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { profileData } from '../../data/profile';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'building', label: 'Building' },
  { id: 'skills', label: 'Skills' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-light-surface/85 dark:bg-dark-bg/85 backdrop-blur-md border-b border-light-border dark:border-dark-border shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Monogram */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="Aravind Vallabhaneni - Back to Top"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-electric text-white font-heading font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                AV
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-warm rounded-full border-2 border-light-surface dark:border-dark-bg" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="block font-heading font-bold text-sm tracking-tight text-light-heading dark:text-dark-heading group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors">
                  Aravind Vallabhaneni
                </span>
                <span className="block text-[11px] font-mono text-light-subtext dark:text-dark-subtext">
                  Full Stack Engineer
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-accent-blue dark:text-accent-cyan'
                        : 'text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-card/50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-blue dark:bg-accent-cyan rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Resume + Theme Toggle + Mobile Menu Button */}
            <div className="flex items-center gap-2.5">
              {/* Resume CTA */}
              <a
                href={profileData.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border border-accent-blue/40 text-accent-blue dark:text-accent-cyan hover:bg-accent-blue/10 dark:hover:bg-accent-blue/20 transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent-blue/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-accent-warm" />
                ) : (
                  <Moon className="w-4 h-4 text-accent-electric" />
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2 rounded-xl text-light-heading dark:text-dark-heading bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 p-4 bg-light-surface dark:bg-dark-card border-b border-light-border dark:border-dark-border shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5 py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-accent-blue/10 text-accent-blue dark:text-accent-cyan font-semibold'
                      : 'text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue dark:bg-accent-cyan" />
                  )}
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-light-border dark:border-dark-border flex flex-col gap-2">
                <a
                  href={profileData.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-sm bg-accent-blue text-white font-medium hover:bg-accent-electric transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Full Resume</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

