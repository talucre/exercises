import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import { blogApi } from './blogApi'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(blogApi.middleware),
})

export default store
