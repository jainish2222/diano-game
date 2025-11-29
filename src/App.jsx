import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpaceHome from "./pages/Homepage";
import Selectgamepage from "./pages/Selectgamepage";
import DinoWrapper from "./pages/DinoWrapper";
import Aboutpage from "./pages/Aboutpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpaceHome />} />
        <Route path="/select-game" element={<Selectgamepage />} />
        <Route path="/selected-game/:themeParam" element={<DinoWrapper />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </BrowserRouter>
  );
}
