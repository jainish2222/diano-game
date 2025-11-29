"use client";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { ThemeContext } from "../components/theme/ThemeProvider";
import dragonFire from "../data/dragon-fire.json";

const fontStyle = {
  fontFamily: "'Orbitron', sans-serif",
};

export default function DragonPage() {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("dragon");

  // Resolve current theme (system aware)
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const modeConfig = {
    hurdling: { file: "1_hurdling.html" },
    gymnastics: { file: "2_gymnastics.html" },
    surfing: { file: "3_surfing.html" },
    swimming: { file: "4_swimming.html" },
    equestrian: { file: "5_equestrian.html" },
    dragon: { file: null },
  };

  const selected = modeConfig[mode];

  // Loader progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1.5));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // When complete → navigate
  useEffect(() => {
    if (progress === 100 && selected.file) {
      navigate(`/play/${mode}`);
    }
  }, [progress]);

  return (
    <div
      style={fontStyle}
      className={`
        w-screen h-screen flex flex-col items-center justify-center px-4
        transition-colors duration-500 
        ${resolvedTheme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      {/* LOADER */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-5">
        <Lottie
          animationData={dragonFire}
          loop
          autoplay
          className="w-16 h-16 sm:w-24 sm:h-24"
        />
      </div>

    </div>
  );
}
