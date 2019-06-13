const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER
const BOOLEAN = Sequelize.BOOLEAN



// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     storage: './database.postgres'
// })
const sequelize = new Sequelize('reactagotchi','postgres','abcdef',
{
    dialect: 'postgres',
    host: 'localhost'
})


const Food = sequelize.define('food',{
    name: {
        type: STRING,
    },

    price: {
        type: INTEGER
    },

    filling:{
        type: INTEGER
    },

    healthy:{
        type: BOOLEAN
    },

    user_id:{
        type: INTEGER
    }
    

})

module.exports = Food
sequelize.sync()
