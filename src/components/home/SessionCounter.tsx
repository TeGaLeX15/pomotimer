import { motion } from 'framer-motion';

interface SessionCounterProps {
  sessionNumber: number;
  label: string;
}

export function SessionCounter({ sessionNumber, label }: SessionCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 text-center"
    >
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {label} #{sessionNumber}
      </p>
    </motion.div>
  );
}
