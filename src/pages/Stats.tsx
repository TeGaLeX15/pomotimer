import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Calendar, Award, Zap } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { colorThemes } from '../store/themeSlice';
import { Card } from '../components/card';
import { Badge } from '../components/badge';
import { StatsCard } from '../components/stats/StatsCard';
import { AchievementCard } from '../components//stats/AchievementCard';
import { StatsChart } from '../components//stats/StatsChart';
import { EmptyState } from '../components//stats/EmptyState';
import { PeriodSelector } from '../components//stats/PeriodSelector';

const translations = {
  en: {
    statistics: 'Statistics',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    totalSessions: 'Total Sessions',
    avgFocusTime: 'Avg Focus Time',
    productivity: 'Productivity',
    minutes: 'min',
    sessions: 'sessions',
    noDataYet: 'No data yet',
    startFirstSession: 'Start your first focus session to see statistics',
    focusSessions: 'Focus Sessions',
    thisWeek: 'This Week',
    achievements: 'Achievements',
    streak: 'Current Streak',
    days: 'days',
    longestStreak: 'Longest Streak',
    totalTime: 'Total Time',
    hours: 'hours',
  },
  ru: {
    statistics: 'Статистика',
    week: 'Неделя',
    month: 'Месяц',
    year: 'Год',
    totalSessions: 'Всего сессий',
    avgFocusTime: 'Среднее время фокуса',
    productivity: 'Продуктивность',
    minutes: 'мин',
    sessions: 'сессий',
    noDataYet: 'Пока нет данных',
    startFirstSession: 'Начните первую сессию фокуса, чтобы увидеть статистику',
    focusSessions: 'Сессии фокуса',
    thisWeek: 'На этой неделе',
    achievements: 'Достижения',
    streak: 'Текущая серия',
    days: 'дней',
    longestStreak: 'Лучшая серия',
    totalTime: 'Всего времени',
    hours: 'часов',
  },
  kk: {
    statistics: 'Статистика',
    week: 'Апта',
    month: 'Ай',
    year: 'Жыл',
    totalSessions: 'Барлық сессиялар',
    avgFocusTime: 'Орташа фокус уақыты',
    productivity: 'Өнімділік',
    minutes: 'мин',
    sessions: 'сессиялар',
    noDataYet: 'Әзірге деректер жоқ',
    startFirstSession: 'Статистиканы көру үшін бірінші фокус сессиясын бастаңыз',
    focusSessions: 'Фокус сессиялары',
    thisWeek: 'Осы аптада',
    achievements: 'Жетістіктер',
    streak: 'Ағымдағы қатар',
    days: 'күн',
    longestStreak: 'Ең үлкен қатар',
    totalTime: 'Барлық уақыт',
    hours: 'сағат',
  },
};

export function Stats() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const { sessions, totalFocusSessions, totalMinutes } = useAppSelector(state => state.stats);
  const { language } = useAppSelector(state => state.settings);
  const { effectiveTheme, colorTheme } = useAppSelector(state => state.theme);
  
  const t = translations[language];
  const colors = colorThemes[colorTheme][effectiveTheme];

  const chartData = useMemo(() => {
    const now = new Date();
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const session = sessions.find(s => s.date === dateStr);

      data.push({
        date: dateStr,
        day: date.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' }),
        sessions: session?.focusSessions || 0,
        minutes: session?.totalMinutes || 0,
      });
    }

    return data;
  }, [sessions, period, language]);

  const avgFocusTime = totalFocusSessions > 0 ? Math.round(totalMinutes / totalFocusSessions) : 0;
  const productivity = totalFocusSessions > 0 ? Math.min(100, Math.round((totalFocusSessions / 10) * 100)) : 0;

  // Calculate streaks
  const streaks = useMemo(() => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();

    // Calculate current streak
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasSession = sessions.some(s => s.date === dateStr && s.focusSessions > 0);
      
      if (hasSession) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    // Calculate longest streak
    const sortedSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
    for (const session of sortedSessions) {
      if (session.focusSessions > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }, [sessions]);

  const hasData = totalFocusSessions > 0;

  return (
    <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-neutral-900 dark:text-white">{t.statistics}</h1>
          {hasData && (
            <Badge 
              variant="secondary" 
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {t.thisWeek}
            </Badge>
          )}
        </div>

        {!hasData ? (
          <EmptyState
            title={t.noDataYet}
            description={t.startFirstSession}
            iconColor={colors.primary}
            iconBgColor={`${colors.primary}20`}
          />
        ) : (
          <>
            <PeriodSelector
              value={period}
              onChange={setPeriod}
              translations={{
                week: t.week,
                month: t.month,
                year: t.year,
              }}
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <StatsCard
                title={t.totalSessions}
                value={totalFocusSessions}
                icon={Target}
                iconColor={colors.primary}
                iconBgColor={`${colors.primary}20`}
                blurColor={colors.primary}
              />

              <StatsCard
                title={t.avgFocusTime}
                value={avgFocusTime}
                subtitle={t.minutes}
                icon={Clock}
                iconColor={colors.secondary}
                iconBgColor={`${colors.secondary}20`}
                blurColor={colors.secondary}
              />

              <StatsCard
                title={t.productivity}
                value={`${productivity}%`}
                icon={TrendingUp}
                iconColor={colors.accent}
                iconBgColor={`${colors.accent}20`}
                blurColor={colors.accent}
              />
            </div>

            {/* Achievements */}
            <Card className="p-4 md:p-6 rounded-3xl border-neutral-200 dark:border-neutral-700 mb-6 md:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className="text-neutral-900 dark:text-white">{t.achievements}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AchievementCard
                  icon={Calendar}
                  iconColor="#f97316"
                  label={t.streak}
                  value={streaks.current}
                  unit={t.days}
                  gradient="from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
                  border="border-orange-200 dark:border-orange-800"
                />

                <AchievementCard
                  icon={Zap}
                  iconColor="#a855f7"
                  label={t.longestStreak}
                  value={streaks.longest}
                  unit={t.days}
                  gradient="from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30"
                  border="border-purple-200 dark:border-purple-800"
                />

                <AchievementCard
                  icon={Clock}
                  iconColor="#3b82f6"
                  label={t.totalTime}
                  value={Math.round(totalMinutes / 60)}
                  unit={t.hours}
                  gradient="from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
                  border="border-blue-200 dark:border-blue-800"
                />
              </div>
            </Card>

            {/* Chart */}
            <Card className="p-4 md:p-6 rounded-3xl border-neutral-200 dark:border-neutral-700">
              <h3 className="mb-4 md:mb-6 text-neutral-900 dark:text-white">{t.focusSessions}</h3>
              <StatsChart
                data={chartData}
                color={colors.primary}
                isDark={effectiveTheme === 'dark'}
              />
            </Card>
          </>
        )}
      </motion.div>
    </div>
  );
}
