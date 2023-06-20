import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons' // <- local
const baseUrl = '/api/persons' // <- fly.io

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

// eslint-disable-next-line import/no-anonymous-default-export
export default { deleteItem, getAll, postNew, update }
