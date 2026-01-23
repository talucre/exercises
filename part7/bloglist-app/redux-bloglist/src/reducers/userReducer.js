import { createSlice } from '@reduxjs/toolkit'
import { userApi } from './userApi'
import { notify } from './notificationReducer'

const initialState = { user: null, isLoading: true }

const userStore = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
        },
        startLoading(state) {
            state.isLoading = true
        },
        endLoading(state) {
            state.isLoading = false
        },
    },
})

export const { setUser, clearUser, startLoading, endLoading } =
    userStore.actions

export const initUser = () => async dispatch => {
    const token = localStorage.getItem('token')
    if (!token) return

    dispatch(startLoading())
    const { data: user } = await dispatch(
        userApi.endpoints.getCurrentUser.initiate(),
    )
    dispatch(endLoading())
    dispatch(setUser(user))
}

export const login = credentials => async dispatch => {
    try {
        dispatch(startLoading())
        const { data: user } = await dispatch(
            userApi.endpoints.login.initiate(credentials),
        )
        if (!user) return
        localStorage.setItem('token', user.token)
        dispatch(endLoading())
        dispatch(setUser(user))
        dispatch(
            notify({
                message: `Добро пожаловать, ${user.name}`,
                type: 'success',
            }),
        )
    } catch (err) {
        console.error('Login error:', err)
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch(clearUser())
}

export default userStore.reducer
