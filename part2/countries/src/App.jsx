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

const Countries = ({ countries, countryFilter, setCountryList }) => {
  console.log("first country:", countries[0]);
  console.log("country:", countries[0].name.common);
  const filter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  console.log("filter:", filter);

  filter.map((country) => {
    console.log("country:", country.name.common);
  });

  return (
    <ul>
      {filter.map((country) => {
        <Country key={country.name.common} />;
      })}
    </ul>
  );
};

const Country = ({ country }) => {
  return <li>{country.name}</li>;
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountryFilter] = useState("");
  const [countryList, setCountryList] = useState({});

  // Fetch all countries once
  useEffect(() => {
    console.log("effect run, fetched all countries.");

    console.log("fetching all countries ...");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countries = response.data;
        setAllCountries(countries);
        console.log("all countries fetched:", countries.length);
      });
  }, []);

  // useEffect(() => {
  //   console.log("effect run, country is now", country);
  //   // skip if country is not defined
  //   if (country) {
  //     console.log("fetching countries ...");
  //     axios
  //       .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
  //       .then((response) => {
  //         setCountries(response.data.name.common);
  //       });
  //   }
  // }, [country]);

  if (allCountries.length === 0) {
    return <div>Loading countries...</div>;
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter countryFilter={country} setCountryFilter={setCountryFilter} />
      <pre>{JSON.stringify(countryList, null, 2)}</pre>
      <Countries
        countries={allCountries}
        countryFilter={country}
        setCountryList={setCountryList}
      />
    </div>
  );
};

export default App;
