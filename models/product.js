const Sequelize = require('sequelize');
const sequelize = require('../utls/database');

const Product = sequelize.define('products', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false 
  });
  

module.exports = Product;