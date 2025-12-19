import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(_, action) {
            return action.payload
        },
        hideNotification() {
            return ''
        },
    },
})

const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer
