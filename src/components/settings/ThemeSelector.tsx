import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeSelectorProps {
  currentMode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  primaryColor: string;
  translations: {
    light: string;
    dark: string;
    system: string;
  };
}

export function ThemeSelector({ currentMode, onModeChange, primaryColor, translations }: ThemeSelectorProps) {
  const options = [
    { value: 'light' as const, icon: Sun, label: translations.light },
    { value: 'dark' as const, icon: Moon, label: translations.dark },
    { value: 'system' as const, icon: Monitor, label: translations.system },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {options.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => onModeChange(value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 md:p-4 rounded-2xl border-2 transition-all relative ${
            currentMode === value
              ? 'border-2 shadow-lg'
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }`}
          style={{
            borderColor: currentMode === value ? primaryColor : undefined,
            backgroundColor: currentMode === value ? `${primaryColor}10` : undefined,
          }}
        >
          {currentMode === value && (
            <motion.div
              layoutId="selectedTheme"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
          <Icon 
            className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 ${
              currentMode === value ? '' : 'text-neutral-500'
            }`}
            style={{ color: currentMode === value ? primaryColor : undefined }}
          />
          <span 
            className={`text-xs md:text-sm ${
              currentMode === value ? '' : 'text-neutral-600 dark:text-neutral-400'
            }`}
            style={{ color: currentMode === value ? primaryColor : undefined }}
          >
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
