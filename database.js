// const mysql=require("mysql2")

// const conn=mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"123456",
//     database:'expense_fullstack'
//     })

// module.exports=conn.promise()

const Sequelize=require("sequelize")

const sequelizeConnection=new Sequelize("expense_fullstack","root","123456",{
    dialect:"mysql",
    host:"localhost"
})
// console.log(sequelizeConnection)
module.exports=sequelizeConnection;