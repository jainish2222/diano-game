"use client";
import React from "react";

export default function ThemePopup({ onClose, setTheme, currentTheme }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-72 p-6 rounded-2xl bg-white/10 border border-white/20 text-white">

        <h2 className="text-lg font-bold text-center mb-4 tracking-wide">
          Select Theme
        </h2>

        <div className="space-y-3">
          {["light", "dark"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setTheme(mode);
                onClose();
              }}
              className={`
                w-full py-2 rounded-lg transition
                ${currentTheme === mode ? "bg-white/30" : "bg-white/10 hover:bg-white/20"}
              `}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-red-600/70 hover:bg-red-600 rounded-lg transition"
        >
          Close
        </button>

      </div>
    </div>
  );
}
