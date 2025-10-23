import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();
    if (!trimmedName) return alert("Please enter a valid name");
    const existsName = persons.some(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );
    const existsNumber = persons.some(
      (person) => person.number === trimmedNumber
    );

    if (existsName) {
      alert(`${newName} is already added to phonebook`);
    } else if (existsNumber) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleTextFilterChange = (e) => setTextFilter(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(textFilter.toLowerCase())
  );

  console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={textFilter}
          onChange={handleTextFilterChange}
        />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
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

      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
