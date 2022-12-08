import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../Pages/Home/Home";
import Toppings from "../../Pages/Toppings/Toppings";
import Pizzas from "../../Pages/Pizzas/Pizzas";
import Error from "../../Pages/Error/Error";
import "./App.scss"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/toppings" element={<Toppings />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
