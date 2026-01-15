import { createSlice } from '@reduxjs/toolkit'
import { userApi } from './userApi'
import { notify } from './notificationReducer'

const userStore = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(_, action) {
            return action.payload
        },
        clearUser() {
            return null
        },
    },
})

export const { setUser, clearUser } = userStore.actions

export const initUser = () => async dispatch => {
    const token = localStorage.getItem('token')
    if (!token) return

    const { data: user } = await dispatch(
        userApi.endpoints.getCurrentUser.initiate()
    )

    dispatch(setUser(user))
}

export const login = credentials => async dispatch => {
    try {
        const { data: user } = await dispatch(
            userApi.endpoints.login.initiate(credentials)
        )
        if (!user) return
        localStorage.setItem('token', user.token)
        dispatch(setUser(user))
        dispatch(
            notify({
                message: `Добро пожаловать, ${user.name}`,
                type: 'success',
            })
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
