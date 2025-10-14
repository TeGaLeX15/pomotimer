import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "../progress";

interface TimerCircleProps {
  minutes: number;
  seconds: number;
  progress: number;
  isRunning: boolean;
  phaseColor: string;
}

export function TimerCircle({
  minutes,
  seconds,
  progress,
  isRunning,
  phaseColor,
}: TimerCircleProps) {
  return (
    <div className="relative flex items-center justify-center mb-6 md:mb-8 w-full max-w-[20rem] md:max-w-[22rem] mx-auto aspect-square">
      <motion.div
        animate={{
          scale: isRunning ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isRunning ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="w-full h-full"
      >
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 320 320"
        >
          {/* Outer glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-neutral-200 dark:text-neutral-700"
            opacity="0.3"
          />

          {/* Progress circle */}
          <motion.circle
            cx="160"
            cy="160"
            r="140"
            stroke={phaseColor}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 140}
            initial={{ strokeDashoffset: 2 * Math.PI * 140 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 140 * (1 - progress / 100),
            }}
            transition={{ duration: 0.5 }}
            filter="url(#glow)"
          />

          {/* Inner decorative circles */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 160 + 150 * Math.cos(angle);
            const y = 160 + 150 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill={phaseColor}
                opacity="0.3"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Time Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={`${minutes}:${seconds}`}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center px-4"
        >
          <motion.div
            className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-neutral-900 dark:text-white tabular-nums mb-2"
            animate={{
              color:
                minutes === 0 && seconds <= 60 && isRunning
                  ? ["currentColor", phaseColor, "currentColor"]
                  : "currentColor",
            }}
            transition={{
              duration: 1,
              repeat:
                minutes === 0 && seconds <= 60 && isRunning ? Infinity : 0,
            }}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </motion.div>

          {/* Progress bar */}
          <div className="w-32 mx-auto">
            <Progress
              value={progress}
              className="h-1"
              style={
                {
                  "--progress-background": phaseColor,
                } as React.CSSProperties
              }
            />
          </div>
        </motion.div>
      </div>

      {/* Pulse effect when running */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: phaseColor }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
