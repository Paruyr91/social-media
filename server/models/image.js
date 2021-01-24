
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')
const User = require('./user')

const Image = sequelize.define("images", {
         
    imagedata:{type:Sequelize.JSON,
           allowNull:false,
    }, 
    profilepic:{type:Sequelize.BOOLEAN, 
               allowNull: false, 
               defaultValue:false
               }

            
  });


  User.hasMany(Image, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Image.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

    
  

// Image.sync({force:true}) 
 
  
 module.exports=Image
 
 
 
 


 
    