import { useState } from "react";
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");

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
      : setPersons(persons.concat(personObject));

    setNewName("");
    setNewNumber("");
  };

  const showAlertNameAlreadyOnList = (name) => {
    alert(`${name} is already added to phonebook`);
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
