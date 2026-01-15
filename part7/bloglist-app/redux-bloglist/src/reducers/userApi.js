import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { notify } from './notificationReducer'
import { errorHandled } from './errorReducer'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: headers => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: build => ({
        getUsers: build.query({
            query: () => '/users',
            providesTags: () => [{ type: 'User', id: 'LIST' }],
        }),
        getCurrentUser: build.query({
            query: () => '/users/me',
        }),
        login: build.mutation({
            query: credetials => ({
                url: '/login',
                method: 'POST',
                body: credetials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    if (error.status === 401) {
                        dispatch(
                            notify({
                                message: 'Неверные логин или пароль',
                                type: 'error',
                            })
                        )
                        console.log('handled')
                        dispatch(errorHandled())
                    } else {
                        throw error
                    }
                }
            },
        }),
    }),
})

export const { useGetUsersQuery, useGetCurrentUserQuery, useLoginMutation } =
    userApi
