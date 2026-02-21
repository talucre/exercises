import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREATE_PERSON, ALL_PERSONS } from '../queries'

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: error => setError(error.message),
    })

    const submit = event => {
        event.preventDefault()

        createPerson({ variables: { name, phone, street, city } })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    phone
                    <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    street
                    <input
                        type="text"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    city
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                    <button type="submit">add!</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
