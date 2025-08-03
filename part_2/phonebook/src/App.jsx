import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";
import phonebookService from "./services/phonebookService";

const createPerson = (name, number) => ({
  name,
  number,
});

const getFilteredPersons = (persons, filter) => {
  return persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const nameExists = (persons, name) =>
  persons.some((person) => person.name.toLowerCase() === name.toLowerCase());

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((r) => setPersons(r));
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
      ? showAlertChangeNumber(personObject)
      : persistPerson(personObject);

    setNewName("");
    setNewNumber("");
  };

  const showAlertChangeNumber = (personObject) => {
    const confirmUpdate = window.confirm(
      `${personObject.name} is already added to phonebook, replace the old number with a new one?`
    );
    if (confirmUpdate) {
      const existingPerson = persons.find((p) => p.name === personObject.name);
      const updatedPerson = { ...existingPerson, number: personObject.number };

      phonebookService.update(existingPerson.id, updatedPerson).then((resp) => {
        setPersons(persons.map((p) => (p.id !== existingPerson.id ? p : resp)));
      });
    }
  };

  const persistPerson = (newPerson) => {
    phonebookService.create(newPerson).then((p) => {
      setPersons(persons.concat(p));
    });
  };

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`${name} has already been removed`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
      <Persons
        persons={getFilteredPersons(persons, filterName)}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;
