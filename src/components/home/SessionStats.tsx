import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';

interface SessionStatsProps {
  todaySessions: number;
  streak: number;
  primaryColor: string;
  translations: {
    completedToday: string;
    streak: string;
  };
}

export function SessionStats({ todaySessions, streak, primaryColor, translations }: SessionStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-850 border border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4" style={{ color: primaryColor }} />
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {translations.completedToday}
          </span>
        </div>
        <p className="text-2xl text-neutral-900 dark:text-white">
          {todaySessions}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800"
      >
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {translations.streak}
          </span>
        </div>
        <p className="text-2xl text-neutral-900 dark:text-white">
          {streak}
        </p>
      </motion.div>
    </div>
  );
}
