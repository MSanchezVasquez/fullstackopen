import Part from "./Part.jsx";

const Content = ({
  parte1,
  parte2,
  parte3,
  ejercicios1,
  ejercicios2,
  ejercicios3,
}) => {
  return (
    <>
      <Part part={parte1} exercises={ejercicios1} />
      <Part part={parte2} exercises={ejercicios2} />
      <Part part={parte3} exercises={ejercicios3} />
    </>
  );
};

export default Content;
