import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <>
            <h2>blogs</h2>
        </>
    )
}
export default Header
