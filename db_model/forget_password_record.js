const Sequelize = require("sequelize");
const sequelize_db_connection = require("../database");
const forget_password_request_model = sequelize_db_connection.define("forget_password_recored", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
 
  system_request_id: { type: Sequelize.STRING, allowNull: false },
  email_send_id_by_server:{type: Sequelize.STRING, allowNull: true },
 
  isActive:{
    type: Sequelize.STRING, allowNull: false
  },
  user_email:{
    type: Sequelize.STRING, allowNull: false
  }
 
});

module.exports = forget_password_request_model;

// note ,user id which done transjaction ,so 
//foreign key will be user id,source table name will "user"