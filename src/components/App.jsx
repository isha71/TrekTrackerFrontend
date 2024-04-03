import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing components
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import TrekTracker from "./TrekTracker";

function App() {
  return (
    // Main container div for the entire application
    <div style={{ height: "100%", width: "100%" }}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/trekTracker" index element={<TrekTracker />} />
      </Routes>
    </div>
  );
}

export default App;
