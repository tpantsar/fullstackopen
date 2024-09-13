/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

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

const Countries = ({ countries, countryFilter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Country
          key={filteredCountries[0].name.common}
          name={filteredCountries[0].name.common}
        />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <Country key={country.name.common} name={country.name.common} />
          ))}
        </ul>
      )}
    </div>
  );
};

const Country = ({ name }) => {
  return <li>{name}</li>;
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
      <Countries countries={allCountries} countryFilter={countryFilter} />
    </div>
  );
};

export default App;
