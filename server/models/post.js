
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')

const Post = sequelize.define("posts", {
    title: {type: DataTypes.STRING,
               allowNull:false,
               validate: {
                len: [2, 150] 
                }
            },
    text: {type: DataTypes.STRING,
               allowNull:true,
               validate: {
               len: [0,550]
                }
            },
    imagedata:{type:Sequelize.JSON,
               allowNull:true,
            },       
  });


module.exports=Post
 
 
  
 


  
    