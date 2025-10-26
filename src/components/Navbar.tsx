import { Timer as TimerIcon, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { colorThemes } from '../store/themeSlice';

interface NavigationProps {
  currentPage: 'timer' | 'stats' | 'settings';
  onPageChange: (page: 'timer' | 'stats' | 'settings') => void;
  className?: string; // добавляем возможность передавать класс
}

const translations = {
  en: {
    timer: 'Timer',
    stats: 'Stats',
    settings: 'Settings',
  },
  ru: {
    timer: 'Таймер',
    stats: 'Статистика',
    settings: 'Настройки',
  },
  kk: {
    timer: 'Таймер',
    stats: 'Статистика',
    settings: 'Баптаулар',
  },
};

export function Navigation({ currentPage, onPageChange, className }: NavigationProps) {
  const { language } = useAppSelector(state => state.settings);
  const { effectiveTheme, colorTheme } = useAppSelector(state => state.theme);
  const t = translations[language];
  const colors = colorThemes[colorTheme][effectiveTheme];

  const navItems = [
    { id: 'timer' as const, icon: TimerIcon, label: t.timer },
    { id: 'stats' as const, icon: BarChart3, label: t.stats },
    { id: 'settings' as const, icon: SettingsIcon, label: t.settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 ${className ?? ''}`}>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                }}
              >
                <TimerIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-neutral-900 dark:text-white">
                PomoTimer
              </span>
            </div>

            <div className="flex items-center gap-2 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-2 rounded-xl transition-colors ${
                    currentPage === id
                      ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                  style={{
                    color: currentPage === id ? colors.primary : undefined,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className="flex flex-col items-center gap-1 py-2 px-4 sm:px-6 relative min-w-0 flex-1"
            >
              <Icon
                className="w-6 h-6 transition-colors"
                style={{
                  color: currentPage === id ? colors.primary : '#a3a3a3',
                }}
              />
              <span
                className="text-xs truncate max-w-full transition-colors"
                style={{
                  color: currentPage === id ? colors.primary : '#a3a3a3',
                }}
              >
                {label}
              </span>
              {currentPage === id && (
                <div
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
