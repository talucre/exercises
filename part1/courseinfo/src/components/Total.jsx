const Total = ({ parts }) => {
  const numberOfExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return <p>Number of exercises {numberOfExercises}</p>;
};

export default Total;
