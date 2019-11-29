const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0-ufaxg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

/*
Set the new Server Discover and Monitoring engine since the old one is
deprecated and will be removed in a future version.
*/
mongoose.set('useUnifiedTopology', true)

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})


if (process.argv.length === 3) {
  console.log('\nphonebook:')
  Person
    .find({})
    .then(persons=> {
      persons.forEach( person => console.log(`${person.name} ${person.number}`))
      console.log('')
      mongoose.connection.close();
    })
} else {
    person.save().then(response => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
}

