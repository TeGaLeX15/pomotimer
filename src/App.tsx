import TimerDisplay from "./components/TimerDisplay";
import { useTimer } from "./hooks/useTimer";

export default function App() {
  useTimer();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text p-4">
      <TimerDisplay />
    </div>
  );
}
