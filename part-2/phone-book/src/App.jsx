import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();
    if (!trimmedName) return alert("Please enter a valid name");

    const personExists = persons.find(
      (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
    );

    const numberExists = persons.some((p) => p.number === trimmedNumber);

    // Caso 1: el nombre ya existe → Proponer actualización (PUT)
    if (personExists) {
      const confirmUpdate = window.confirm(
        `${trimmedName} is already added to phonebook, replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = {
          ...personExists,
          number: trimmedNumber, // ✅ aquí incluimos el nuevo número
        };

        personService
          .updatePhone(personExists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== personExists.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
        setErrorMessage(`Updated ${trimmedName}'s number`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      return; // si cancela la confirmación, no continúa
    }

    // Caso 2: número ya existe (pero el nombre no)
    if (numberExists) {
      alert(`${trimmedNumber} is already added to phonebook`);
      return;
    }

    // Caso 3: ni nombre ni número existen → crear nuevo registro
    personService
      .create({ name: trimmedName, number: trimmedNumber })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    setErrorMessage(`Added ${trimmedName}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(textFilter.toLowerCase())
  );

  const deletePerson = (id) => {
    const response = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (response) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        textFilter={textFilter}
        handleTextFilterChange={(e) => setTextFilter(e.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
