// const mysql=require("mysql2")

// const conn=mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"123456",
//     database:'expense_fullstack'
//     })

// module.exports=conn.promise()
require("dotenv").config();

const DB_HOST=process.env.DB_HOST
const DATABASE_DIALECT=process.env.DATABASE_DIALECT
const DATABASE_SCHEMA_NAME=process.env.DATABASE_SCHEMA_NAME
const DB_HOST_PASSWORD=process.env.DATABASE_PASSWORD
const DATABASE_USER_NAME=process.env.DATABASE_USER_NAME
const Sequelize=require("sequelize")

const sequelizeConnection=new Sequelize(DATABASE_SCHEMA_NAME,DATABASE_USER_NAME,DB_HOST_PASSWORD,{
    dialect:DATABASE_DIALECT,
    host:DB_HOST
})
// console.log(sequelizeConnection)
module.exports=sequelizeConnection;