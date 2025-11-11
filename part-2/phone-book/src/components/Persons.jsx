import DetailsPerson from "./DetailsPerson";

function Persons({ filteredPersons, deletePerson }) {
  return (
    <>
      {filteredPersons.map((person) => (
        <DetailsPerson
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </>
  );
}

export default Persons;
