import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Send, FileText, MapPin } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HeroBackdrop } from './HeroBackdrop';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const prefersReduced = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* 30fps Capped Ambient Particles */}
      <HeroBackdrop />

      {/* Radial Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-accent-blue/15 to-accent-warm/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="emerald" pulseDot size="md">
                <span>{profileData.availability.headline}</span>
                <span className="text-dark-subtext dark:text-dark-subtext">•</span>
                <span>Internships &amp; Entry Roles</span>
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-sm sm:text-base font-mono text-accent-cyan tracking-wide">
                HELLO WORLD, I AM
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-bold tracking-tight text-light-heading dark:text-dark-heading leading-[1.08]">
                Aravind <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-warm">
                  Vallabhaneni
                </span>
              </h1>
            </motion.div>

            {/* Positioning Statement */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-lg sm:text-xl text-light-subtext dark:text-dark-subtext max-w-2xl font-sans leading-relaxed"
            >
              {profileData.positioningLine}
            </motion.p>

            {/* Key Specs Pills */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-xs"
            >
              <span className="px-3 py-1 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-heading dark:text-dark-heading flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                VIT-AP CSE (CGPA 8.86)
              </span>
              <span className="px-3 py-1 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-heading dark:text-dark-heading flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                MERN &amp; PostgreSQL (PostGIS)
              </span>
              <span className="px-3 py-1 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-accent-warm" />
                {profileData.availability.locationPreference}
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              {/* Explore CTA */}
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreClick}
                icon={<ArrowDown className="w-4 h-4 animate-bounce" />}
                className="group"
              >
                <span>Explore My Work</span>
              </Button>

              {/* Contact Button */}
              <Button
                variant="secondary"
                size="lg"
                onClick={onContactClick}
                icon={<Send className="w-4 h-4" />}
              >
                <span>Get In Touch</span>
              </Button>

              {/* Resume External Link */}
              <Button
                variant="outline"
                size="lg"
                asLink
                href={profileData.links.resume}
                target="_blank"
                icon={<FileText className="w-4 h-4" />}
              >
                <span>Resume</span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Profile Picture + Animated Video Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group cursor-pointer"
            >
              {/* Outer Pulsing Gradient Ring */}
              <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-warm opacity-40 group-hover:opacity-75 blur-xl transition-all duration-500 animate-pulse-slow" />

              {/* Styled Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-1 bg-gradient-to-b from-accent-cyan/40 via-accent-blue/20 to-accent-warm/40 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-dark-surface border border-light-border dark:border-dark-border">
                  {/* Static Poster Image (always rendered as fallback) */}
                  <img
                    src={profileData.media.poster}
                    alt={profileData.media.alt}
                    width={480}
                    height={480}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                      videoLoaded && (isHovered || !prefersReduced)
                        ? 'opacity-0'
                        : 'opacity-100'
                    }`}
                    loading="eager"
                  />

                  {/* Looping Ambient Video (crossfades smoothly without audio) */}
                  {!prefersReduced && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={profileData.media.poster}
                      aria-label="Aravind Vallabhaneni looping video presentation"
                      onLoadedData={() => setVideoLoaded(true)}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        videoLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {profileData.media.videoWebm && (
                        <source src={profileData.media.videoWebm} type="video/webm" />
                      )}
                      <source src={profileData.media.videoMp4} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )}

                  {/* Tech Watermark Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-lg bg-dark-bg/85 backdrop-blur-md border border-dark-border flex items-center justify-between text-[11px] font-mono text-dark-text">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Full-Stack Dev
                    </span>
                    <span className="text-accent-cyan">VIT-AP '27</span>
                  </div>
                </div>
              </div>

              {/* Floating Interaction Hint */}
              <div className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md text-[11px] font-mono text-light-subtext dark:text-dark-subtext flex items-center gap-1 group-hover:scale-105 transition-transform">
                <Sparkles className="w-3 h-3 text-accent-warm" />
                <span>Hover for clip</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

