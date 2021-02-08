const User = require('./user')
const Profilepic = require('./profpic')
const Image= require('./image')
const Post=require('./post')
const Coment=require('./coment')
const Like=require('./like')

Image.belongsTo(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Image,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Profilepic.belongsTo(Image,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Image.hasOne( Profilepic,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Profilepic.belongsTo(User,{
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
User.belongsToMany(User,{
  as: 'Friends', 
  through: 'friends'
  });
User.belongsToMany(User,{ 
  as: 'FromId', 
  through: 'friendRequests',
  foreignKey: 'ToId',
  onDelete: 'CASCADE'
  });
User.belongsToMany(User,{ 
  as: 'ToId',
  through: 'friendRequests',
  foreignKey: 'FromId',
  onDelete: 'CASCADE'
});
Post.belongsTo(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Post,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Coment.belongsTo(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Coment,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Coment.belongsTo(Post,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Post.hasMany(Coment,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Like.belongsTo(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Like,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Like.belongsTo(Post,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Post.hasMany(Like,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Like.belongsTo(Image,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Image.hasMany(Like,{
  foreignKey: {
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

 
Profilepic.sync({ alter: true })  
User.sync({ alter: true }) 
Image.sync({ alter: true }) 
Post.sync({ alter: true }) 
Coment.sync({ alter: true }) 
Like.sync({ alter: true }) 

const DB={
  User:User,
  Image:Image,
  Profilepic:Profilepic,
  Post:Post,
  Coment:Coment,
  Like:Like
}
  
module.exports = DB