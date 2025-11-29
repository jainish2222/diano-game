"use client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/theme/ThemeProvider";

// Icons
import HurdleIcon from "../assets/hr.png";
import GymnasticsIcon from "../assets/jr.png";
import SurfingIcon from "../assets/sr.png";
import SwimmingIcon from "../assets/spr.png";
import EquestrianIcon from "../assets/er.png";
import DinoIcon from "../assets/dr.png";
import LeftArrowIcon from "../assets/lr.png";

export default function Selectgamepage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Active selected index
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Resolve system theme
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // Game modes
  const modes = [
    { name: "Hurdling", icon: HurdleIcon },
    { name: "Gymnastics", icon: GymnasticsIcon },
    { name: "Surfing", icon: SurfingIcon },
    { name: "Swimming", icon: SwimmingIcon },
    { name: "Equestrian", icon: EquestrianIcon },
    { name: "Dinosaur", icon: DinoIcon },
  ];

  // Solid background colors
  const colorList = [
    "bg-lime-500",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
  ];

  return (
    <>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className={`
          absolute top-4 left-4 z-50 flex items-center gap-2
          px-4 py-2 rounded-lg 
          backdrop-blur-md border transition-all active:scale-95

          ${
            resolvedTheme === "light"
              ? "bg-black/10 border-black/20 text-black hover:bg-black/20"
              : "bg-white/10 border-white/20 text-white hover:bg-white/20"
          }
        `}
      >
        <img
          src={LeftArrowIcon}
          alt="Back"
          className={`w-4 h-4 ${resolvedTheme === "light" ? "invert" : ""}`}
        />
        Back
      </button>

      {/* MAIN CONTENT */}
      <div
        className={`
          min-h-screen flex items-center justify-center
          transition-colors duration-300
          ${resolvedTheme === "light" ? "bg-white text-black" : "bg-black text-white"}
        `}
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md p-6">
          {modes.map((item, index) => {
            const hoverColor = `hover:${colorList[index]}`;
            const activeColor = selectedIndex === index ? colorList[index] : "";

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  navigate(`/selected-game/${item.name.toLowerCase()}`);
                }}
                className={`
                  group
                  flex flex-col items-center justify-center gap-2  
                  py-5 rounded-xl border backdrop-blur-lg shadow
                  transition-all hover:scale-[1.05] active:scale-[0.97]

                  ${
                    resolvedTheme === "light"
                      ? "bg-black/10 border-black/20 text-black"
                      : "bg-white/10 border-white/20 text-white"
                  }

                  ${hoverColor}
                  ${activeColor}
                  hover:text-white
                `}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`
                    w-8 h-8 object-contain transition-all
                    ${resolvedTheme === "light" ? "invert" : ""}
                    group-hover:invert-0
                  `}
                />
                <span className="text-sm font-semibold tracking-wide">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
