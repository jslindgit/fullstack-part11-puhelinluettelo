import axios from 'axios'

const baseUrl = '/api/persons'

const deleteItem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const getAll = () => {
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
