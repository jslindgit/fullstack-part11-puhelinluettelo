const mongoose = require('mongoose')

//const url = `mongodb+srv://fullstack:${password}@cluster0.ge8s59g.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('process.env.MONGDB_URI:', process.env.MONGODB_URI)

console.log('connecting to', url)
mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongDB')
	})
	.catch((error) => {
		console.log('error connecting to MongDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 1,
		required: true,
	},
	id: Number,
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Person', personSchema)
