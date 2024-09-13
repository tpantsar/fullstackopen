/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import weatherService from "./services/openmeteo";

const Filter = ({ countryFilter, setCountryFilter }) => {
  return (
    <div>
      Country:{" "}
      <input
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
      />
    </div>
  );
};

// Show detailed information from one country
const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  console.log("CountryInfo:", country);
  console.log("flag url:", country.flags.png);

  const imageStyle = {
    height: "100%",
    width: "auto",
    border: "1px solid black",
  };

  const latitude = country.capitalInfo.latlng[0];
  const longitude = country.capitalInfo.latlng[1];

  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  useEffect(() => {
    weatherService
      .getWeatherData(latitude, longitude)
      .then((response) => {
        console.log("Weather data:", response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [latitude, longitude]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area} km²</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img style={imageStyle} src={country.flags.png} alt="Country flag" />
    </div>
  );
};

const Countries = ({ countries, countryFilter, setCountryFilter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryInfo country={filteredCountries[0]} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <Country
              key={country.name.common}
              name={country.name.common}
              setCountryFilter={setCountryFilter}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const Country = ({ name, setCountryFilter }) => {
  return (
    <li>
      {name}
      <button onClick={() => setCountryFilter(name)}>show</button>
    </li>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  // Fetch all countries once
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
        console.log("all countries fetched:", response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  if (allCountries.length === 0) {
    return <div>Loading countries...</div>;
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
      />
      <Countries
        countries={allCountries}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
      />
    </div>
  );
};

export default App;
