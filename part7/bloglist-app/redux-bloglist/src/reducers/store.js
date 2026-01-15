import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import errorReducer from './errorReducer'
import { blogApi } from './blogApi'
import { userApi } from './userApi'
import { authErrorMiddleware } from '../middlewares/authErrorMiddleware'

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        errorHandled: errorReducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(blogApi.middleware)
            .concat(userApi.middleware)
            .concat(authErrorMiddleware),
})

export default store
