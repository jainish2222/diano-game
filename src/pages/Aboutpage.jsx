"use client";
import React, { useContext } from "react";
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

export default function Aboutpage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // GAME DETAILS
  const gameDetails = [
    {
      name: "Hurdling",
      icon: HurdleIcon,
      desc: "A fast-paced sprinting challenge where you dodge obstacles with precision.",
      color: "bg-lime-500",
    },
    {
      name: "Gymnastics",
      icon: GymnasticsIcon,
      desc: "High-flying acrobatics requiring balance, timing, and perfect landing.",
      color: "bg-yellow-400",
    },
    {
      name: "Surfing",
      icon: SurfingIcon,
      desc: "Ride powerful waves and maintain balance while avoiding ocean hazards.",
      color: "bg-blue-500",
    },
    {
      name: "Swimming",
      icon: SwimmingIcon,
      desc: "A deep-water adventure where speed and reflexes decide your victory.",
      color: "bg-red-500",
    },
    {
      name: "Equestrian",
      icon: EquestrianIcon,
      desc: "Gallop with power and leap over obstacles with perfect timing.",
      color: "bg-pink-500",
    },
    {
      name: "Dinosaur",
      icon: DinoIcon,
      desc: "Classic endless running adventure featuring the legendary chrome dinosaur.",
      color: "bg-purple-500",
    },
  ];

  return (
    <div
      className={`
        min-h-screen w-full p-6
        ${resolvedTheme === "dark" ? "bg-black text-white" : "bg-white text-black"}
        transition-colors duration-300
      `}
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border mb-6
          backdrop-blur-md transition-all active:scale-95
          ${
            resolvedTheme === "light"
              ? "bg-black/10 border-black/20 text-black hover:bg-black/20"
              : "bg-white/10 border-white/20 text-white hover:bg-white/20"
          }
        `}
      >
        <img
          src={LeftArrowIcon}
          className={`w-4 h-4 ${resolvedTheme === "light" ? "invert" : ""}`}
          alt="Back"
        />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-2 tracking-widest">About Games</h1>
      <p className="opacity-70 mb-6">Learn more about each game mode.</p>

      {/* Game List */}
      <div className="grid sm:grid-cols-2 gap-6">
        {gameDetails.map((item, index) => (
          <div
            key={index}
            className={`
              p-5 rounded-xl border backdrop-blur-lg shadow transition-all
              ${
                resolvedTheme === "light"
                  ? "bg-black/5 border-black/20"
                  : "bg-white/5 border-white/20"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${item.color} 
                `}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-7 h-7 object-contain invert-0"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
