import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./components/AppRouter.jsx";

// Creating a root element for ReactDOM rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
// Rendering the main component wrapped in React Strict Mode
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
