const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER
const BOOLEAN = Sequelize.BOOLEAN



const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: './database.postgres'
})

const Food = sequelize.define('user',{
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
