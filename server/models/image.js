
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')
const Image = sequelize.define("images", {
         
    imagedata:{type:Sequelize.JSON,
           allowNull:false,
    },     
  });


 module.exports=Image
 
 
 
 


 
    