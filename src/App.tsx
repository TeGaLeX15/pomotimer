import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { updateEffectiveTheme, colorThemes } from './store/themeSlice';
import { Navigation } from './components/Navbar';
import { Timer } from './pages/Home';
import { Stats } from './pages/Stats';
import { Settings } from './pages/Settings';
import { Toaster } from './components/sonner';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTitleBar from './components/CustomTitileBar';
import { isElectron } from './utils/isElectron';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'timer' | 'stats' | 'settings'>('timer');
  const { effectiveTheme, colorTheme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const showCustomTitleBar = isElectron();
  const navHeight = 60; // например, высота твоей навигации
  const titleBarHeight = 48; // высота кастомного заголовка

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      dispatch(updateEffectiveTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  useEffect(() => {
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveTheme]);

  // Apply theme colors as CSS variables
  useEffect(() => {
    const colors = colorThemes[colorTheme][effectiveTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-primary-hover', colors.primaryHover);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
  }, [colorTheme, effectiveTheme]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
    {/* Кастомный заголовок только на Electron */}
    {showCustomTitleBar && <CustomTitleBar />}

    {/* Навигация */}
    <Navigation
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      className={showCustomTitleBar ? 'mt-12' : ''} // mt-12 ≈ 48px тайтлбар
    />

    {/* Контент страницы */}
    <main
      className="pb-20 md:pb-8 min-h-screen"
      style={{ paddingTop: showCustomTitleBar ? titleBarHeight + navHeight : navHeight }}
    >
      
        <AnimatePresence mode="wait">
          {currentPage === 'timer' && (
            <motion.div
              key="timer"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Timer />
            </motion.div>
          )}
          {currentPage === 'stats' && (
            <motion.div
              key="stats"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Stats />
            </motion.div>
          )}
          {currentPage === 'settings' && (
            <motion.div
              key="settings"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Settings />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
