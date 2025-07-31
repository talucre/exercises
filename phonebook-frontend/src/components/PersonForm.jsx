const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          <div>
            name: &nbsp;
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            number: &nbsp;
            <input
              type="text"
              value={newNumber}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm