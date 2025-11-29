"use client";
import { useEffect, useRef, useState, useContext } from "react";
import ThemePopup from "../components/theme/ThemePopup";
import { ThemeContext } from "../components/theme/ThemeProvider";
import { useNavigate } from "react-router-dom";

export default function SpaceHome() {
  const canvasRef = useRef(null);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  // resolve system theme
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // Falling Stars Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const setSize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 2 + Math.random() * 3,
      length: 10 + Math.random() * 20,
      opacity: Math.random(),
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // ⭐ FIX: Star color depends on theme
      ctx.fillStyle = resolvedTheme === "light" ? "#000" : "#fff";

      stars.forEach((s) => {
        ctx.globalAlpha = s.opacity;
        ctx.fillRect(s.x, s.y, 1.4, s.length);

        s.y += s.speed;
        if (s.y > h) {
          s.y = -20;
          s.x = Math.random() * w;
        }
      });

      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", setSize);
  }, [resolvedTheme]); // ⭐ Update stars when theme changes

  return (
    <div
      className={`
        w-screen h-screen overflow-hidden relative
        transition-all duration-300
        ${
          resolvedTheme === "light"
            ? "bg-white text-black"
            : "bg-black text-white"
        }
      `}
    >
      {/* Falling Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Center Menu */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <div
          className={`
            w-80 md:w-96 m-10 p-8 rounded-2xl backdrop-blur-xl border shadow-xl
            transition-all duration-300
            ${
              resolvedTheme === "light"
                ? "bg-black/5 border-black/20 text-black"
                : "bg-white/5 border-white/20 text-white"
            }
          `}
        >
          <h1 className="text-3xl font-extrabold tracking-wider text-center mb-1">
            Dino Space
          </h1>

          <p className="text-center text-xs opacity-70 mb-6">
            Explore the Dino World
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            {["Start Game", "Theme", "About Game"].map((name, i) => {
              // ✅ Define hover colors here (inside map, OUTSIDE JSX)
              const hoverColors = {
                0:
                  resolvedTheme === "light"
                    ? "hover:bg-red-500/20 active:bg-red-500/40"
                    : "hover:bg-red-900/60 active:bg-red-900",

                1:
                  resolvedTheme === "light"
                    ? "hover:bg-violet-500/20 active:bg-violet-500/40"
                    : "hover:bg-violet-900/60 active:bg-violet-900",

                2:
                  resolvedTheme === "light"
                    ? "hover:bg-lime-500/20 active:bg-lime-500/40"
                    : "hover:bg-lime-900/60 active:bg-lime-900",
              }[i];

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (name === "Start Game") navigate("/select-game");
                    if (name === "Theme") setShowThemePopup(true);
                    if (name === "About Game") navigate("/about");
                      
                  }}
                  className={`
          w-full px-4 py-3 rounded-lg font-semibold tracking-wide
          transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]
          ${
            resolvedTheme === "light"
              ? "bg-black/10 text-black"
              : "bg-white/10 text-white"
          }
          ${hoverColors}
        `}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <p className="text-center text-[10px] mt-6 opacity-60 tracking-wider">
            v1.0.0 · © 2025 Dino Space
          </p>
        </div>
      </div>

      {/* THEME POPUP */}
      {showThemePopup && (
        <ThemePopup
          onClose={() => setShowThemePopup(false)}
          setTheme={setTheme}
          currentTheme={theme}
        />
      )}
    </div>
  );
}
