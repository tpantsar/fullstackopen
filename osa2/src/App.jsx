/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import personService from "./services/persons";

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const Filter = ({ nameFilter, setNameFilter }) => {
  return (
    <div>
      filter shown with
      <input
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
    </div>
  );
};

const PersonForm = (props) => {
  const { addPerson, newName, handleNewPerson, newNumber, handleNewNumber } =
    props;
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={handleNewPerson} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

const Persons = ({ persons, nameFilter }) => {
  const personFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <ul>
      {personFilter.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const baseUrl = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (newName.length === 0) {
      alert("Name cannot be empty");
      return;
    }
    if (newNumber.length === 0) {
      alert("Number cannot be empty");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });

    console.log("persons", persons);
  };

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const formProps = {
    addPerson,
    newName,
    handleNewPerson,
    newNumber,
    handleNewNumber,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add new person</h3>
      <PersonForm {...formProps} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
