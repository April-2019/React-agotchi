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


const Toy = sequelize.define('toy',{
    name: {
        type: STRING,
    },

    price: {
        type: INTEGER
    },

    fun:{
        type: INTEGER
    },

    user_id:{
        type: INTEGER
    }
    

})


module.exports = Toy
sequelize.sync()
