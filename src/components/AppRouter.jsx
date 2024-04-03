import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function AppRouter() {
  return (
    // Wrapping the main App component with BrowserRouter for routing functionality
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppRouter;
