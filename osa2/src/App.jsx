/* eslint-disable react/prop-types */
import { useState } from "react";

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
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

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

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");

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
