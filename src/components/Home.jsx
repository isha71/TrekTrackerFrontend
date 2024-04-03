import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FlightIcon from "@mui/icons-material/Flight";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const currentUserToken = localStorage.getItem("userToken");

  // useEffect hook to check if user is logged in and redirect to TrekTracker page
  useEffect(() => {
    if (currentUserToken != null) {
      navigate("/trekTracker"); // Redirect to TrekTracker page if user is logged in
    }
  });

  return (
    <section className="backgroundContainer columnAlignment alignCenter">
      <header className="columnAlignment">
        <nav className="rowColumnAlignment">
          <div className="rowColumnAlignment">
            <h1 className="rowAlignment">
              <TravelExploreIcon />
              TrekTracker
            </h1>
          </div>
          <span className="fill"></span>
          <div
            className="menu rowAlignment"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span>
              <MenuIcon />
            </span>
          </div>
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <Link to="/login">
                <button className="accentButton darkAccentButton">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="accentButton darkAccentButton">
                  Register
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="columnAlignment alignCenter cardContainer">
        <div className="columnAlignment animated-text tagline alignCenter">
          <span className="word alignCenter">
            Track your travels <FlightIcon />
            <br /> color your world
          </span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
