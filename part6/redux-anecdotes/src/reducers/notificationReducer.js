import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(_, action) {
            return action.payload
        },
        hideNotification() {
            return ''
        },
    },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
