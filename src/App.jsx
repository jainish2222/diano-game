import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Selectgamepage from "./pages/Selectgamepage";
import Gamepage from "./pages/Gamepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-game" element={<Selectgamepage />} />
        <Route path="/selected-game/:id" element={<Gamepage />} />
      </Routes>
    </BrowserRouter>
  );
}
