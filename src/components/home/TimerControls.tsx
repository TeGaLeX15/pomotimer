import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

interface TimerControlsProps {
  isRunning: boolean;
  phaseColor: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  translations: {
    start: string;
    pause: string;
    reset: string;
  };
}

export function TimerControls({ 
  isRunning, 
  phaseColor, 
  onStart, 
  onPause, 
  onReset, 
  translations 
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="rounded-2xl h-12 md:h-14 w-12 md:w-14 shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translations.reset}</p>
        </TooltipContent>
      </Tooltip>
      
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="flex-1 md:flex-none"
      >
        <Button
          onClick={isRunning ? onPause : onStart}
          size="lg"
          className="w-full rounded-2xl h-14 md:h-16 px-8 md:px-12 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
          style={{ 
            backgroundColor: phaseColor,
            borderColor: phaseColor,
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `linear-gradient(135deg, ${phaseColor} 0%, ${phaseColor}dd 100%)`,
                `linear-gradient(135deg, ${phaseColor}dd 0%, ${phaseColor} 100%)`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
          <span className="relative flex items-center">
            {isRunning ? (
              <>
                <Pause className="w-5 md:w-6 h-5 md:h-6 mr-2" />
                <span className="text-sm md:text-base">{translations.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-5 md:w-6 h-5 md:h-6 mr-2" />
                <span className="text-sm md:text-base">{translations.start}</span>
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
