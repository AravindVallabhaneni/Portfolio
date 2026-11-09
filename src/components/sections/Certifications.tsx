import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ZoomIn, X } from 'lucide-react';
import { certificationsData } from '../../data/certifications';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Certifications: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const prefersReduced = useReducedMotion();

  // If no certifications exist, section is skipped
  if (!certificationsData || certificationsData.length === 0) {
    return null;
  }

  const categories = ['All', ...Array.from(new Set(certificationsData.map((c) => c.category)))];

  const filtered =
    activeFilter === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.category === activeFilter);

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-10">
          <Badge variant="cyan" size="sm">
            VERIFIED CREDENTIALS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight flex items-center gap-3">
            <span>Certifications &amp; Accreditations</span>
            <Award className="w-7 h-7 text-accent-cyan" />
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            Formal technical certifications validating domain competence across modern architectures and engineering best practices.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                activeFilter === cat
                  ? 'bg-accent-blue text-white shadow-sm'
                  : 'bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={prefersReduced ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between hover:border-accent-cyan/40 transition-colors group"
            >
              <div className="space-y-4">
                {/* Header: Issuer + Date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-accent-blue dark:text-accent-cyan">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Badge thumbnail preview with Lightbox trigger */}
                {cert.badgeImage && (
                  <div
                    onClick={() => setSelectedImage(cert.badgeImage || null)}
                    className="relative w-full h-36 rounded-xl overflow-hidden bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border cursor-pointer group/thumb flex items-center justify-center"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open certificate preview for ${cert.title}`}
                  >
                    <img
                      src={cert.badgeImage}
                      alt={`${cert.title} badge preview`}
                      className="w-full h-full object-contain p-2 group-hover/thumb:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-mono text-xs">
                      <ZoomIn className="w-4 h-4" />
                      <span>Inspect Certificate</span>
                    </div>
                  </div>
                )}

                {/* Title & Description */}
                <div>
                  <h3 className="font-heading font-bold text-base text-light-heading dark:text-dark-heading leading-snug">
                    {cert.title}
                  </h3>
                  {cert.description && (
                    <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1.5 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-4 mt-6 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-blue dark:text-accent-cyan hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                    Credential Pending Verification
                  </span>
                )}
                <Badge variant="outline" size="sm">
                  {cert.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-light-surface dark:bg-dark-card rounded-2xl overflow-hidden border border-light-border dark:border-dark-border p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-light-border dark:border-dark-border">
                <span className="font-heading font-bold text-sm text-light-heading dark:text-dark-heading">
                  Certificate Document Preview
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1 rounded-lg text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center py-6">
                <img
                  src={selectedImage}
                  alt="Enlarged certificate preview"
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
