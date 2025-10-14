import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SessionRecord {
  date: string;
  focusSessions: number;
  totalMinutes: number;
}

interface StatsState {
  sessions: SessionRecord[];
  totalFocusSessions: number;
  totalMinutes: number;
}

const getInitialStats = (): StatsState => {
  const stored = localStorage.getItem('pomo-stats');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }
  return {
    sessions: [],
    totalFocusSessions: 0,
    totalMinutes: 0,
  };
};

const initialState: StatsState = getInitialStats();

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<{ duration: number }>) => {
      const today = new Date().toISOString().split('T')[0];
      const existingSession = state.sessions.find(s => s.date === today);
      
      if (existingSession) {
        existingSession.focusSessions += 1;
        existingSession.totalMinutes += action.payload.duration;
      } else {
        state.sessions.push({
          date: today,
          focusSessions: 1,
          totalMinutes: action.payload.duration,
        });
      }
      
      state.totalFocusSessions += 1;
      state.totalMinutes += action.payload.duration;
      
      localStorage.setItem('pomo-stats', JSON.stringify(state));
    },
    resetStats: (state) => {
      state.sessions = [];
      state.totalFocusSessions = 0;
      state.totalMinutes = 0;
      localStorage.setItem('pomo-stats', JSON.stringify(state));
    },
  },
});

export const { addSession, resetStats } = statsSlice.actions;
export default statsSlice.reducer;
