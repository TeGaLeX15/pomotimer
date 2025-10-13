import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  remaining: number;
  running: boolean;
  phase: "work" | "break";
}

// Получаем из localStorage, если есть
const saved = localStorage.getItem("timerState");
const initialState: TimerState = saved
  ? JSON.parse(saved)
  : {
      remaining: 25 * 60,
      running: false,
      phase: "work",
    };

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    start: (state) => { state.running = true; },
    pause: (state) => { state.running = false; },
    reset: (state) => {
      state.running = false;
      state.phase = "work";
      state.remaining = 25 * 60;
    },
    tick: (state) => {
      if (state.running && state.remaining > 0) {
        state.remaining -= 1;
      } else if (state.running && state.remaining === 0) {
        state.phase = state.phase === "work" ? "break" : "work";
        state.remaining = state.phase === "work" ? 25 * 60 : 5 * 60;
      }
    },
    setPhase: (state, action: PayloadAction<"work" | "break">) => {
      state.phase = action.payload;
      state.remaining = action.payload === "work" ? 25 * 60 : 5 * 60;
    },
  },
});

export const { start, pause, reset, tick, setPhase } = timerSlice.actions;
export default timerSlice.reducer;
