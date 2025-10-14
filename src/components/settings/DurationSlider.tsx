import { motion } from 'framer-motion';
import { Slider } from '../slider';

interface DurationSliderProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  primaryColor: string;
  onChange: (value: number) => void;
}

export function DurationSlider({ 
  label, 
  value, 
  unit, 
  min, 
  max, 
  primaryColor, 
  onChange 
}: DurationSliderProps) {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
        <motion.span 
          key={value}
          initial={{ scale: 1.2, color: primaryColor }}
          animate={{ scale: 1, color: 'currentColor' }}
          className="text-sm md:text-base text-neutral-900 dark:text-white"
        >
          {value} {unit}
        </motion.span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />
    </div>
  );
}
