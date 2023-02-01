import React from "react";
import "./styleCss/Weatherinfo.css";

const WeatherInfo = ({ weather, newTemp, newScale, celcius }) => {
  return (
    <section className="container">
      <h1 className="container__title">Wheater App</h1>
      <h1 className="container__title">Your place</h1>

      <h2 className="container__place">
        {weather?.name} , {weather?.sys.country}
      </h2>

      <article className="container__center">
        <div className="container__imge">
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt="Icon__weather"
          />
        </div>

        <h3 className="container__tempe">
          <span>
            {celcius ? newTemp?.celsius + " °C" : newTemp?.fahrenheit + " °F"}
          </span>
        </h3>

        <h2 className="container__cloud">
          {weather?.weather[0].main}, {weather?.weather[0].description}
        </h2>

        <ul className="container__lista">
          <li>
            <span>{weather?.wind.speed}</span> m/s
          </li>
          <li>
            Pressure: <span>{weather?.main.pressure}</span> hPa
          </li>

          <li>
            <span>Clouds: {weather?.clouds.all}</span> %
          </li>
        </ul>

        <button className="container__button" onClick={newScale}>
          {" "}
          &deg;C/ K{" "}
        </button>
      </article>
    </section>
  );
};

export default WeatherInfo;
