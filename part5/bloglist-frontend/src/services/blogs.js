import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async blogObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blogObject, config)
    return response.data
}

const update = async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data)
    return response.data
}

export default { setToken, getAll, create, update }
