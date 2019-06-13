const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER



const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: './database.postgres'
})

const User = sequelize.define('user',{
    name: {
        type: STRING,
    },
    hash: {
        type: STRING,

    },
    salt: {
        type: STRING,
    },
    money: {
        type: INTEGER
    }


})

module.exports = User
sequelize.sync()