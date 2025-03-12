import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./app/landing/pages/Landing";
import Gameboard from "./app/gameboard/pages/Gameboard";
import { Background } from "./shared/components/containers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Background />}>
          <Route index path="/" element={<Landing />} />
          <Route path="/game" element={<Gameboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
