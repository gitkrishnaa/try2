const Sequelize = require("sequelize");
const sequelize_db_connection = require("../database");
const product_model = sequelize_db_connection.define("login_user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,

    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  premium_user:{
    type: Sequelize.BOOLEAN,
    
    allowNull: false,
  }
});

module.exports = product_model;
