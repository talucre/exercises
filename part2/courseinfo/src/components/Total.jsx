const Total = ({ parts }) => {
    console.log(parts)

    const numberOfExercises = parts.reduce(
        (sum, current) => sum + current.exercises,
        0
    )

    return <h3>total of {numberOfExercises}</h3>
}

export default Total
