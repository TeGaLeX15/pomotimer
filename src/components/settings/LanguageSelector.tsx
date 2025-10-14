import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Language } from '../../store/settingsSlice';

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

interface LanguageSelectorProps {
  currentLanguage: Language;
  options: LanguageOption[];
  primaryColor: string;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ 
  currentLanguage, 
  options, 
  primaryColor, 
  onLanguageChange 
}: LanguageSelectorProps) {
  return (
    <div className="space-y-2">
      {options.map(({ value, label, flag }) => (
        <motion.button
          key={value}
          onClick={() => onLanguageChange(value)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full flex items-center justify-between p-3 md:p-4 rounded-2xl transition-all relative ${
            currentLanguage === value
              ? 'shadow-lg'
              : 'border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }`}
          style={{
            borderColor: currentLanguage === value ? primaryColor : undefined,
            backgroundColor: currentLanguage === value ? `${primaryColor}10` : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl">{flag}</span>
            <span 
              className={`text-sm md:text-base ${
                currentLanguage === value ? '' : 'text-neutral-700 dark:text-neutral-300'
              }`}
              style={{ color: currentLanguage === value ? primaryColor : undefined }}
            >
              {label}
            </span>
          </div>
          <AnimatePresence>
            {currentLanguage === value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}
