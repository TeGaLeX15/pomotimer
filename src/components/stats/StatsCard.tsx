import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  blurColor: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor, iconBgColor, blurColor }: StatsCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
      <Card className="p-4 md:p-6 rounded-3xl border-neutral-200 dark:border-neutral-700 relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: blurColor }}
        />
        <div className="relative flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1 truncate">
              {title}
            </p>
            <motion.p 
              className="text-3xl md:text-4xl text-neutral-900 dark:text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {value}
              {subtitle && (
                <span className="text-lg md:text-xl text-neutral-500 ml-1">{subtitle}</span>
              )}
            </motion.p>
          </div>
          <div 
            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ml-2"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: iconColor }} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
