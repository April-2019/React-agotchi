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
//-------------------------------------------
//Get request methods for ALL of a model
//-------------------------------------------


app.get('/users', (req, res) => {
    User.findAll()
    .then(user => res.json(user))
})
app.get('/pets', (req, res) => {
    Pet.findAll()
    .then(pet => res.json(pet))
})
app.get('/foods', (req, res) => {
    Food.findAll()
    .then(food => res.json(food))
})
app.get('/healths', (req, res) => {
    Health.findAll()
    .then(health => res.json(health))
})
app.get('/toys', (req, res) => {
    Toy.findAll()
    .then(toy => res.json(toy))
})

//--------------------------------------
//Get request methods for ONE model
//--------------------------------------


app.get('/users/:id', (req, res) => {
    // eval(pry.it)
    User.findByPk(req.params.id)
    .then(user => res.json(user))

})
app.get('/pets/:id', (req, res) => {
    // eval(pry.it)
    Pet.findByPk(req.params.id)
    .then(pet => res.json(pet))
})
app.get('/foods/:id', (req, res) => {
    // eval(pry.it)
    Food.findByPk(req.params.id)
    .then(beans => res.json(beans))

})

app.get('/healths/:id', (req, res) => {
    // eval(pry.it)
    Health.findByPk(req.params.id)
    .then(health => res.json(health))

})

app.get('/toys/:id', (req, res) => {
    // eval(pry.it)
    Toy.findByPk(req.params.id)
    .then(toy => res.json(toy))

})



//-----------------
//Post to API (!!! Persisting Data !!!)
//-----------------


// Turned off for the time being, DO NOT DELETE PLEASE~~~~~~
app.post('/users', async (req, res) => {
    // eval(pry.it)
    let user = await User.create(req.body)
    res.json(user)
})
// Turned off for the time being, DO NOT DELETE PLEASE~~~~~~




app.post('/pets', async (req, res) => {
    // eval(pry.it)
    let pet = await Pet.create(req.body)
    res.json(pet)
})
app.post('/foods', async (req, res) => {
    // eval(pry.it)
    let bean = await Food.create(req.body)
    res.json(bean)
})
app.post('/healths', async (req, res) => {
    // eval(pry.it)
    let health = await Health.create(req.body)
    res.json(health)
})
app.post('/toys', async (req, res) => {
    // eval(pry.it)
    let toy = await Toy.create(req.body)
    res.json(toy)
})

//----------------------------------------------
// Updating API (!!! Persisting Data !!!)
//----------------------------------------------


app.patch('/users/:id', async (req, resp) => {
    let user = await User.findByPk(req.params.id)
    await user.update(req.body)
    resp.json(user)
})

app.patch('/pets/:id', async (req, resp) => {
    let pet = await Pet.findByPk(req.params.id)
    await pet.update(req.body)
    resp.json(pet)
})

//---------------------------------------------
//Delete info from API (CANNOT DELETE PET!!!)
//---------------------------------------------


app.delete('/users/:id', async (req, res) => {
    let user = await User.findByPk(req.params.id)
    user.destroy()
})

app.delete('/foods/:id', async (req, res) => {
    let food = await Food.findByPk(req.params.id)
    food.destroy()
})

app.delete('/healths/:id', async (req, res) => {
    let health = await Health.findByPk(req.params.id)
    health.destroy()
})

app.delete('/toys/:id', async (req, res) => {
    let toy = await Toy.findByPk(req.params.id)
    toy.destroy()
})



const port = 8000

app.listen(port, () => {console.log("I am listening at " + port)})

