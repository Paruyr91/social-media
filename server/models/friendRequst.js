const sequelize = require('./index')
const { Sequelize, Op, Model, DataTypes} = require('sequelize');

const Request= sequelize.define("requests", {

      arefriends:{type:Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue:false
        }      

  });

 module.exports=Request
  
 
 
 


 
    