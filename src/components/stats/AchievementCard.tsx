import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: number;
  unit: string;
  gradient: string;
  border: string;
}

export function AchievementCard({ 
  icon: Icon, 
  iconColor, 
  label, 
  value, 
  unit,
  gradient,
  border,
}: AchievementCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} border ${border}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
        <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
      </div>
      <p className="text-2xl text-neutral-900 dark:text-white">
        {value} <span className="text-sm text-neutral-500">{unit}</span>
      </p>
    </motion.div>
  );
}
