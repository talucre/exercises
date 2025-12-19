import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        updateUnecdote(state, action) {
            const updatedAnecdote = action.payload
            const id = updatedAnecdote.id
            return state.map(a => (a.id !== id ? a : action.payload))
        },
        setAnecdotes(_, action) {
            return action.payload
        },
    },
})

const { setAnecdotes, createAnecdote, updateUnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const appendAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }
}

export const appendVote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.voteFor(anecdote)
        dispatch(updateUnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer
