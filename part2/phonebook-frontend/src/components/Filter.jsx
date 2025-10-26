const Filter = ({filter, handleFilterChange}) => {
    return (
        <>
            filter shown with &nbsp;
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
            />
        </>
    )
}

export default Filter