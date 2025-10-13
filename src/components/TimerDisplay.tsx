import { useAppSelector, useAppDispatch } from "../hooks/useReduxHooks";
import { start, pause, reset } from "../features/timer/TimerSlice";

function formatTime(s: number) {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function TimerDisplay() {
  const dispatch = useAppDispatch();
  const { remaining, running, phase } = useAppSelector((s) => s.timer);

  return (
    <section className="bg-card p-8 rounded-2xl shadow-lg max-w-md mx-auto text-center">
      <div className="text-muted uppercase tracking-widest mb-2">
        {phase === "work" ? "Focus" : "Break"}
      </div>
      <div className="text-6xl font-bold mb-6">{formatTime(remaining)}</div>
      <div className="flex justify-center gap-4">
        {!running ? (
          <button
            onClick={() => dispatch(start())}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => dispatch(pause())}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Pause
          </button>
        )}
        <button
          onClick={() => dispatch(reset())}
          className="px-6 py-2 bg-muted text-card rounded-lg hover:bg-muted/80 transition"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
