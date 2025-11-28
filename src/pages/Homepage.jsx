"use client";
import { useEffect, useRef, useState, useContext } from "react";
import ThemePopup from "../components/ThemePopup"; 
import { ThemeContext } from "../components/ThemeProvider";
import { useNavigate } from "react-router-dom";

export default function SpaceHome() {
  const canvasRef = useRef(null);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

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
      ctx.fillStyle = "#fff";

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
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      {/* Falling Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-[100%] h-[100%]" />

      {/* Center Menu */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <div className="w-80 md:w-96 m-10 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white">

          <h1 className="text-3xl font-extrabold tracking-wider text-center mb-1 drop-shadow">
            Dino Space
          </h1>

          <p className="text-center text-xs opacity-70 mb-6">
            Explore the Dino World
          </p>

          {/* MENU BUTTONS */}
          <div className="space-y-3">
            {["Start Game", "Theme", "About Game"].map((name, i) => (
              <button
                key={i}
                onClick={() => {
                  if (name === "Start Game") navigate('/select-game');
                  if (name === "Theme") setShowThemePopup(true);
                  if (name === "About Game") alert("Dino Space v1.0.0\n© 2025 Dino Space");
                }}
                className={`
                  w-full flex items-center justify-center 
                  px-4 py-3 rounded-lg 
                  transition-all text-sm font-semibold tracking-wide 
                  hover:scale-[1.03] active:scale-[0.97]

                  ${i === 0 ? "bg-white/5 hover:bg-red-900/60 active:bg-red-900" : ""}
                  ${i === 1 ? "bg-white/5 hover:bg-violet-900/60 active:bg-violet-900" : ""}
                  ${i === 2 ? "bg-white/5 hover:bg-lime-900/60 active:bg-lime-900" : ""}
                `}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Footer */}
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
