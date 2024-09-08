/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personService from "./services/persons";

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>delete</button>
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

const Persons = ({ persons, nameFilter, removePerson }) => {
  const personFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <ul>
      {personFilter.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
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
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
