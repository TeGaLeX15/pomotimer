import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TimerPhase = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
  phase: TimerPhase;
  timeLeft: number;
  isRunning: boolean;
  totalTime: number;
  sessionsCompleted: number;
  startTimestamp: number | null;
}

const initialState: TimerState = {
  phase: 'focus',
  timeLeft: 25 * 60,
  isRunning: false,
  totalTime: 25 * 60,
  sessionsCompleted: 0,
  startTimestamp: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
      state.startTimestamp = Date.now();
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.totalTime;
    },
    tick: (state) => {
      if (state.isRunning && state.startTimestamp) {
        const elapsed = Math.floor((Date.now() - state.startTimestamp) / 1000);
        state.timeLeft = Math.max(state.totalTime - elapsed, 0);
        if (state.timeLeft === 0) state.isRunning = false;
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
