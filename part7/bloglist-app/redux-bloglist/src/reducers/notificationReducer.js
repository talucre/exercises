import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: null, type: null },
    reducers: {
        setNotification(state, action) {
            const { message, type = 'success' } = action.payload
            state.message = message
            state.type = type
        },
        clearNotification(state) {
            state.message = null
            state.type = null
        },
    },
})

const { setNotification, clearNotification } = notificationSlice.actions

let notificationTimeoutId = null

export const notify =
    ({ message, type = 'success' }) =>
    dispatch => {
        dispatch(setNotification({ message, type }))

        if (notificationTimeoutId) {
            clearTimeout(notificationTimeoutId)
        }
        notificationTimeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

export default notificationSlice.reducer
