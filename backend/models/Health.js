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
class Health extends Model {}
Health.init({
    name: STRING,
    price: INTEGER,
    incval: INTEGER
},{
    sequelize,
    modelName: 'health'
})

Health.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Health, {as: 'health', onDelete: 'cascade', hooks: true})

// const Health = sequelize.define('health',{
//     name: {
//         type: STRING,
//     },

//     price: {
//         type: INTEGER
//     },

//     incval:{
//         type: INTEGER
//     },

    // user_id:{
    //     type: INTEGER
    // }
    



module.exports = Health
sequelize.sync()



