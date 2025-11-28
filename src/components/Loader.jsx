"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import dragonFire from "../data/dragon-fire.json"; // keep your path

// Orbitron font
const fontStyle = {
  fontFamily: "'Orbitron', sans-serif",
};

export default function DragonPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("dragon");

  const navigate = useNavigate();

  // MODE CONFIG + colors + captions + html mapping
  const modeConfig = {
    hurdling: {
      title: "Inferno Sprint",
      caption: "Charging sprint flames...",
      tailwind: "bg-blue-500",
      file: "1_hurdling.html",
    },
    gymnastics: {
      title: "Ember Acrobatics",
      caption: "Warming up acrobatic fire...",
      tailwind: "bg-green-500",
      file: "2_gymnastics.html",
    },
    surfing: {
      title: "Ocean Blaze",
      caption: "Summoning ocean winds...",
      tailwind: "bg-lime-500",
      file: "3_surfing.html",
    },
    swimming: {
      title: "Shadow Swimmer",
      caption: "Calibrating underwater senses...",
      tailwind: "bg-orange-500",
      file: "4_swimming.html",
    },
    equestrian: {
      title: "Inferno Gallop",
      caption: "Synchronizing rider speed...",
      tailwind: "bg-cyan-500",
      file: "5_equestrian.html",
    },
    dragon: {
      title: "Dragon Awakening",
      caption: "Summoning dragon flames...",
      tailwind: "bg-gray-500",
      file: null,
    },
  };

  const selected = modeConfig[mode];

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1.5));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Redirect when loaded
  useEffect(() => {
    if (progress === 100 && selected.file) {
      navigate(`/play/${mode}`);
    }
  }, [progress, mode]);

  return (
    <div
      style={fontStyle}
      className={`w-screen h-screen flex flex-col items-center justify-center px-4 transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center mb-5">
        <Lottie
          animationData={dragonFire}
          loop
          autoplay
          className="w-52 h-52 sm:w-64 sm:h-64"
        />
      </div>     
    </div>
  );
}
