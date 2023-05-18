const Sequelize = require("sequelize");
const sequelize_db_connection = require("../database");
const forget_password_request_model = sequelize_db_connection.define("forget_ps_req", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
 
  request_id: { type: Sequelize.STRING, allowNull: false },
  sendinblue_email_send_id:{type: Sequelize.STRING, allowNull: true },
 
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