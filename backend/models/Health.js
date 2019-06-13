const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER



const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: './database.postgres'
})

const Health = sequelize.define('user',{
    name: {
        type: STRING,
    },

    price: {
        type: INTEGER
    },

    incval:{
        type: INTEGER
    },

    user_id:{
        type: INTEGER
    }
    

})

module.exports = Health
sequelize.sync()
