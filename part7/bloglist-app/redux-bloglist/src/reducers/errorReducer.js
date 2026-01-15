import { createSlice } from '@reduxjs/toolkit'

const errorReducer = createSlice({
    name: 'errorHandler',
    initialState: false,
    reducers: {
        errorHandled() {
            return true
        },
        resetError() {
            return false
        },
    },
})

export const { errorHandled, resetError } = errorReducer.actions
export default errorReducer.reducer
