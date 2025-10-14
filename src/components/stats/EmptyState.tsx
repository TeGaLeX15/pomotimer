import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  iconColor: string;
  iconBgColor: string;
}

export function EmptyState({ title, description, iconColor, iconBgColor }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 md:py-24"
    >
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: iconBgColor }}
      >
        <Target className="w-10 h-10" style={{ color: iconColor }} />
      </div>
      <h3 className="mb-2 text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-sm">
        {description}
      </p>
    </motion.div>
  );
}
