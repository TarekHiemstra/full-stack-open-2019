const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

/*
Set the new Server Discover and Monitoring engine since the old one is
deprecated and will be removed in a future version.
Also set findAndModify() to false, since this is deprecated as well.
See https://mongoosejs.com/docs/deprecations.html
*/
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false);

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
