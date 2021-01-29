const User = require('./user')
const Profilepic = require('./profpic')
const Image= require('./image')
const Request= require('./friendRequst')



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
    foreignKey: {
      allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) 
  
  
  User.hasMany(Request, {
    foreignKey: {
      name: 'fromId',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
 User.hasMany(Request, {
    foreignKey: {
      name: 'toId',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Request.belongsTo(User, {
    foreignKey: {
      name: 'toId',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Request.belongsTo(User, {
    foreignKey: {
      name:  'fromId',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

Request.sync({ alter: true })  
Profilepic.sync({ alter: true })  

User.sync({ alter: true }) 
Image.sync({ alter: true }) 




const DB={
  User:User,
  Image:Image,
  Profilepic:Profilepic,
  Request:Request

}
  
module.exports = DB