const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER



const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: './database.postgres'
})

const Pet = sequelize.define('user',{
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
    }
})
module.exports = Pet
sequelize.sync()
