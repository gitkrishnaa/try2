const Sequelize=require("sequelize")
const sequelize_db_connection=require("../database")
 const expenses_model=sequelize_db_connection.define("expenses",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        
        primaryKey:true,
    },
    expenses:{type:Sequelize.STRING,
        allowNull:false,},
    description:{type:Sequelize.STRING,
        allowNull:false,},
        catogary:{
        type:Sequelize.STRING,
        
        allowNull:false,
    },
    user_email_id:{
        type:Sequelize.STRING,
       
        allowNull:false,
    }

    
    
 })

 module.exports=expenses_model;