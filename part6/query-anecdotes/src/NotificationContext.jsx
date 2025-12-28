import { createContext, useEffect, useReducer, useRef } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload
        case 'HIDE':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    )

    const timerRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    const showNotification = message => {
        notificationDispatch({ type: 'SHOW', payload: message })

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            notificationDispatch({ type: 'HIDE' })
        }, 5000)
    }

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification }}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
