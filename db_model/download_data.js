const Sequelize = require("sequelize");
const sequelize_db_connection = require("../database");
const downloadlink_model = sequelize_db_connection.define("download_link", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
 
  link: { type: Sequelize.STRING, allowNull: false },

  user_email:{
    type: Sequelize.STRING, allowNull: false
  }
 
});

module.exports = downloadlink_model;

// note ,user id which done transjaction ,so 
//foreign key will be user id,source table name will "user"