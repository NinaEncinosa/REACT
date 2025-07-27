import { useState } from "react";

const Person = ({ name }) => {
  return <li>{name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    const nameExists = persons.some((person) => person.name === newName);

    nameExists
      ? showAlertNameAlreadyOnList(personObject.name)
      : setPersons(persons.concat(personObject));
    setNewName("");
  };

  const showAlertNameAlreadyOnList = (newName) => {
    alert(`${newName} is already added to phonebook`);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
