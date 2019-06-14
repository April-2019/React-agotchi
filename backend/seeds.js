const User = require('./models/User.js')
const Pet = require('./models/Pet.js')
const Food = require('./models/Food.js')
const Health = require('./models/Health.js')
const Toy = require('./models/Toy.js')


User.sync()
Pet.sync()
Food.sync()
Health.sync()
Toy.sync()

const users = [
    {
        "name": "S8n",
        "passwordhash": "$2b$10$AcYdJBiI0WhcfrpMyrmwXOSrvcBR/NeJv8JeHzeuJ5S4XWODZQOKa",
        "money": 1000
    }
]

const pets = [
    {
        "name": "Satans's Little Helper",
        "age": 4,
        "health": 10,
        "happiness": 10,
        "type": "pikachu",
        "user_id": 1,
        "hunger": 5,
        "stage": 2,
        "epitaph": ""
    }
]

const foods = [
    {
        "name": "Good Food",
        "user_id": 1,
        "price": 40,
        "filling": 7,
        "healthy": true,
    }
]

const healths = [
    {
        "name": "Soap",
        "user_id": 1,
        "incval": 3,
        "price": 15
    }
]

const toys = [
    {
        "name": "Red Ball",
        "user_id": 1,
        "fun": 5,
        "price": 20
    }
]

users.forEach(user => User.create(user))
pets.forEach(pet => Pet.create(pet))
foods.forEach(food => Food.create(food))
healths.forEach(health => Health.create(health))
toys.forEach(toy => Toy.create(toy))
