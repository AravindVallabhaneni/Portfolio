import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ZoomIn, X, CheckCircle2, FileText, Download, Database } from 'lucide-react';
import { certificationsData } from '../../data/certifications';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{
    id: string;
    image: string;
    pdfUrl?: string;
    title: string;
    issuer: string;
  } | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const prefersReduced = useReducedMotion();

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                  <span className="text-xs font-mono font-semibold text-accent-blue dark:text-accent-cyan flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-accent-cyan" />
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Badge thumbnail preview with Lightbox trigger */}
                {cert.badgeImage && (
                  <div
                    onClick={() =>
                      setSelectedCert({
                        id: cert.id,
                        image: cert.badgeImage!,
                        pdfUrl: cert.pdfUrl,
                        title: cert.title,
                        issuer: cert.issuer,
                      })
                    }
                    className="relative w-full h-40 rounded-xl overflow-hidden bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border cursor-pointer group/thumb flex items-center justify-center p-2"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open certificate preview for ${cert.title}`}
                  >
                    {!imageErrors[cert.id] ? (
                      <img
                        src={cert.badgeImage}
                        alt={`${cert.title} preview`}
                        onError={() => setImageErrors((prev) => ({ ...prev, [cert.id]: true }))}
                        className="w-full h-full object-contain rounded-lg group-hover/thumb:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4 text-light-subtext dark:text-dark-subtext">
                        <Database className="w-8 h-8 text-accent-cyan mb-2 opacity-80" />
                        <span className="text-xs font-mono font-medium text-light-heading dark:text-dark-heading">
                          Official Certificate Document
                        </span>
                        <span className="text-[11px] font-mono text-light-subtext dark:text-dark-subtext mt-0.5">
                          Click to inspect
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-mono text-xs rounded-xl backdrop-blur-sm">
                      <ZoomIn className="w-4 h-4 text-accent-cyan" />
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

              {/* Verify Link or View Certificate Action */}
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
                  <button
                    type="button"
                    onClick={() =>
                      cert.badgeImage &&
                      setSelectedCert({
                        id: cert.id,
                        image: cert.badgeImage,
                        pdfUrl: cert.pdfUrl,
                        title: cert.title,
                        issuer: cert.issuer,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-blue dark:text-accent-cyan hover:underline group/btn focus:outline-none"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>View Certificate</span>
                    <ZoomIn className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
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
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-light-surface dark:bg-dark-card rounded-2xl overflow-hidden border border-light-border dark:border-dark-border p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-light-border dark:border-dark-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-heading font-bold text-sm text-light-heading dark:text-dark-heading">
                    {selectedCert.title}
                  </span>
                  <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                    ({selectedCert.issuer})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      download="MongoDB_Associate_DBA_Certificate_Aravind_Vallabhaneni.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-accent-blue dark:text-accent-cyan bg-accent-blue/10 dark:bg-accent-cyan/10 hover:bg-accent-blue/20 transition-colors"
                      title="Download Official PDF Certificate"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  )}
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-light-subtext dark:text-dark-subtext hover:text-accent-cyan hover:bg-light-card dark:hover:bg-dark-surface transition-colors"
                    title="Open full resolution in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-light-subtext dark:text-dark-subtext hover:text-light-heading dark:hover:text-dark-heading hover:bg-light-card dark:hover:bg-dark-surface transition-colors"
                    title="Close preview (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="flex items-center justify-center py-6 bg-light-card/40 dark:bg-dark-surface/60 rounded-xl my-3 p-2">
                {!imageErrors[selectedCert.id] ? (
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} document preview`}
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-light-border dark:border-dark-border"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Database className="w-12 h-12 text-accent-cyan mb-3 opacity-80" />
                    <p className="font-heading font-bold text-base text-light-heading dark:text-dark-heading">
                      {selectedCert.title}
                    </p>
                    <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1 font-mono">
                      Issued directly by {selectedCert.issuer}
                    </p>
                    <p className="text-xs text-accent-cyan mt-3 font-mono">
                      Save your certificate image as public/media/mongodb-cert.png to preview it here
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-2 text-xs font-mono text-light-subtext dark:text-dark-subtext">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Official Certificate Document
                </span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
