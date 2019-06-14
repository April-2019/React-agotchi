const Sequelize = require('sequelize')
const bcrpyt = require('bcrypt')
const Pet = require('./Pet.js')
const Food = require('./Food.js')
const Health = require('./Health.js')
const Toy = require('./Toy.js')




const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER
const BOOLEAN = Sequelize.BOOLEAN
const Model = Sequelize.Model



// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     storage: './database.postgres'
// })
const sequelize = new Sequelize('reactagotchi','postgres','abcdef',
{
    dialect: 'postgres',
    host: 'localhost'
})

class User extends Model {}
User.init({
    name: STRING,
    passwordhash: STRING,
    money: INTEGER,
    admin: BOOLEAN
},{
    sequelize,
    modelName: 'user'
});

// User.hasMany(Food, {as: 'food', onDelete: 'cascade', hooks: true})
// User.hasMany(Pet, {as: 'pets', onDelete: 'cascade', hooks: true})
// User.hasMany(Health, {as: 'health', onDelete: 'cascade', hooks: true})
// User.hasMany(Toy, {as: 'toys', onDelete: 'cascade', hooks: true})



// const User = sequelize.define('user',{
//     name: {
//         type: STRING,
//     },
//     passwordhash: {
//         type: STRING,
//     },
//     money: {
//         type: INTEGER
//     },
//     admin: {
//         type: BOOLEAN
//     }


//const User = sequelize.define('user',{
//    name: {
//        type: STRING,
//    },
//    passwordhash: {
//        type: STRING,
//    },
//    money: {
//        type: INTEGER
//    }
    //,
    //admin: {
    //    type: BOOLEAN
    //}

//})
// })

module.exports = User
sequelize.sync()