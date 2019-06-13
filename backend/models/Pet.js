const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER



// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     storage: './database.postgres'
// })
const sequelize = new Sequelize('reactagotchi','postgres','abcdef',
{
    dialect: 'postgres',
    host: 'localhost'
})


const Pet = sequelize.define('pet',{
    name: {
        type: STRING,
    },
    age: {
        type: INTEGER,
    },
    health: {
        type: INTEGER
    },
    happiness: {
        type: INTEGER
    },
    type:{
        type: STRING
    },
    hunger:{
        type: INTEGER
    },
    stage:{
        type: INTEGER
    },
    user_id:{
        type: INTEGER
    },
    epitaph:{
        type: STRING
    }
})
module.exports = Pet
sequelize.sync()
