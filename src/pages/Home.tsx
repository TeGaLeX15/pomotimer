import TimerDisplay from "../components/TimerDisplay";
import { useTimer } from "../hooks/useTimer";

export default function Home() {
  useTimer();

  return (
    <div className="container mx-auto p-8">
      <TimerDisplay />
    </div>
  );
}
