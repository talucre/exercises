import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <>
            <h2>blogs</h2>
            {user && (
                <div>
                    {user.name} logged in
                    <button
                        onClick={() =>
                            window.confirm('Уверены, что хотите выйти') &&
                            dispatch(logout())
                        }
                    >
                        logout
                    </button>
                </div>
            )}
        </>
    )
}
export default Header
