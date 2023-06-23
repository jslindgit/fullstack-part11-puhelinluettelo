import axios from 'axios'

const baseUrl = '/api/persons'

const deleteItem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const getAll = () => {
    console.log('baseUrl:', baseUrl)
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
    console.log('process.env:', process.env)
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const postNew = (nameObj) => {
    const request = axios.post(baseUrl, nameObj)
    return request.then((response) => response.data)
}

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then((response) => response.data)
}

export default { deleteItem, getAll, postNew, update }
