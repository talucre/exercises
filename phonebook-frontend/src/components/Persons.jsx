const Persons = ({persons, handleDeleteClickOf}) => {
    return (
        <table>
            <tbody>
                {persons.map(person => 
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                            <button onClick={() => handleDeleteClickOf(person.id)}>
                                delete
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Persons