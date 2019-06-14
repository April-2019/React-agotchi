const User = require('./models/User.js')
const Pet = require('./models/Pet.js')
const Food = require('./models/Food.js')
const Health = require('./models/Health.js')
const Toy = require('./models/Toy.js')




User.hasMany(Food, {as: 'food', onDelete: 'cascade', hooks: true})
User.sync()
User.hasMany(Pet, {as: 'pets', onDelete: 'cascade', hooks: true})
User.sync()
User.hasMany(Health, {as: 'health', onDelete: 'cascade', hooks: true})
User.sync()
User.hasMany(Toy, {as: 'toys', onDelete: 'cascade', hooks: true})
User.sync()



Toy.belongsTo(User, {foreignKey: 'userId'})
Toy.sync()

Health.belongsTo(User, {foreignKey: 'userId'})
Health.sync()

Food.belongsTo(User, {foreignKey: 'userId'})
Food.sync()

Pet.belongsTo(User, {foreignKey: 'userId'})
Pet.sync()





const users = [
    {
        "name": "S8n",
        "passwordhash": "$2b$10$AcYdJBiI0WhcfrpMyrmwXOSrvcBR/NeJv8JeHzeuJ5S4XWODZQOKa",
        "money": 1000,
        "admin": false
    }
]

const pets = [
    {
        "name": "Satans's Little Helper",
        "age": 4,
        "health": 10,
        "happiness": 10,
        "type": "pikachu",
        "userId": "1",
        "hunger": 5,
        "stage": 2,
        "epitaph": ""
    }
]

const foods = [
    {
        "name": "Good Food",
        "userId": "1",
        "price": 40,
        "filling": 7,
        "healthy": true,
    }
]

const healths = [
    {
        "name": "Soap",
        "userId": "1",
        "incval": 3,
        "price": 15
    }
]

const toys = [
    {
        "name": "Red Ball",
        "userId": "1",
        "fun": 5,
        "price": 20
    },
    {
        "name": "Blue Ball",
        "userId": "1",
        "fun": 5,
        "price": 20
    },
    {
        "name": "Red Ball",
        "userId": "1",
        "fun": 5,
        "price": 20
    }
]

users.forEach(user => User.create(user))
pets.forEach(pet => Pet.create(pet))
foods.forEach(food => Food.create(food))
healths.forEach(health => Health.create(health))
toys.forEach(toy => Toy.create(toy))
