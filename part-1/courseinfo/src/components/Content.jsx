import Part from "./Part";

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <p>
      <strong>
        Total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  </div>
);

export default Content;
