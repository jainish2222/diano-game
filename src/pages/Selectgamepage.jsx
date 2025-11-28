import React from "react";
import { useNavigate } from "react-router-dom";
// Import your PNG icons
import HurdleIcon from "../assets/hr.png";
import GymnasticsIcon from "../assets/jr.png";
import SurfingIcon from "../assets/sr.png";
import SwimmingIcon from "../assets/spr.png";
import EquestrianIcon from "../assets/er.png";
import DinoIcon from "../assets/dr.png";

const Selectgamepage = () => {
  const navigate = useNavigate();
  const modes = [
    { name: "Hurdling", icon: HurdleIcon },
    { name: "Gymnastics", icon: GymnasticsIcon },
    { name: "Surfing", icon: SurfingIcon },
    { name: "Swimming", icon: SwimmingIcon },
    { name: "Equestrian", icon: EquestrianIcon },
    { name: "Dinosaur", icon: DinoIcon },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black text-white"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md p-6">
        {modes.map((item, index) => (
          <button
            key={index}
            className="
              flex flex-col items-center justify-center gap-2  
              py-5 rounded-xl bg-white/10 border border-white/20  
              hover:bg-white/20 transition-all hover:scale-[1.05] 
              active:scale-[0.97] backdrop-blur-lg shadow
            "
            onClick={() =>
              navigate(`/selected-game/${item.name.toLowerCase()}`)
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-semibold tracking-wide">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Selectgamepage;
