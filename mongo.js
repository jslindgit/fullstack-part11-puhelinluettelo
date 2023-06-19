const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ge8s59g.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length >= 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
		id: Math.floor(Math.random() * 1000000),
	})

	person.save().then((result) => {
		console.log(
			`added ${person.name} number ${person.number} to phonebook:`,
			result
		)
		mongoose.connection.close()
	})
} else {
	console.log('phonebook:')
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
		process.exit(1) // ohjelma ei jostain syystä lopu ilman tätä - vaikka ylempänä (kun henkilö lisätään), pelkkä mongoose.connection.close() riittää.
	})
}
