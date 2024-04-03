import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Form from "./Form";

function Login() {
  const navigate = useNavigate();
  const currentUserToken = localStorage.getItem("userToken");

  //   useEffect hook to check if user is logged in and redirect to TrekTracker page
  useEffect(() => {
    if (currentUserToken !== null) {
      navigate("/trekTracker");
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
        {/* Render the Form component for login */}
        <Form isRegistered={true} />{" "}
        {/* Pass a prop to indicate that it's a login form */}
      </div>
      <Footer />
    </div>
  );
}

export default Login;
