import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/blogs',
        prepareHeaders: (headers, { getState }) => {
            const user = localStorage.getItem('blogUserKey')
            const { token } = user ? JSON.parse(user) : null
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Blog'],
    endpoints: build => ({
        getBlogs: build.query({
            query: () => '',
            providesTags: result =>
                result
                    ? [
                          ...result.map(blog => ({
                              type: 'Blog',
                              id: blog.id,
                          })),
                          { type: 'Blog', id: 'LIST' },
                      ]
                    : [{ type: 'Blog', id: 'LIST' }],
        }),
        createBlog: build.mutation({
            query: ({ id, ...body }) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
        updateBlog: build.mutation({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted(
                { id, ...patch },
                { dispatch, queryFulfilled }
            ) {
                const updated = await queryFulfilled
                dispatch(
                    blogApi.util.updateQueryData(
                        'getBlogs',
                        undefined,
                        draft => {
                            const index = draft.findIndex(
                                blog => blog.id === id
                            )
                            if (index !== -1) {
                                draft[index] = updated.data
                            }
                        }
                    )
                )
            },
        }),
        removeBlog: build.mutation({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useRemoveBlogMutation,
} = blogApi
