import React, { useEffect } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

function Register() {
  const navigate = useNavigate();
  const currentUserToken = localStorage.getItem("userToken");

  //   useEffect hook to check if the user is logged in and redirect to the home page
  useEffect(() => {
    if (currentUserToken !== null) {
      navigate("/");
    }
  });

  return (
    <div className="backgroundContainer columnAlignment loginFormContainer alignCenter">
      <header className="columnAlignment">
        <nav className="rowColumnAlignment">
          <div className="rowColumnAlignment">
            <h1 className="rowAlignment">
              <TravelExploreIcon />
              TrekTracker
            </h1>
          </div>
        </nav>
      </header>

      <div className="columnAlignment formContentContainer alignCenter">
        {/* Render the Form component for registeration */}
        <Form isRegistered={false} />{" "}
        {/* Pass a prop to indicate that it's a registeration form */}
      </div>
      <Footer />
    </div>
  );
}

export default Register;
