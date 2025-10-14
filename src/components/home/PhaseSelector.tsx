import { motion } from 'framer-motion';
import type { TimerPhase } from '../../store/timerSlice';

interface PhaseSelectorProps {
  currentPhase: TimerPhase;
  onPhaseChange: (phase: TimerPhase) => void;
  phaseColors: Record<TimerPhase, string>;
  translations: {
    focus: string;
    shortBreak: string;
    longBreak: string;
  };
}

export function PhaseSelector({ currentPhase, onPhaseChange, phaseColors, translations }: PhaseSelectorProps) {
  const phases: TimerPhase[] = ['focus', 'shortBreak', 'longBreak'];

  return (
    <div className="flex gap-2 mb-6 md:mb-8 p-1 rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-inner">
      {phases.map((phase) => (
        <motion.button
          key={phase}
          onClick={() => onPhaseChange(phase)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-2 sm:px-4 py-2.5 md:py-3 rounded-2xl transition-all text-sm md:text-base relative overflow-hidden ${
            currentPhase === phase
              ? 'bg-white dark:bg-neutral-700 shadow-lg'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-750'
          }`}
        >
          {currentPhase === phase && (
            <motion.div
              layoutId="activePhase"
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${phaseColors[phase]}10 0%, ${phaseColors[phase]}20 100%)`,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span 
            className={`relative ${currentPhase === phase ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}
            style={{ color: currentPhase === phase ? phaseColors[phase] : undefined }}
          >
            {translations[phase as keyof typeof translations]}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
