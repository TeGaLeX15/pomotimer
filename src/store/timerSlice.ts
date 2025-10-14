import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TimerPhase = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
  phase: TimerPhase;
  timeLeft: number;
  isRunning: boolean;
  totalTime: number;
  sessionsCompleted: number;
}

const initialState: TimerState = {
  phase: 'focus',
  timeLeft: 25 * 60,
  isRunning: false,
  totalTime: 25 * 60,
  sessionsCompleted: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.totalTime;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    setPhase: (state, action: PayloadAction<TimerPhase>) => {
      state.phase = action.payload;
      state.isRunning = false;
    },
    updateTotalTime: (state, action: PayloadAction<number>) => {
      state.totalTime = action.payload;
      state.timeLeft = action.payload;
    },
    completeSession: (state) => {
      state.sessionsCompleted += 1;
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  tick,
  setPhase,
  updateTotalTime,
  completeSession,
} = timerSlice.actions;

export default timerSlice.reducer;
