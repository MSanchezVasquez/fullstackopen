import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((c) => (
        <div key={c.id}>
          <Header name={c.name} />
          <Content parts={c.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
