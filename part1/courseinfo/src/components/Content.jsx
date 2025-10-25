import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
