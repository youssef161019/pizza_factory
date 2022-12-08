import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
// import reportWebVitals from './reportWebVitals';
import { ToppingsProvider } from "./context/ToppingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ToppingsProvider>
    <App />
  </ToppingsProvider>

  // </React.StrictMode>
);
