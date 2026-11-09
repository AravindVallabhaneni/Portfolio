import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Zap, Target, AlertCircle, ExternalLink } from 'lucide-react';
import { useLeetCode } from '../../hooks/useLeetCode';
import { Badge } from '../ui/Badge';

export const LeetCodeSection: React.FC = () => {
  const { stats, isLoading, minutesAgo, refresh } = useLeetCode();

  // Generate 52 weeks x 7 days submission heatmap grid
  const heatmapData = useMemo(() => {
    const calendar = stats?.submissionCalendar || {};
    const weeks: Array<Array<{ dateStr: string; count: number; level: number }>> = [];

    const now = new Date();
    // End on current day of the week
    const oneDay = 86400 * 1000;
    const totalDays = 52 * 7;
    const startDate = new Date(now.getTime() - totalDays * oneDay);

    let currentDay = new Date(startDate);
    let currentWeek: Array<{ dateStr: string; count: number; level: number }> = [];

    for (let d = 0; d < totalDays; d++) {
      const unixSec = Math.floor(currentDay.getTime() / 1000);
      // Check timestamp or +/- 12 hour window in calendar map
      let count = calendar[unixSec.toString()] || 0;
      if (!count) {
        // LeetCode timestamps are normalized to midnight UTC or local
        for (const [key, val] of Object.entries(calendar)) {
          const kSec = parseInt(key, 10);
          if (Math.abs(kSec - unixSec) < 43200) {
            count = val;
            break;
          }
        }
      }

      let level = 0;
      if (count >= 5) level = 4;
      else if (count >= 3) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      currentWeek.push({
        dateStr: currentDay.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        count,
        level,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDay = new Date(currentDay.getTime() + oneDay);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [stats]);

  const levelColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-emerald-400 dark:bg-emerald-400';
      case 3:
        return 'bg-emerald-500/80 dark:bg-emerald-500/80';
      case 2:
        return 'bg-emerald-600/60 dark:bg-emerald-600/60';
      case 1:
        return 'bg-emerald-800/40 dark:bg-emerald-800/50';
      case 0:
      default:
        return 'bg-slate-200 dark:bg-dark-border/50';
    }
  };

  const easyRatio = stats ? Math.min(100, Math.round((stats.easySolved / stats.totalEasy) * 100)) : 0;
  const medRatio = stats ? Math.min(100, Math.round((stats.mediumSolved / stats.totalMedium) * 100)) : 0;
  const hardRatio = stats ? Math.min(100, Math.round((stats.hardSolved / stats.totalHard) * 100)) : 0;

  return (
    <section id="leetcode" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <Badge variant="warm" size="sm">
              ALGORITHMIC MASTERY
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light-heading dark:text-dark-heading tracking-tight flex items-center gap-3">
              <span>Live LeetCode Activity</span>
              <Trophy className="w-7 h-7 text-accent-warm" />
            </h2>
            <p className="text-base text-light-subtext dark:text-dark-subtext max-w-2xl font-sans">
              Real-time synchronization with LeetCode's GraphQL engine via our cached edge serverless pipeline.
            </p>
          </div>

          {/* Sync indicator + Manual refresh */}
          <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs text-light-subtext dark:text-dark-subtext">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Auto-synced ({minutesAgo})</span>
            </span>

            <button
              onClick={() => refresh()}
              disabled={isLoading}
              aria-label="Refresh LeetCode statistics"
              className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-card dark:hover:bg-dark-card transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mock / Preview Notice if username not yet swapped */}
        {stats?.isMock && (
          <div className="mb-8 p-4 rounded-xl bg-accent-warm/10 border border-accent-warm/30 flex items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-accent-warmLight dark:text-accent-warm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Preview Mode:</strong> Currently displaying representative data. To connect your live profile, set{' '}
                <code className="px-1.5 py-0.5 rounded bg-dark-bg text-accent-cyan font-bold">
                  LEETCODE_USERNAME
                </code>{' '}
                in your environment variables.
              </span>
            </div>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-accent-warm hover:underline"
            >
              <span>LeetCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Top Cards: Solved, Rank, Acceptance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Solved Card */}
          <div className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                TOTAL SOLVED
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold text-light-heading dark:text-dark-heading">
                  {stats?.totalSolved ?? 285}
                </span>
                <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                  / {stats?.totalQuestions ?? 3340}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>Consistent Solver</span>
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Acceptance Rate */}
          <div className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                ACCEPTANCE RATE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold text-accent-blue dark:text-accent-cyan">
                  {stats?.acceptanceRate ?? 64.8}%
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs font-mono text-light-subtext dark:text-dark-subtext">
              <span>Precision Benchmark</span>
              <Target className="w-3.5 h-3.5 text-accent-blue" />
            </div>
          </div>

          {/* Global Ranking */}
          <div className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                GLOBAL RANKING
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-bold text-accent-warm">
                  {stats?.ranking ? `~${stats.ranking.toLocaleString()}` : 'Top Tier'}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs font-mono text-light-subtext dark:text-dark-subtext">
              <span>Worldwide Competitors</span>
              <Trophy className="w-3.5 h-3.5 text-accent-warm" />
            </div>
          </div>

          {/* Active Consistency */}
          <div className="p-6 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-light-subtext dark:text-dark-subtext">
                DATA SOURCE
              </span>
              <div className="text-sm font-mono text-light-heading dark:text-dark-heading pt-1">
                Edge Serverless
              </div>
              <p className="text-xs text-light-subtext dark:text-dark-subtext">
                Zero CORS, TTL 600s cache
              </p>
            </div>
            <div className="pt-4 border-t border-light-border dark:border-dark-border text-xs font-mono text-accent-cyan">
              Swappable Adapter
            </div>
          </div>
        </div>

        {/* Breakdown by Difficulty */}
        <div className="p-6 sm:p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-6 mb-8">
          <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
            Difficulty Distribution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Easy Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-500 font-semibold">Easy</span>
                <span className="text-light-subtext dark:text-dark-subtext">
                  {stats?.easySolved ?? 130} / {stats?.totalEasy ?? 834}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-light-card dark:bg-dark-bg overflow-hidden border border-light-border dark:border-dark-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${easyRatio}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Medium Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent-warm font-semibold">Medium</span>
                <span className="text-light-subtext dark:text-dark-subtext">
                  {stats?.mediumSolved ?? 135} / {stats?.totalMedium ?? 1735}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-light-card dark:bg-dark-bg overflow-hidden border border-light-border dark:border-dark-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${medRatio}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-accent-warm rounded-full"
                />
              </div>
            </div>

            {/* Hard Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-500 font-semibold">Hard</span>
                <span className="text-light-subtext dark:text-dark-subtext">
                  {stats?.hardSolved ?? 20} / {stats?.totalHard ?? 776}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-light-card dark:bg-dark-bg overflow-hidden border border-light-border dark:border-dark-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${hardRatio}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 12-Month Heatmap Calendar Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-heading font-bold text-lg text-light-heading dark:text-dark-heading">
              12-Month Submission Calendar
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-mono text-light-subtext dark:text-dark-subtext">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-dark-border/50" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800/40" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/60" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          {/* Scrollable Heatmap Canvas/Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1 min-w-[720px]">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      title={`${day.dateStr}: ${day.count} submissions`}
                      className={`w-3 h-3 rounded-sm transition-colors cursor-pointer hover:ring-2 hover:ring-accent-cyan ${levelColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
