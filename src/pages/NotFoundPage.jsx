import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import dragonFire from "../data/dragon-fire.json"; // keep your path
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#0f0f0f", color: "white" }}
    >
      <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-5">
        <Lottie
          animationData={dragonFire}
          loop
          autoplay
          className="w-16 h-16 sm:w-24 sm:h-24"
        />
      </div>

      <h1 className="text-3xl font-bold mt-6">Page Not Found</h1>

      <p className="text-gray-300 mt-2 max-w-md">
        Oops! The page you're trying to access doesn't exist or may have been moved.  
        You might have typed the wrong link or visited an outdated URL.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
      >
        Go Back Home
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Error code: 404 — Route not found
      </p>
    </div>
  );
};

export default NotFoundPage;
