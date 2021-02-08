
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')

const Like = sequelize.define("likes", {
    liketype:  {type: DataTypes.STRING,
               allowNull:false,
               validate: {
                isIn: [['like','dislike']],
                }
            }      
  });


module.exports=Like
 
 
  
 


  
    