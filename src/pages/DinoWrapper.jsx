import { useParams, useLocation } from "react-router-dom";
import Gamepage from "./Gamepage";

export default function DinoWrapper() {
  const { themeParam } = useParams();
  const location = useLocation();

  return <Gamepage key={themeParam + location.key} />;
}
