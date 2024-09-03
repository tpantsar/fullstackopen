/* eslint-disable react/prop-types */
import { useState } from "react";

const Person = ({ person }) => {
  return <li>{person.content}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (newName.length === 0) {
      alert("Name cannot be empty");
      return;
    }
    if (persons.some((person) => person.content === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      id: persons.length + 1,
      content: newName,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNewPerson} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
