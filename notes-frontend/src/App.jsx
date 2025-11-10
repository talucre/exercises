import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/forms/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/forms/NoteForm'

const App = () => {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    if (!notes) {
        return null
    }

    const addNote = noteObject => {
        noteService.create(noteObject).then(returnedNote => {
            setNotes(notes.concat(returnedNote))
        })
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(
                    notes.map(note => (note.id !== id ? note : returnedNote))
                )
            })
            .catch(() => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const handleNoteChange = event => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    // const handleLogin = async event => {
    //     event.preventDefault()
    //     console.log('logging in with', username, password)

    //     try {
    //         const user = await loginService.login({ username, password })

    //         window.localStorage.setItem(
    //             'loggedNoteappUser',
    //             JSON.stringify(user)
    //         )
    //         noteService.setToken(user.token)
    //         setUser(user)
    //         setUsername('')
    //         setPassword('')
    //     } catch {
    //         setErrorMessage('wrong credentials')
    //         setTimeout(() => {
    //             setErrorMessage(null)
    //         }, 5000)
    //     }
    // }

    const handleLogin = async credentials => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
        } catch {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
        noteService.setToken(null)
    }

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm handleLogin={handleLogin} />
        </Togglable>
    )

    const noteForm = () => (
        <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote} />
        </Togglable>
    )

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={() => handleLogout()}>log out</button>
                    {noteForm()}
                </div>
            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>

            <Footer />
        </div>
    )
}

export default App
