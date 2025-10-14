import { motion } from 'framer-motion';
import { Sun, Volume2, VolumeX, Globe, Trash2, Palette, Monitor } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setColorTheme, colorThemes } from '../store/themeSlice';
import {
  setFocusDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  toggleSound,
  setLanguage,
  type Language,
} from '../store/settingsSlice';
import { resetStats } from '../store/statsSlice';
import { Switch } from '../components/switch';
import { Button } from '../components/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/alert-dialog';
import { SettingsSection } from '../components/settings/SettingsSection';
import { ThemeSelector } from '../components/settings/ThemeSelector';
import { ColorThemeSelector } from '../components/settings/ColorThemeSelector';
import { DurationSlider } from '../components/settings/DurationSlider';
import { LanguageSelector } from '../components/settings/LanguageSelector';

const translations = {
  en: {
    settings: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    colorTheme: 'Color Theme',
    durations: 'Session Durations',
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    minutes: 'min',
    notifications: 'Notifications',
    sound: 'Sound Notifications',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    data: 'Data Management',
    resetStats: 'Reset Statistics',
    resetConfirm: 'Are you sure you want to reset all statistics?',
    resetDesc: 'This action cannot be undone. All your session history will be permanently deleted.',
    cancel: 'Cancel',
    confirm: 'Reset',
  },
  ru: {
    settings: 'Настройки',
    appearance: 'Внешний вид',
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Тёмная',
    system: 'Системная',
    colorTheme: 'Цветовая тема',
    durations: 'Длительность сессий',
    focus: 'Фокус',
    shortBreak: 'Короткий перерыв',
    longBreak: 'Длинный перерыв',
    minutes: 'мин',
    notifications: 'Уведомления',
    sound: 'Звуковые уведомления',
    language: 'Язык',
    languageDesc: 'Выберите предпочитаемый язык',
    data: 'Управление данными',
    resetStats: 'Сбросить статистику',
    resetConfirm: 'Вы уверены, что хотите сбросить всю статистику?',
    resetDesc: 'Это действие нельзя отменить. Вся история ваших сессий будет удалена навсегда.',
    cancel: 'Отмена',
    confirm: 'Сбросить',
  },
  kk: {
    settings: 'Баптаулар',
    appearance: 'Сыртқы түрі',
    theme: 'Тақырып',
    light: 'Ашық',
    dark: 'Қараңғы',
    system: 'Жүйелік',
    colorTheme: 'Түсті тақырып',
    durations: 'Сессия ұзақтығы',
    focus: 'Фокус',
    shortBreak: 'Қысқа үзіліс',
    longBreak: 'Ұзақ үзіліс',
    minutes: 'мин',
    notifications: 'Хабарландырулар',
    sound: 'Дыбыстық хабарландырулар',
    language: 'Тіл',
    languageDesc: 'Қалаулы тілді таңдаңыз',
    data: 'Деректерді басқару',
    resetStats: 'Статистиканы тазарту',
    resetConfirm: 'Барлық статистиканы тазартқыңыз келе ме?',
    resetDesc: 'Бұл әрекетті болдырмауға болмайды. Барлық сессия тарихы біржола жойылады.',
    cancel: 'Болдырмау',
    confirm: 'Тазарту',
  },
};

export function Settings() {
  const dispatch = useAppDispatch();
  const { mode, effectiveTheme, colorTheme } = useAppSelector(state => state.theme);
  const settings = useAppSelector(state => state.settings);
  
  const t = translations[settings.language];
  const colors = colorThemes[colorTheme][effectiveTheme];

  const languageOptions: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'ru', label: 'Русский', flag: '🇷🇺' },
    { value: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  ];

  return (
    <div className="px-4 py-6 md:py-8 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-4 md:mb-6 text-neutral-900 dark:text-white">{t.settings}</h1>

        {/* Appearance */}
        <SettingsSection
          title={t.appearance}
          icon={Sun}
          iconColor={colors.primary}
          iconBgColor={`${colors.primary}20`}
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{t.theme}</p>
              <ThemeSelector
                currentMode={mode}
                onModeChange={(mode) => dispatch(setTheme(mode))}
                primaryColor={colors.primary}
                translations={{
                  light: t.light,
                  dark: t.dark,
                  system: t.system,
                }}
              />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.colorTheme}</p>
              </div>
              <ColorThemeSelector
                currentTheme={colorTheme}
                themes={colorThemes}
                effectiveTheme={effectiveTheme}
                onThemeChange={(theme) => dispatch(setColorTheme(theme))}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Durations */}
        <SettingsSection
          title={t.durations}
          icon={Monitor}
          iconColor={colors.secondary}
          iconBgColor={`${colors.secondary}20`}
        >
          <div className="space-y-6">
            <DurationSlider
              label={t.focus}
              value={settings.focusDuration}
              unit={t.minutes}
              min={1}
              max={60}
              primaryColor={colors.primary}
              onChange={(value) => dispatch(setFocusDuration(value))}
            />

            <DurationSlider
              label={t.shortBreak}
              value={settings.shortBreakDuration}
              unit={t.minutes}
              min={1}
              max={30}
              primaryColor={colors.primary}
              onChange={(value) => dispatch(setShortBreakDuration(value))}
            />

            <DurationSlider
              label={t.longBreak}
              value={settings.longBreakDuration}
              unit={t.minutes}
              min={1}
              max={60}
              primaryColor={colors.primary}
              onChange={(value) => dispatch(setLongBreakDuration(value))}
            />
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title={t.notifications}
          icon={Volume2}
          iconColor={colors.accent}
          iconBgColor={`${colors.accent}20`}
        >
          <motion.div 
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-neutral-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-neutral-500" />
              )}
              <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">{t.sound}</span>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={() => dispatch(toggleSound())}
            />
          </motion.div>
        </SettingsSection>

        {/* Language */}
        <SettingsSection
          title={t.language}
          icon={Globe}
          iconColor={colors.primary}
          iconBgColor={`${colors.primary}20`}
          description={t.languageDesc}
        >
          <LanguageSelector
            currentLanguage={settings.language}
            options={languageOptions}
            primaryColor={colors.primary}
            onLanguageChange={(lang) => dispatch(setLanguage(lang))}
          />
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection
          title={t.data}
          icon={Trash2}
          iconColor="#ef4444"
          iconBgColor="rgba(239, 68, 68, 0.1)"
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button variant="destructive" className="w-full rounded-2xl text-sm md:text-base">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.resetStats}
                </Button>
              </motion.div>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl max-w-[90vw] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base md:text-lg">{t.resetConfirm}</AlertDialogTitle>
                <AlertDialogDescription className="text-sm md:text-base">
                  {t.resetDesc}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="rounded-2xl w-full sm:w-auto">{t.cancel}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => dispatch(resetStats())}
                  className="rounded-2xl bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                >
                  {t.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingsSection>
      </motion.div>
    </div>
  );
}
