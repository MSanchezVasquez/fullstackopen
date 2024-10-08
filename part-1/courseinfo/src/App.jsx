import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parte1={part1}
        parte2={part2}
        parte3={part3}
        ejercicios1={exercises1}
        ejercicios2={exercises2}
        ejercicios3={exercises3}
      />

      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
