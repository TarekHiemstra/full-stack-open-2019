const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

/*
Set the new Server Discover and Monitoring engine since the old one is
deprecated and will be removed in a future version.
Also fix two other deprecation warnings
See https://mongoosejs.com/docs/deprecations.html
*/
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8,  required: true, unique: true },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
}).plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
