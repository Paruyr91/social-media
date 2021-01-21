
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./index')
  const bcrypt=require('bcrypt');
  const hashNumber=10

  const User = sequelize.define("users", {
    email: {type: DataTypes.STRING,
               allowNull:false,
               unique:true,
               validate: {
                   isEmail: true, 
                  async isunique(value) {
                    let olduser= await User.findOne({
                      where: {
                        email:value,
                      }
                    })
                     if(olduser){
                       throw new Error('Email address already in use!');
                     }
                    },
                },
            },

    password: {type: DataTypes.STRING,
               allowNull:false,
               validate: {
               len: [4, 10]
                }
            },
    name: {type:DataTypes.STRING,
           allowNull:false,
           validate: {
           len: [2, 20],
           isAlpha: true,   
           }
    },
    surname:{type:DataTypes.STRING,
           allowNull:false,
           validate: {
           len: [2, 20],
           isAlpha: true,   
           }
    },      
    age:{type: DataTypes.DATE,
           allowNull:true,
           validate: {  
           isDate:{args:true, msg:"enter Date"  },
           isBefore:{args:(new Date((Date.now() - (16*365*24*3600*1000))).toISOString()) , msg:"enter currect age up 16 "  }
            
          }
    }, 
    activated:{type:Sequelize.BOOLEAN, 
               allowNull: false, 
               defaultValue: false
               }

            
  });
  
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hashSync(user.password,hashNumber);
    user.password = hashedPassword;
  });
 
  

  User.sync({force:true}) 
 
 

  module.exports=User
 
 
 
 


 
    