import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, CheckCircle, Briefcase, Sparkles, Terminal, Award, Users } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const About: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="py-24 relative bg-light-surface/50 dark:bg-dark-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <Badge variant="blue" size="sm">
            ABOUT ME
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight">
            Engineering Systems From Ground Up
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            A background grounded in computer science fundamentals, modern full-stack web architectures, and applied algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-accent-blue dark:text-accent-cyan font-mono text-sm font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Full Name: {profileData.fullName}</span>
              </div>

              {profileData.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base text-light-text dark:text-dark-text leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-light-border dark:border-dark-border flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                  Primary Interests:
                </span>
                <Badge variant="cyan" size="sm">Geospatial PostGIS</Badge>
                <Badge variant="purple" size="sm">LLM Orchestration</Badge>
                <Badge variant="warm" size="sm">Cloud Infrastructure</Badge>
                <Badge variant="emerald" size="sm">MongoDB &amp; SQL</Badge>
              </div>
            </div>

            {/* Availability Matrix */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent-blue/5 via-accent-cyan/5 to-transparent border border-accent-blue/20 dark:border-accent-blue/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-base text-light-heading dark:text-dark-heading flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent-blue" />
                  Current Availability
                </span>
                <Badge variant="emerald" pulseDot size="sm">
                  Active Seeking
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {profileData.availability.roles.map((role, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-xs font-medium text-light-text dark:text-dark-text"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-light-subtext dark:text-dark-subtext pt-2">
                <MapPin className="w-3.5 h-3.5 text-accent-warm" />
                <span>Location Preference: <strong className="text-accent-warm">{profileData.availability.locationPreference}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Highlights & Metrics (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Academic Standing Card */}
            <motion.div
              whileHover={prefersReduced ? {} : { y: -3 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
                VIT-AP University
              </h3>
              <p className="text-sm text-light-subtext dark:text-dark-subtext">
                B.Tech in Computer Science and Engineering (2023–2027)
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-light-border dark:border-dark-border font-mono text-sm">
                <span className="text-light-subtext dark:text-dark-subtext">Current Cumulative GPA</span>
                <span className="text-emerald-500 font-bold text-base">8.86 / 10.0</span>
              </div>
            </motion.div>

            {/* Leadership & Activities Card: Kalki Personality Development Club */}
            <motion.div
              whileHover={prefersReduced ? {} : { y: -3 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-accent-warm/10 text-accent-warm flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <Badge variant="warm" size="sm">2 Years Leadership</Badge>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-light-heading dark:text-dark-heading">
                  Kalki Personality Development Club
                </h3>
                <p className="text-xs text-light-subtext dark:text-dark-subtext mt-0.5">
                  University Student Organization
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-light-border dark:border-dark-border text-xs text-light-text dark:text-dark-text font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="text-accent-cyan font-bold">&bull; 2nd Year:</span>
                  <span>Event Management Department</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-accent-blue font-bold">&bull; 1st Year:</span>
                  <span>PR &amp; Outreach Department</span>
                </p>
              </div>
            </motion.div>

            {/* Verified Certification Card: MongoDB Associate DBA */}
            <motion.div
              whileHover={prefersReduced ? {} : { y: -3 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <Badge variant="emerald" size="sm">Verified DBA</Badge>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-light-heading dark:text-dark-heading">
                  MongoDB Associate Database Administrator
                </h3>
                <p className="text-xs text-light-subtext dark:text-dark-subtext mt-0.5">
                  Certified by FACE Prep
                </p>
              </div>
              <div className="pt-2 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs font-mono text-light-subtext dark:text-dark-subtext">
                <span>Database Administration</span>
                <span className="text-emerald-500 font-semibold">Certified</span>
              </div>
            </motion.div>

            {/* Philosophy Box */}
            <div className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-dashed border-light-border dark:border-dark-border text-xs text-light-subtext dark:text-dark-subtext space-y-2">
              <span className="font-mono font-semibold text-light-heading dark:text-dark-heading flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                Engineering Standard:
              </span>
              <p>
                "I focus on production realities: atomic database constraints, spatial indexes, unit tests, and real-time streaming over artificial complexity."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
