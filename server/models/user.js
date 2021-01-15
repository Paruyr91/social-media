
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
    age:{type:DataTypes.INTEGER,
           allowNull:false,
           validate: {
           len: [2],  
           min:{args:16, msg:"enter currect age up 16 "  },
           max:{args:150, msg:"enter currect age "  }
            
          }
    }, 

            
  });
  
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hashSync(user.password,hashNumber);
    user.password = hashedPassword;
  });
 
  

  // User.sync({force:true}) 
 
 

  module.exports=User
 
 
 
 


 
    