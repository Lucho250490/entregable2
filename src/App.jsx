import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCountry from "./components/WeatherCountry";
import WeatherInfo from "./components/WeatherInfo";

const myApiKey = "7dd9c412a73ad4be389320698a3e9db0";

function App() {
  const [coord, setCoord] = useState();
  const [weather, setWeather] = useState();
  const [newTemp, setNewTemp] = useState();
  const [celcius, setCelsius] = useState();

  const succes = (e) => {
    const myCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude,
    };
    setCoord(myCoords);
  };

  const newScale = () => {
    setCelsius(!celcius);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  useEffect(() => {
    if (coord) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${myApiKey}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);

          const newTemp = { celsius, fahrenheit };
          setNewTemp(newTemp);
        })
        .catch((err) => console.log(err));
    }
  }, [coord]);

  return (
    <div className="App">
      <div className="ele">
        <WeatherInfo
          weather={weather}
          newTemp={newTemp}
          newScale={newScale}
          celcius={celcius}
        />
      </div>
      <div className="ele">
        <WeatherCountry />
      </div>
    </div>
  );
}

export default App;
