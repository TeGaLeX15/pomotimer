import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ColorTheme, ColorThemeConfig } from '../../store/themeSlice';

interface ColorThemeSelectorProps {
  currentTheme: ColorTheme;
  themes: Record<ColorTheme, ColorThemeConfig>;
  effectiveTheme: 'light' | 'dark';
  onThemeChange: (theme: ColorTheme) => void;
}

export function ColorThemeSelector({ 
  currentTheme, 
  themes, 
  effectiveTheme, 
  onThemeChange 
}: ColorThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
      {(Object.keys(themes) as ColorTheme[]).map((theme) => {
        const themeConfig = themes[theme];
        const themeColors = themeConfig[effectiveTheme];
        
        return (
          <motion.button
            key={theme}
            onClick={() => onThemeChange(theme)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 md:p-4 rounded-2xl border-2 transition-all relative ${
              currentTheme === theme
                ? 'shadow-lg'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
            style={{
              borderColor: currentTheme === theme ? themeColors.primary : undefined,
              backgroundColor: currentTheme === theme ? `${themeColors.primary}10` : undefined,
            }}
          >
            <AnimatePresence>
              {currentTheme === theme && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: themeColors.primary }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-center gap-1 mb-2">
              <motion.div 
                className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                style={{ backgroundColor: themeColors.primary }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                style={{ backgroundColor: themeColors.secondary }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                style={{ backgroundColor: themeColors.accent }}
                whileHover={{ scale: 1.2 }}
              />
            </div>
            <p 
              className="text-xs md:text-sm"
              style={{
                color: currentTheme === theme 
                  ? themeColors.primary 
                  : effectiveTheme === 'dark' ? '#a3a3a3' : '#525252',
              }}
            >
              {themeConfig.name}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
