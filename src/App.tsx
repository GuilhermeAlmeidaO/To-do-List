import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Home/>} path="*"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
