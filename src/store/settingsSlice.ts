import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'ru' | 'kk';

interface SettingsState {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
  language: Language;
}

const getInitialSettings = (): SettingsState => {
  const stored = localStorage.getItem('pomo-settings');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }
  return {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    soundEnabled: true,
    language: 'en',
  };
};

const initialState: SettingsState = getInitialSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFocusDuration: (state, action: PayloadAction<number>) => {
      state.focusDuration = action.payload;
      localStorage.setItem('pomo-settings', JSON.stringify(state));
    },
    setShortBreakDuration: (state, action: PayloadAction<number>) => {
      state.shortBreakDuration = action.payload;
      localStorage.setItem('pomo-settings', JSON.stringify(state));
    },
    setLongBreakDuration: (state, action: PayloadAction<number>) => {
      state.longBreakDuration = action.payload;
      localStorage.setItem('pomo-settings', JSON.stringify(state));
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem('pomo-settings', JSON.stringify(state));
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem('pomo-settings', JSON.stringify(state));
    },
  },
});

export const {
  setFocusDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  toggleSound,
  setLanguage,
} = settingsSlice.actions;

export default settingsSlice.reducer;
