import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark' | 'system';

export type ColorTheme = 'default' | 'ocean' | 'forest' | 'sunset' | 'lavender' | 'rose';

export interface ColorThemeConfig {
  name: string;
  light: {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
  };
  dark: {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
  };
}

export const colorThemes: Record<ColorTheme, ColorThemeConfig> = {
  default: {
    name: 'Default',
    light: {
      primary: '#646CFF',
      primaryHover: '#535BDB',
      secondary: '#10B981',
      accent: '#3B82F6',
    },
    dark: {
      primary: '#818CF8',
      primaryHover: '#6B7BF5',
      secondary: '#34D399',
      accent: '#60A5FA',
    },
  },
  ocean: {
    name: 'Ocean',
    light: {
      primary: '#0EA5E9',
      primaryHover: '#0284C7',
      secondary: '#06B6D4',
      accent: '#3B82F6',
    },
    dark: {
      primary: '#38BDF8',
      primaryHover: '#0EA5E9',
      secondary: '#22D3EE',
      accent: '#60A5FA',
    },
  },
  forest: {
    name: 'Forest',
    light: {
      primary: '#10B981',
      primaryHover: '#059669',
      secondary: '#14B8A6',
      accent: '#84CC16',
    },
    dark: {
      primary: '#34D399',
      primaryHover: '#10B981',
      secondary: '#2DD4BF',
      accent: '#A3E635',
    },
  },
  sunset: {
    name: 'Sunset',
    light: {
      primary: '#F59E0B',
      primaryHover: '#D97706',
      secondary: '#EF4444',
      accent: '#F97316',
    },
    dark: {
      primary: '#FCD34D',
      primaryHover: '#FBBF24',
      secondary: '#FB923C',
      accent: '#FCA5A5',
    },
  },
  lavender: {
    name: 'Lavender',
    light: {
      primary: '#A855F7',
      primaryHover: '#9333EA',
      secondary: '#C084FC',
      accent: '#E879F9',
    },
    dark: {
      primary: '#C084FC',
      primaryHover: '#A855F7',
      secondary: '#D8B4FE',
      accent: '#F0ABFC',
    },
  },
  rose: {
    name: 'Rose',
    light: {
      primary: '#EC4899',
      primaryHover: '#DB2777',
      secondary: '#F43F5E',
      accent: '#FB7185',
    },
    dark: {
      primary: '#F472B6',
      primaryHover: '#EC4899',
      secondary: '#FDA4AF',
      accent: '#FBBF24',
    },
  },
};

interface ThemeState {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  colorTheme: ColorTheme;
}

const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem('pomo-theme');
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
};

const getInitialColorTheme = (): ColorTheme => {
  const stored = localStorage.getItem('pomo-color-theme');
  if (stored && stored in colorThemes) {
    return stored as ColorTheme;
  }
  return 'default';
};

const getEffectiveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
};

const initialMode = getInitialTheme();

const initialState: ThemeState = {
  mode: initialMode,
  effectiveTheme: getEffectiveTheme(initialMode),
  colorTheme: getInitialColorTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.effectiveTheme = getEffectiveTheme(action.payload);
      localStorage.setItem('pomo-theme', action.payload);
    },
    updateEffectiveTheme: (state) => {
      state.effectiveTheme = getEffectiveTheme(state.mode);
    },
    setColorTheme: (state, action: PayloadAction<ColorTheme>) => {
      state.colorTheme = action.payload;
      localStorage.setItem('pomo-color-theme', action.payload);
    },
  },
});

export const { setTheme, updateEffectiveTheme, setColorTheme } = themeSlice.actions;
export default themeSlice.reducer;
