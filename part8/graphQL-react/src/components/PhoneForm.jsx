import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [changeNumber] = useMutation(EDIT_NUMBER, {
        onCompleted: data => {
            if (!data.editNumber) {
                setError('person not found')
            }
        },
        onError: error => setError(error.message),
    })

    const submit = event => {
        event.preventDefault()

        changeNumber({ variables: { name, phone } })

        setPhone('')
    }

    return (
        <div>
            <h2>change number</h2>

            <form onSubmit={submit}>
                <div>
                    name{' '}
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    phone{' '}
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">change number</button>
            </form>
        </div>
    )
}

export default PhoneForm
