import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImg from "../assets/background.jpeg";
import { FaSearch } from "react-icons/fa";
import cloudy from "../assets/cloduy.jpeg";
import sunny from "../assets/sunny.jpeg";
import hot from "../assets/hot.jpeg";
import haze from "../assets/haze.jpeg";
import cloudyGif from "../assets/cloudyGif.gif";
import hotGif from "../assets/hotGif.gif";
import hazeGif from "../assets/hazeGif.gif";
import sunnyGif from "../assets/sunnyGif.gif";

function Weather() {
  const [storeWeatherData, setStoreWeatherData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString([], {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    };
    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://yahoo-weather5.p.rapidapi.com/weather`,
        {
          headers: {
            "X-RapidAPI-Key":
              "057b88ecf9msh07db1116bcaccb1p16a3afjsnf6c299e13c10",
            "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
          },
          params: {
            location: inputValue,
            format: "json",
            u: "f",
          },
        }
      );

      console.log("Response of Weather api", response.data);
      if (response.status === 200) {
        setStoreWeatherData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("Not getting response");
        setMessage("Something went wrong please try again later");
      }
    } catch (error) {
      setLoading(false);
      console.log("Weather api is not working", error?.message);
      setMessage("Something went wrong please try again later");
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          alignItems: "center",
          alignContent: "center",
          height: "100vh",
          backgroundImage:
            storeWeatherData?.current_observation?.condition?.text ===
              "Partly Cloudy" ||
            storeWeatherData?.current_observation?.condition?.text ===
              "Mostly Cloudy"
              ? `url(${cloudyGif})`
              : storeWeatherData?.current_observation?.condition?.text ===
                "Haze"
              ? `url(${hazeGif})`
              : storeWeatherData?.current_observation?.condition?.text === "Hot"
              ? `url(${hotGif})`
              : storeWeatherData?.current_observation?.condition?.text ===
                  "Sunny" ||
                storeWeatherData?.current_observation?.condition?.text ===
                  "Mostly Sunny"
              ? `url(${sunnyGif})`
              : null,
          backgroundSize: "cover",
        }}
      >
        <div
          className="card"
          style={{ width: "40%", overflow: "hidden", height: "51%" }}
        >
          <div
            className="card-body"
            style={{
              backgroundImage:
                storeWeatherData?.current_observation?.condition?.text ===
                "Partly Cloudy"
                  ? `url(${cloudy})`
                  : storeWeatherData?.current_observation?.condition?.text ===
                    "Haze"
                  ? `url(${haze})`
                  : storeWeatherData?.current_observation?.condition?.text ===
                    "Hot"
                  ? `url(${hot})`
                  : storeWeatherData?.current_observation?.condition?.text ===
                      "Sunny" ||
                    storeWeatherData?.current_observation?.condition?.text ===
                      "Mostly Sunny"
                  ? `url(${sunny})`
                  : `url(${backgroundImg})`,
              backgroundSize: "cover",
            }}
          >
            <div className="d-flex justify-content-between p-2">
              <h2 style={{ color: "white" }}>
                {storeWeatherData?.location?.country}
              </h2>
              <h2 style={{ color: "white" }}>{currentTime}</h2>
            </div>
          </div>
        </div>
        {/* --------------------- Second Card -------------------------- */}
        <div
          className="card"
          style={{ width: "20%", backgroundColor: "#323232", height: "51%" }}
        >
          <div
            className="card-body"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border text-light"
                  role="status"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <>
                {message != "" ? (
                  <>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {message}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h5
                      className=""
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingBottom: "5px",
                        borderBottom: "1px solid white",
                      }}
                    >
                      {storeWeatherData?.current_observation?.condition?.text}
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        borderBottom: "1px solid white",
                        paddingBottom: "15px",
                      }}
                    >
                      <div>
                        <input
                          style={{
                            borderRadius: 19,
                            border: "none",
                            padding: 6,
                          }}
                          placeholder="Type to search..."
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={handleWeather}
                        disabled={inputValue === ""}
                      >
                        <FaSearch color="white" size={20} />
                      </button>
                    </div>
                    <div>
                      <p
                        className=""
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {storeWeatherData?.location?.city}
                      </p>
                    </div>
                    <div>
                      <div className="d-flex gap-3">
                        <p style={{ color: "white", fontWeight: "bold" }}>
                          Temperature:{" "}
                        </p>
                        <p style={{ color: "white" }}>
                          {
                            storeWeatherData?.current_observation?.condition
                              ?.temperature
                          }
                        </p>
                      </div>
                      <div className="d-flex gap-3">
                        <p style={{ color: "white", fontWeight: "bold" }}>
                          Humidity:{" "}
                        </p>
                        <p style={{ color: "white" }}>
                          {
                            storeWeatherData?.current_observation?.atmosphere
                              ?.humidity
                          }
                        </p>
                      </div>
                      <div className="d-flex gap-3">
                        <p style={{ color: "white", fontWeight: "bold" }}>
                          Wind speed:{" "}
                        </p>
                        <p style={{ color: "white" }}>
                          {storeWeatherData?.current_observation?.wind?.speed}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
