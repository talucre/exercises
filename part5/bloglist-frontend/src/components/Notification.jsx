const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const color = notification.isError ? 'red' : 'green'

    const notificationStyle = {
        padding: '1rem',
        fontSize: '1.2rem',
        background: 'lightgray',
        color: color,
        border: `2px solid ${color}`,
        marginBottom: '1rem',
    }

    return (
        <div style={notificationStyle}>
            {notification.title} {notification.isError}
        </div>
    )
}

export default Notification
