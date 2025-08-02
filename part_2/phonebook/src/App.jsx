import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";

const createPerson = (name, number) => ({
  name,
  number,
});

const getFilteredPersons = (persons, filter) => {
  return persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const nameExists = (persons, name) => {
  return persons.some((person) => person.name === name);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = createPerson(newName, newNumber);

    nameExists(persons, newName)
      ? showAlertNameAlreadyOnList(newName)
      : persistPerson(personObject);

    setNewName("");
    setNewNumber("");
  };

  const showAlertNameAlreadyOnList = (name) => {
    alert(`${name} is already added to phonebook`);
  };

  const persistPerson = (newPerson) => {
    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={getFilteredPersons(persons, filterName)} />
    </div>
  );
};

export default App;
