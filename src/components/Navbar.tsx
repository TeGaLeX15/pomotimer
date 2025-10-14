import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Таймер" },
    { path: "/stats", label: "Статистика" },
    { path: "/settings", label: "Настройки" },
    { path: "/about", label: "О программе"}
  ];

  return (
    <nav className="bg-zinc-900 text-white flex items-center justify-between px-4 py-3 relative">
      <div className="text-lg font-semibold tracking-wide">PomoTimer</div>

      {/* Кнопка меню (мобилка) */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Ссылки */}
      <ul
        className={`absolute md:static top-14 left-0 w-full md:w-auto bg-zinc-800 md:bg-transparent flex flex-col md:flex-row items-center gap-4 p-4 md:p-0 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 md:opacity-100 md:translate-y-0 hidden md:flex"
        }`}
      >
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`${
                pathname === path
                  ? "font-bold text-emerald-400"
                  : "text-gray-200 hover:text-white"
              } transition-colors`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
