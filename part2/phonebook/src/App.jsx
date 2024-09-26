/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personService from "./services/persons";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === "error") {
    return <div className="error">{message}</div>;
  }
  return <div className="success">{message}</div>;
};

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
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const timeout = 5000;

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

    // Check if the person is already in the phonebook
    if (persons.some((p) => p.name === newName)) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        const person = persons.find((p) => p.name === newName);
        updatePerson(person.id, {
          ...person,
          number: newNumber,
        });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));

      // Display notification
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, timeout);

      // Reset the input fields
      setNewName("");
      setNewNumber("");
    });

    console.log("persons", persons);
  };

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );

        // Display notification
        setSuccessMessage(`Updated ${personObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, timeout);
      })
      .catch(() => {
        setErrorMessage(
          `Person '${personObject.name}' has already been removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, timeout);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));

        // Display notification
        setSuccessMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, timeout);
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
      <Notification message={successMessage} type={"success"} />
      <Notification message={errorMessage} type={"error"} />
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
