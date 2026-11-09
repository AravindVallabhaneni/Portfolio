import React, { useState } from 'react';
import { Send, Mail, Copy, Check, ExternalLink, Github, Linkedin, FileText, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // Honeypot field for bot suppression
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot protection: if filled, quietly simulate success
    if (formData._gotcha) {
      setSubmitStatus('success');
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

    // If Formspree endpoint is not configured or is placeholder, fall back to mailto
    if (!endpoint || endpoint.includes('TODO')) {
      const mailtoUrl = `mailto:${profileData.links.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitStatus('success');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#0284C7', '#38BDF8', '#F59E0B'],
          });
        } catch {
          // ignore
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed. Please reach out via direct email.');
      }
    } catch (err: unknown) {
      console.warn('Formspree submission error:', err);
      const errMsg =
        err instanceof Error
          ? err.message
          : 'Unable to submit automatically. Please use the direct email link below.';
      setErrorMessage(errMsg);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <Badge variant="blue" size="sm">
            INITIATE CONTACT
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
            Currently open for Full-Stack Internships, Software Engineering roles, and Open Source collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Copy Email (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-light-heading dark:text-dark-heading">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-light-subtext dark:text-dark-subtext mt-1">
                  Have an internship opening, technical question, or project inquiry? I typically reply within 24 hours.
                </p>
              </div>

              {/* Email Copier Box */}
              <div className="p-4 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-accent-blue dark:text-accent-cyan shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-light-heading dark:text-dark-heading truncate">
                    {profileData.links.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 rounded-lg bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent-blue text-light-subtext dark:text-dark-subtext hover:text-accent-blue dark:hover:text-accent-cyan transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Quick Profile Links */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext uppercase tracking-wider block">
                  Connected Platforms
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-mono text-light-text dark:text-dark-text hover:border-accent-blue/50 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profileData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-mono text-light-text dark:text-dark-text hover:border-accent-blue/50 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-mono text-light-text dark:text-dark-text hover:border-accent-cyan/50 transition-colors col-span-2"
                  >
                    <FileText className="w-4 h-4 text-accent-cyan" />
                    <span>Download Official Resume (Google Drive)</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formspree Form with Honeypot & Fallback (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-6">
              <h3 className="font-heading font-bold text-xl text-light-heading dark:text-dark-heading">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Field (Hidden for Humans, Catches Spam Bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this field blank</label>
                  <input
                    type="text"
                    id="_gotcha"
                    name="_gotcha"
                    tabIndex={-1}
                    value={formData._gotcha}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-light-heading dark:text-dark-heading"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm text-light-heading dark:text-dark-heading placeholder-light-subtext/60 dark:placeholder-dark-subtext/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-light-heading dark:text-dark-heading"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm text-light-heading dark:text-dark-heading placeholder-light-subtext/60 dark:placeholder-dark-subtext/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-light-heading dark:text-dark-heading"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Full Stack Developer Internship / Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm text-light-heading dark:text-dark-heading placeholder-light-subtext/60 dark:placeholder-dark-subtext/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-light-heading dark:text-dark-heading"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Aravind, we saw your work on CivicPulse and would love to chat regarding..."
                    className="w-full px-4 py-2.5 rounded-xl bg-light-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm text-light-heading dark:text-dark-heading placeholder-light-subtext/60 dark:placeholder-dark-subtext/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors resize-y"
                  />
                </div>

                {/* Status Notifications */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>
                      Message sent successfully! Thank you for reaching out. I'll get back to you promptly.
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-mono flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span>{errorMessage}</span>
                      <div>
                        <a
                          href={`mailto:${profileData.links.email}`}
                          className="underline hover:text-rose-300 font-bold"
                        >
                          Click here to send email directly via your mail client &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  <span>{isSubmitting ? 'Sending Transmission...' : 'Transmit Message'}</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
