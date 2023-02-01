import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styleCss/WeatherCountry.css";

const apiKey = "7dd9c412a73ad4be389320698a3e9db0";

const WeatherCountry = () => {
  const [country, setCountry] = useState();
  const [nameCountry, setNameCountry] = useState("colombia");
  const [newTemp, setNewTemp] = useState();
  const [celcius, setCelsius] = useState();

  const newScale = () => {
    setCelsius(!celcius);
  };

  const getCountry = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCountry}&appid=${apiKey}`;

    axios
      .get(url)
      .then((res) => {
        setCountry(res.data);
        const celsius = (res.data.main.temp - 273.15).toFixed(2);
        const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);

        const newTemp = { celsius, fahrenheit };

        setNewTemp(newTemp);
      })
      .catch((err) => console.log(err));
  };

  const handleonClick = (e) => {
    e.preventDefault();
    setNameCountry(e.target.nameCountry.value);
  };

  useEffect(() => {
    getCountry();
  }, [nameCountry]);

  return (
    <section className="containerC">
      <h2 className="ContainerC__title">choose a place</h2>
      <form onSubmit={handleonClick}>
        <div className="containerC__label">
          <label className="containerC__b" htmlFor="">
            Country
          </label>
          <input className="containerC__country" id="nameCountry" type="text" />
          <button className="containerC__button">Search</button>
        </div>
      </form>
      <article className="containerC__elements">
        <h2 className="containerC__name">
          {country?.name} , {country?.sys.country}
        </h2>

        <div className="containerC__img">
          <img
            src={`http://openweathermap.org/img/wn/${country?.weather[0].icon}@2x.png`}
            alt="Icon__weather"
          />
        </div>

        <h3>
          <span className="containerC__temp">
            {celcius ? newTemp?.celsius + " °C" : newTemp?.fahrenheit + " °F"}
          </span>
        </h3>

        <h2 className="container__n">
          {country?.weather[0].main}, {country?.weather[0].description}
        </h2>

        <ul className="container__list">
          <li>
            Wind speed: <span>{country?.wind.speed}</span> m/s
          </li>
          <li>
            Pressure: <span>{country?.main.pressure}</span> hPa
          </li>

          <li>
            <span>Clouds: {country?.clouds.all}</span> %
          </li>
        </ul>

        <button className="containerC__ck" onClick={newScale}>
          {" "}
          &deg;C/ K{" "}
        </button>
      </article>
    </section>
  );
};

export default WeatherCountry;
