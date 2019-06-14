const express = require('express')

const bodyParser = require('body-parser')
const pry = require('pryjs')
const User = require('./models/User.js')
const Pet = require('./models/Pet.js')
const Food = require('./models/Food.js')
const Health = require('./models/Health.js')
const Toy = require('./models/Toy.js')

const app = express()
app.use(bodyParser.json())


app.get('/user', (req, res) => {
    User.findAll()
    .then(user => res.json(user))
})
app.get('/pet', (req, res) => {
    Pet.findAll()
    .then(pet => res.json(pet))
})
app.get('/food', (req, res) => {
    Food.findAll()
    .then(food => res.json(food))
})
app.get('/health', (req, res) => {
    Health.findAll()
    .then(health => res.json(health))
})
app.get('/toy', (req, res) => {
    Toy.findAll()
    .then(toy => res.json(toy))
})
const port = 8000

app.listen(port, () => {console.log("I am listening at " + port)})

