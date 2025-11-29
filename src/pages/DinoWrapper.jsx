// src/pages/DinoWrapper.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LeftArrowIcon from "../assets/lr.png";
import Gamepage from "./Gamepage";

export default function DinoWrapper() {
  const { themeParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button */}
      <div
        onClick={() => navigate(-1)}
        className="
          absolute top-4 left-4 z-50 flex items-center gap-2
          px-2 py-1 rounded-lg
          bg-white/10 border border-white/20
          text-white text-sm font-semibold
          hover:bg-white/20 active:scale-95
          backdrop-blur-md transition-all cursor-pointer
        "
      >
        <img src={LeftArrowIcon} alt="Back" className="w-4 h-4" />
        Change Mode
      </div>

      {/* Game Page */}
      <Gamepage key={themeParam + location.key} />
    </>
  );
}
