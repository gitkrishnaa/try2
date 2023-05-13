const Sequelize = require("sequelize");
const sequelize_db_connection = require("../database");
const transaction_model = sequelize_db_connection.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,

    primaryKey: true,
  },
  order_id: { type: Sequelize.STRING, allowNull: false },
  payment_id: { type: Sequelize.STRING, allowNull: true },
  razorpay_signature:{type: Sequelize.STRING, allowNull: true },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status:{
    type: Sequelize.STRING, allowNull: false
  },
  user_email:{
    type: Sequelize.STRING, allowNull: false
  }
 
});

module.exports = transaction_model;

// note ,user id which done transjaction ,so 
//foreign key will be user id,source table name will "user"