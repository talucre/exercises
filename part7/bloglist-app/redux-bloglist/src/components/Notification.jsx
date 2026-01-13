import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    console.log(notification)

    if (!notification.message) {
        return null
    }

    const { message, type } = notification

    const style = {
        backgroundColor: 'lightgrey',
        margin: '10px',
        padding: '10px',
        border: '2px solid',
        borderColor: type === 'success' ? 'green' : 'red',
        borderRadius: '5px',
    }

    return <div style={style}>{message}</div>
}

export default Notification
