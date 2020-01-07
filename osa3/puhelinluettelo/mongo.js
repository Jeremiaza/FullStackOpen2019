const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];

const name = process.argv[3];
const number = process.argv[4];


const url =
    `mongodb+srv://fullstack:${password}@cluster0-q4rkv.mongodb.net/note-app?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)
if (name && number) {
    const person = new Person({
        "name": name,
        "number": number,
        "id": 1
    })

    person.save().then(response => {
        console.log(name+', number '+number+' saved to phonebook!');
        mongoose.connection.close();
    })
}

Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})