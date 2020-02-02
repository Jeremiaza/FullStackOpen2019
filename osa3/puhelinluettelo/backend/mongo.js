require('dotenv').config()
const mongoose = require('mongoose')
const name = process.argv[2];
const number = process.argv[3];
const url = process.env.MONGODB_URI;

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
        "id": Math.round(Math.random() * 10000)
    })

    person.save().then(response =>  {
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