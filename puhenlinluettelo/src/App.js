import { useState, useEffect } from 'react'
import serverProvider from './services/server_provider'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState('')
	const [notification, setNotification] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		getPersons()
	}, [])

	

	const addPerson = (event) => {
		event.preventDefault()
		if (newName.trim().length > 0 && newNum.trim().length > 0) {
			const newPerson = { name: newName, number: newNum }
			const existing = persons.find(p => p.name === newPerson.name)
			if (existing === undefined) {				
				serverProvider
					.postNew(newPerson)
					.then(returnedPerson => {
						setPersons(persons.concat(returnedPerson))							
						setNotification(`Added ${returnedPerson.name}`)
						setTimeout(() => setNotification(null), 5000)
					})
					.catch(error => { 
						console.log(error.response.data.error)
						setError(error.response.data.error)
					})
			}
			else {
				updatePerson(existing.id, { ...existing, number: newNum })
			}
			setNewName('')
			setNewNum('')
		}
	}

	const delPerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			serverProvider
				.deleteItem(person.id)	
			setPersons(persons.filter(p => p.id !== person.id))
		}
	}

	const getPersons = () => {
		serverProvider
			.getAll().then(initPersons => setPersons([ ...initPersons]))
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	
	const handleNumChange = (event) => {
		setNewNum(event.target.value)
	}

	const updatePerson = (id, newPerson) => {
		if (window.confirm(`${newPerson.name} is already added to the phonebook. Replace the old number with a new one?`)) {
			serverProvider
				.update(id, newPerson)
				.then(updatedPerson => setPersons(persons.map(p => p.id !== id ? p : updatedPerson)))
				.catch(error => setError(`${newPerson.name} has already been removed from the server.`))
		}
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={notification} isError={false} />
			<Notification message={error} isError={true} />
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h1>Add new</h1>
			<PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
				newNum={newNum} handleNumChange={handleNumChange} />
			<h1>Numbers</h1>
			<Persons persons={persons} filter={filter} delPerson={delPerson}/>
		</div>
	)
}

const Filter = ({ filter, handleFilterChange }) => (
	<div>filter names: <input value={filter} onChange={handleFilterChange} /></div>
)

const Notification = ({ message, isError }) => {
	return message === null ? null : (
		<div className={isError ? 'error' : 'notification'}>
			{message}
		</div>
	)
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNum, handleNumChange }) => (
	<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} onChange={handleNameChange} />
		</div>
		<div>
			number: <input value={newNum} onChange={handleNumChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

const Person = ({ person, delPerson }) => (
	<li className='person'>{person.name} {person.number} <button onClick={() => delPerson(person)}>del</button></li>
)

const Persons = ({ persons, filter, delPerson }) => (
	<ul>{persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(p => <Person key={p.id} person={p} delPerson={delPerson} />)}</ul>
)

export default App