import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter('ALL'))}
            />
            all
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter('IMPORTANT'))}
            />
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(setFilter('NONIMPORTANT'))}
            />
            nonimportant
        </div>
    )
}

export default VisibilityFilter
