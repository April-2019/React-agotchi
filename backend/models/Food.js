const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')
const User = require('./User.js')


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

const Model = Sequelize.Model
class Food extends Model {}
Food.init({
    name: STRING,
    price: INTEGER,
    filling: INTEGER,
    healthy: BOOLEAN
},{
    sequelize,
    modelName: 'food'
})

// Food.belongsTo(User, {foreignKey: 'userId'})


// const Food = sequelize.define('food',{
//     name: {
//         type: STRING,
//     },

//     price: {
//         type: INTEGER
//     },

//     filling:{
//         type: INTEGER
//     },

//     healthy:{
//         type: BOOLEAN
//     },

    // user_id:{
    //     type: INTEGER
    // }
    



module.exports = Food
sequelize.sync()
