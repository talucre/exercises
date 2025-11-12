import { useContext } from 'react'
import NotificationContext from './contexts/NotificationContext'

const Notification = () => {
    const { notification } = useContext(NotificationContext)

    if (!notification) {
        return null
    }

    const colors = {
        success: 'green',
        error: 'red',
    }

    const color = colors[notification.type]

    const notificationStyle = {
        padding: '1rem',
        fontSize: '1.2rem',
        background: 'lightgray',
        color: color,
        border: `2px solid ${color}`,
        marginBottom: '1rem',
    }

    return <div style={notificationStyle}>{notification.message}</div>
}

export default Notification
