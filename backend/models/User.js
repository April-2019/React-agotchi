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



const User = sequelize.define('user',{
    name: {
        type: STRING,
    },
    passwordhash: {
        type: STRING,
    },
    money: {
        type: INTEGER
    }
    //,
    //admin: {
    //    type: BOOLEAN
    //}

})

module.exports = User
sequelize.sync()