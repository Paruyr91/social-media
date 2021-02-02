const User = require('./user')
const Profilepic = require('./profpic')
const Image= require('./image')


Image.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Image, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Profilepic.belongsTo(Image , {
    foreignKey: {
      allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Image.hasOne( Profilepic, {
    foreignKey: {
      allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  
 Profilepic.belongsTo(User , {
    foreignKey: {
      allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })  
  
 User.hasOne(Profilepic, {
    foreignKey: {  allowNull: true },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) 


User.belongsToMany(User, {
    as: 'Friends', 
    through: 'friends'
  });
User.belongsToMany(User, { 
    as: 'FromId', 
    through: 'friendRequests',
    foreignKey: 'ToId',
    onDelete: 'CASCADE'
  });
User.belongsToMany(User, { 
    as: 'ToId',
    through: 'friendRequests',
    foreignKey: 'FromId',
    onDelete: 'CASCADE'
  });
  

 
Profilepic.sync({ alter: true })  
User.sync({ alter: true }) 
Image.sync({ alter: true }) 



const DB={
  User:User,
  Image:Image,
  Profilepic:Profilepic,

}
  
module.exports = DB