import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  tick,
  setPhase,
  updateTotalTime,
  completeSession,
  type TimerPhase,
} from '../store/timerSlice';
import { addSession } from '../store/statsSlice';
import { colorThemes } from '../store/themeSlice';
import { TooltipProvider } from '../components/tooltip';
import { Confetti } from '../components/Confetti';
import { PhaseSelector } from '../components/home/PhaseSelector';
import { SessionStats } from '../components/home/SessionStats';
import { TimerCircle } from '../components/home/TimerCircle';
import { TimerControls } from '../components/home/TimerControls';
import { SessionCounter } from '../components/home/SessionCounter';
import { toast } from 'sonner';

const translations = {
  en: {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    session: 'Session',
    completedToday: 'Completed Today',
    streak: 'Day Streak',
    sessionComplete: 'Session Complete!',
    takeBreak: 'Time for a break!',
    backToWork: 'Back to work!',
    greatJob: 'Great job! 🎉',
  },
  ru: {
    focus: 'Фокус',
    shortBreak: 'Короткий перерыв',
    longBreak: 'Длинный перерыв',
    start: 'Старт',
    pause: 'Пауза',
    reset: 'Сброс',
    session: 'Сессия',
    completedToday: 'Завершено сегодня',
    streak: 'Дней подряд',
    sessionComplete: 'Сессия завершена!',
    takeBreak: 'Время отдохнуть!',
    backToWork: 'Возвращаемся к работе!',
    greatJob: 'Отличная работа! 🎉',
  },
  kk: {
    focus: 'Фокус',
    shortBreak: 'Қысқа үзіліс',
    longBreak: 'Ұзақ үзіліс',
    start: 'Бастау',
    pause: 'Кідірту',
    reset: 'Қалпына келтіру',
    session: 'Сессия',
    completedToday: 'Бүгін аяқталды',
    streak: 'Күн қатарынан',
    sessionComplete: 'Сессия аяқталды!',
    takeBreak: 'Демалу уақыты!',
    backToWork: 'Жұмысқа оралу!',
    greatJob: 'Тамаша жұмыс! 🎉',
  },
};

export function Timer() {
  const dispatch = useAppDispatch();
  const { phase, timeLeft, isRunning, totalTime, sessionsCompleted } = useAppSelector(state => state.timer);
  const settings = useAppSelector(state => state.settings);
  const { effectiveTheme, colorTheme } = useAppSelector(state => state.theme);
  const { sessions } = useAppSelector(state => state.stats);
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const t = translations[settings.language];
  const colors = colorThemes[colorTheme][effectiveTheme];

  // Calculate streak
  useEffect(() => {
    const today = new Date();
    let currentStreak = 0;
    
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
    
    setStreak(currentStreak);
  }, [sessions]);

  // Get today's completed sessions
  const todaySessions = sessions.find(
    s => s.date === new Date().toISOString().split('T')[0]
  )?.focusSessions || 0;

  useEffect(() => {
    const durations = {
      focus: settings.focusDuration * 60,
      shortBreak: settings.shortBreakDuration * 60,
      longBreak: settings.longBreakDuration * 60,
    };

    if (totalTime !== durations[phase]) {
      dispatch(updateTotalTime(durations[phase]));
    }
  }, [phase, settings.focusDuration, settings.shortBreakDuration, settings.longBreakDuration, dispatch, totalTime]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      dispatch(pauseTimer());
      
      if (phase === 'focus') {
        dispatch(addSession({ duration: settings.focusDuration }));
        dispatch(completeSession());
        setShowConfetti(true);
        toast.success(t.sessionComplete, {
          description: t.greatJob,
        });
      } else {
        toast.info(phase === 'shortBreak' ? t.backToWork : t.backToWork, {
          description: phase === 'shortBreak' ? '💪' : '🚀',
        });
      }
      
      if (settings.soundEnabled) {
        playNotificationSound();
      }
    }
  }, [timeLeft, isRunning, phase, settings.soundEnabled, settings.focusDuration, dispatch, t]);

  const playNotificationSound = () => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handlePhaseChange = (newPhase: TimerPhase) => {
    dispatch(setPhase(newPhase));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const phaseColors = {
    focus: colors.primary,
    shortBreak: colors.secondary,
    longBreak: colors.accent,
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] px-4 py-6 md:py-8">
        <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <SessionStats
            todaySessions={todaySessions}
            streak={streak}
            primaryColor={colors.primary}
            translations={{
              completedToday: t.completedToday,
              streak: t.streak,
            }}
          />

          <PhaseSelector
            currentPhase={phase}
            onPhaseChange={handlePhaseChange}
            phaseColors={phaseColors}
            translations={{
              focus: t.focus,
              shortBreak: t.shortBreak,
              longBreak: t.longBreak,
            }}
          />

          <TimerCircle
            minutes={minutes}
            seconds={seconds}
            progress={progress}
            isRunning={isRunning}
            phaseColor={phaseColors[phase]}
          />

          <TimerControls
            isRunning={isRunning}
            phaseColor={phaseColors[phase]}
            onStart={() => dispatch(startTimer())}
            onPause={() => dispatch(pauseTimer())}
            onReset={() => dispatch(resetTimer())}
            translations={{
              start: t.start,
              pause: t.pause,
              reset: t.reset,
            }}
          />

          <SessionCounter
            sessionNumber={sessionsCompleted + 1}
            label={t.session}
          />
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
