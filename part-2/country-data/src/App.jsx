import { useEffect, useState } from "react";
import countrieService from "./services/countries";

import "./App.css";
import CountryDetail from "./components/CountryDetail";

function App() {
  const [countrieName, setCountrieName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    countrieService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(countrieName.toLowerCase())
  );

  const onCountrieShow = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    const country =
      selectedCountry ||
      (filteredCountries.length === 1 ? filteredCountries[0] : null);

    if (!country) {
      setWeather(null);
      return;
    }

    const capital = country.capital[0];
    const [lat, lon] = country.capitalInfo.latlng;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch(() => setWeather(null));
  }, [selectedCountry, filteredCountries]);

  return (
    <>
      <div>
        <label>
          find countries:{" "}
          <input
            type="text"
            value={countrieName}
            onChange={(e) => {
              setCountrieName(e.target.value);
              setSelectedCountry(null);
            }}
          />
        </label>
      </div>
      <div>
        {countrieName && filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countrieName &&
          filteredCountries.length > 1 &&
          filteredCountries.length <= 10 &&
          filteredCountries.map((c) => (
            <>
              <div style={{ display: "flex", gap: "5px", marginBottom: "4px" }}>
                {" "}
                <li key={c.cca3}>{c.name.common}</li>
                <button onClick={() => onCountrieShow(c)}>Show</button>
              </div>
            </>
          ))}

        {filteredCountries.length === 1 && (
          <>
            <CountryDetail country={filteredCountries[0]} weather={weather} />
          </>
        )}

        {selectedCountry && filteredCountries.length > 1 && (
          <>
            <CountryDetail country={selectedCountry} weather={weather} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
