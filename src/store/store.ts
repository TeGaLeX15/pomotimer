import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import themeReducer from './themeSlice';
import timerReducer from './timerSlice';
import settingsReducer from './settingsSlice';
import statsReducer from './statsSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  timer: timerReducer,
  settings: settingsReducer,
  stats: statsReducer,
});

const persistConfig = {
  key: 'pomotimer',
  storage,
  whitelist: ['timer', 'theme', 'settings', 'stats'], // сохраняем эти редьюсеры
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // отключаем проверки для redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
