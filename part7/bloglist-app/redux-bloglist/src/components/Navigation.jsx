import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const nav = { padding: '0.5rem', background: '#cccccc' }
    const margin = { margin: '0.5rem' }

    return (
        <nav style={nav}>
            <Link to="/" style={margin}>
                blogs
            </Link>
            <Link to="/users" style={margin}>
                users
            </Link>
            {user && (
                <span style={margin}>
                    {user.name} logged in
                    <button
                        style={margin}
                        onClick={() =>
                            window.confirm('Уверены, что хотите выйти') &&
                            dispatch(logout())
                        }
                    >
                        logout
                    </button>
                </span>
            )}
        </nav>
    )
}
export default Navigation
