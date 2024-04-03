import React from "react";
import { VectorMap } from "react-jvectormap";
import { getCode, getData } from "country-list";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Footer from "./Footer.jsx";
import { SERVER_ADDRESS } from "../config.js";
import TravelExploreIcon from "@mui/icons-material/TravelExplore.js";
import MenuIcon from "@mui/icons-material/Menu";

function TrekTracker() {
  // Get user token from local storage and set authorization header
  const currentUserToken = localStorage.getItem("userToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${currentUserToken}`;

  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Redirect user to home page if not authenticated
  useEffect(() => {
    if (currentUserToken === null) {
      navigate("/");
    }
  });

  // State variables for username, country, visitedCountriesArray, mapData
  const [country, setCountry] = useState("");
  const [username, setUserName] = useState("");
  const [visitedCountriesArray, setVisitedCountriesArray] = useState([]);
  const [mapData, setMapData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch user data and existing visiting countries from the server on component mount
  useEffect(() => {
    try {
      axios
        .post(`${SERVER_ADDRESS}/getUserData`)
        .then((response) => {
          setUserName(response.data.username);
          setVisitedCountriesArray(response.data.existedCountries);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Function to generate map data from visited countries
  useEffect(() => {
    const data = {};
    visitedCountriesArray.forEach((country) => {
      data[country.country_code] = 1;
    });
    setMapData(data);
  }, [visitedCountriesArray]);

  function handleCountryClick(event, countryCode) {
    event.preventDefault();
    const result = visitedCountriesArray.find(
      (country) => country.country_code === countryCode
    );
    if (result) {
      axios.delete(`${SERVER_ADDRESS}/deleteCountry`, {
        data: { countryIdToDelete: result.id },
      });
      setVisitedCountriesArray((preValue) => {
        return preValue.filter((item, index) => {
          return item.id !== result.id;
        });
      });
    } else {
      try {
        axios
          .post(`${SERVER_ADDRESS}/addCountry`, {
            code: countryCode,
            country: country,
          })
          .then((response) => {
            const { addedCountryId } = response.data;
            updateVisitedCountriesArray({
              // Update the visitedCountriesArray with the newly added country
              id: addedCountryId,
              country_code: countryCode,
            });
          })
          .catch((err) => {
            if (err.response) {
              alert(err.response.data);
            }
            setCountry("");
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Function to handle changes in the country input field
  const handleCountryChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setCountry(selectedOption ? selectedOption.label : "");
  };

  // Function to update visited countries array with a new country object
  function updateVisitedCountriesArray(newCountryObject) {
    setVisitedCountriesArray((prevCountriesArray) => {
      return [...prevCountriesArray, newCountryObject];
    });
  }

  function addCountry(e) {
    e.preventDefault();
    const code = getCode(country);
    console.log(code);
    if (code === undefined) {
      alert("Invalid country");
      setCountry("");
    } else {
      axios
        .post(`${SERVER_ADDRESS}/addCountry`, {
          code: code,
          country: country,
        })
        .then((response) => {
          const { addedCountryId } = response.data;
          updateVisitedCountriesArray({
            // Update the visited countries array with the newly added country
            id: addedCountryId,
            country_code: code,
          });
          setCountry(""); // Reset country state
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          }
          setCountry("");
        });
    }
  }

  function handleLogOut() {
    localStorage.removeItem("userToken"); // Remove user token from local storage
    navigate("/"); // Redirect user to home page after logout
  }

  return (
    <div className="columnAlignment mapContainer">
      <header className="columnAlignment">
        <nav className="rowColumnAlignment">
          <div className="rowColumnAlignment">
            <h1 className="rowAlignment">
              <TravelExploreIcon />
              TrekTracker
            </h1>
            <span className="greetUser">{username} </span>
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
              <button
                onClick={handleLogOut}
                className="accentButton darkAccentButton"
              >
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <form onSubmit={addCountry} className="columnAlignment enterCountryForm">
        <Select
          options={getData().map((country) => ({
            value: country.code,
            label: country.name,
          }))}
          onChange={handleCountryChange}
          placeholder="Select a country..."
          autoFocus
          isClearable
        />
        <div className="rowAlignment">
          <button type="submit" className="accentButton darkAccentButton">
            Add
          </button>
          <span className="fill"></span>
          <h2 className="totalCount">
            Total Countries: {visitedCountriesArray.length}
          </h2>
        </div>
      </form>

      <VectorMap className="map"
        map={"world_mill"}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px",
        }}
        onRegionClick={(event, countryCode) =>
          handleCountryClick(event, countryCode)
        }
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#008080",
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData,
              scale: ["#008080"],
              normalizeFunction: "polynomial",
            },
          ],
        }}
        onRegionTipShow={(e, label, code) => e.preventDefault()}
      />

      <Footer />
    </div>
  );
}

export default TrekTracker;
