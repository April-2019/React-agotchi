const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')
const User = require('./User.js')




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

const Model = Sequelize.Model
class Pet extends Model {}
Pet.init({
    name: STRING,
    age: INTEGER,
    health: INTEGER,
    happiness: INTEGER,
    type: STRING,
    hunger: INTEGER,
    stage: INTEGER,
    epitaph: STRING
},{
    sequelize,
    modelName: 'pet'
})


Pet.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Pet, {as: 'pets', onDelete: 'cascade', hooks: true})


// const Pet = sequelize.define('pet',{
//     name: {
//         type: STRING,
//     },
//     age: {
//         type: INTEGER,
//     },
//     health: {
//         type: INTEGER
//     },
//     happiness: {
//         type: INTEGER
//     },
//     type:{
//         type: STRING
//     },
//     hunger:{
//         type: INTEGER
//     },
//     stage:{
//         type: INTEGER
//     },
//     user_id:{
//         type: INTEGER
//     },
//     epitaph:{
//         type: STRING
//     }
// })


module.exports = Pet
sequelize.sync()
