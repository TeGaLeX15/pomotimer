import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TimerDisplay from "./components/TimerDisplay";
import { useTimer } from "./hooks/useTimer";

export default function App() {
  useTimer();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Навигация */}
      <Navbar />

      {/* Основной контент */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<TimerDisplay />} />
          <Route
            path="/stats"
            element={<div className="text-lg">📊 Статистика (в разработке)</div>}
          />
          <Route
            path="/settings"
            element={<div className="text-lg">⚙️ Настройки (в разработке)</div>}
          />
          <Route
            path="/about"
            element={<div className="text-lg">⚙️ О программе (в разработке)</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
