const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
    }

    return await response.json()
}

export const createAnecdote = async newAnecdote => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote),
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
    }

    return await response.json()
}

export const voteForAnecdote = async anecdote => {
    const options = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote),
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
    }

    return await response.json()
}
