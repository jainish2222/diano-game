import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpaceHome from "./pages/HomePage";
import Selectgamepage from "./pages/Selectgamepage";
import Gamepage from "./pages/Gamepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpaceHome />} />
        <Route path="/select-game" element={<Selectgamepage />} />
        <Route path="/selected-game/:themeParam" element={<Gamepage />} />
      </Routes>
    </BrowserRouter>
  );
}
