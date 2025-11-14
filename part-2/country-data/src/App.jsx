import { useEffect, useState } from "react";
import countrieService from "./services/countries";

import "./App.css";

function App() {
  const [countrieName, setCountrieName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countrieService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(countrieName.toLowerCase())
  );

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
          filteredCountries.map((c) => <li key={c.cca2}>{c.name.common}</li>)}

        {filteredCountries.length === 1 && (
          <>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital {filteredCountries[0].capital}</p>
            <p>Area {filteredCountries[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(filteredCountries[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img
              src={filteredCountries[0].flags.png}
              width={250}
              height={200}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
