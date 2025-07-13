 const {Sequelize} = require('sequelize');
 const sequelize = new Sequelize('node-test', 'root', 'beqston', {
    dialect: 'mysql',
    host: 'localhost'
 });

 module.exports = sequelize;