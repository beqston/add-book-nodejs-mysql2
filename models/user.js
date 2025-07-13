const Sequelize = require('sequelize');
const sequelize = require('../utls/database');

const User = sequelize.define('users', {
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});
module.exports = User;