
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')

const Coment = sequelize.define("coments", {

    text: {type: DataTypes.STRING,
               allowNull:true,
               validate: {
               len: [1,550]
                }
            }
  });


module.exports=Coment
 
 
  
 


  
    