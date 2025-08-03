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

const Notification = ({ message, type }) => {
  if (!message) return null;
  return <div className={`notification ${type}`}>{message}</div>;
};

const nameExists = (persons, name) =>
  persons.some((person) => person.name.toLowerCase() === name.toLowerCase());

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    phonebookService.getAll().then((r) => setPersons(r));
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      clearNotification();
    }, 5000);
  };

  const clearNotification = () => {
    setNotification({ message: null, type: null });
  };

  const handleFilter = (e) => setFilter(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = createPerson(newName, newNumber);

    nameExists(persons, newName)
      ? handleUpdateNumber(personObject)
      : handleAddPerson(personObject);

    setNewName("");
    setNewNumber("");
  };

  const handleUpdateNumber = (personObject) => {
    const confirmUpdate = window.confirm(
      `${personObject.name} is already added to phonebook, replace the old number with a new one?`
    );
    if (confirmUpdate) {
      const existingPerson = persons.find((p) => p.name === personObject.name);
      const updatedPerson = { ...existingPerson, number: personObject.number };

      phonebookService.update(existingPerson.id, updatedPerson).then((resp) => {
        setPersons(persons.map((p) => (p.id !== existingPerson.id ? p : resp)));
        showNotification(
          `${personObject.name}'s number was updated successfully`
        );
      });
    }
  };

  const handleAddPerson = (newPerson) => {
    phonebookService.create(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      showNotification(`Added ${createdPerson.name}`);
    });
  };

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name} successfully`);
        })
        .catch((error) => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      ></Notification>
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
