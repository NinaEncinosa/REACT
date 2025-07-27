import { useState } from "react";

const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: 11 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const nameExists = persons.some((person) => person.name === newName);

    nameExists
      ? showAlertNameAlreadyOnList(personObject.name)
      : setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const showAlertNameAlreadyOnList = (newName) => {
    alert(`${newName} is already added to phonebook`);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
