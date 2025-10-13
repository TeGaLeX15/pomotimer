import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { tick } from "../features/timer/TimerSlice";

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  useEffect(() => {
    if (!timer.running) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.running, dispatch]);

  // Сохраняем в localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem("timerState", JSON.stringify(timer));
  }, [timer]);
};
