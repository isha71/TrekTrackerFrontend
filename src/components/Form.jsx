import React, { useState } from "react";
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { SERVER_ADDRESS } from "../config"; // Importing the server address from config

function Form(props) {
  // Initializing useNavigate hook for navigation
  const navigate = useNavigate();
  // State to hold user data
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // State to manage current form state
  const [currentstate, setCurrentState] = useState("register");

  // Function to handle form input changes
  function handleFormChange(e) {
    const { name, value } = e.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  // Function to handle form submission
  function handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    if (currentstate === "register") {
      if (userData.password !== userData.confirmPassword) {
        alert("Password not matching"); // Alert user if passwords don't match
        setUserData((prevValue) => {
          return {
            // Clear password fields
            ...prevValue,
            password: "",
            confirmPassword: "",
          };
        });
      } else {
        // If passwords match, proceed with registration
        axios // Make POST request to register endpoint
          .post(`${SERVER_ADDRESS}/register`, userData)
          .then((response) => {
            // Handle successful registration response
            navigate("/login"); // Redirect user to login page after registration
          })
          .catch((error) => {
            // Handle registration errors
            // Clear username field if user already exists
            alert("username already exists! Please try another username");
            setUserData((prevValue) => {
              return {
                ...prevValue,
                username: "",
              };
            });
          });
      }
    } else if (currentstate === "login") {
      axios // Make POST request to login endpoint
        .post(`${SERVER_ADDRESS}/login`, {
          username: userData.username,
          password: userData.password,
        })
        .then((response) => {
          // Handle successful login response
          localStorage.setItem("userToken", response.data.token); // Store user token in local storage
          navigate("/trekTracker"); // Redirect user to TrekTracker after login
        })
        .catch((err) => {
          // Handle login errors
          if (err.response.status === 404) {
            // If user doesn't exist, alert user to register
            alert("User not found");
            setUserData((prevValue) => {
              // Clear username and password fields
              return {
                ...prevValue,
                username: "",
                password: "",
              };
            });
          } else if (err.response.status === 401) {
            // If password is incorrect, alert user
            alert("Incorrect password");
            setUserData((prevValue) => {
              // Clear password field
              return {
                ...prevValue,
                password: "",
              };
            });
          }
        });
    }
  }

  return (
    <div className="columnAlignment formContentInnerContainer">
      <form onSubmit={handleFormSubmit} className="columnAlignment">
        {/* Full Name input (only for registration) */}
        {/* Username input */}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleFormChange}
          required
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleFormChange}
          required
        />
        {/* Confirm Password input (only for registration) */}
        {!props.isRegistered && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleFormChange}
            required
          />
        )}
        {/* Login/Register button */}
        {props.isRegistered && (
          <button
            className="formButton"
            type="submit"
            onClick={() => {
              setCurrentState("login");
            }}
          >
            {props.isRegistered && "Login"}
          </button>
        )}
        {/* Don't have an account link (only for login) */}
        {props.isRegistered && (
          <button
            className="formBottomText"
            onClick={() => {
              navigate("/register");
            }}
          >
            {props.isRegistered && "Don't have an account?"}
          </button>
        )}
        {/* Register button (only for registration) */}
        {!props.isRegistered && (
          <button type="submit" className="formButton">
            {!props.isRegistered && "Register"}
          </button>
        )}
        {/* Already have an account link (only for registration) */}
        {!props.isRegistered && (
          <button
            className="formBottomText"
            onClick={() => {
              navigate("/login");
            }}
          >
            {!props.isRegistered && "Already have an account?"}
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;
