

  var Sequelize = require('sequelize')
    , sequelize = null

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port: 5432,
      host: "ec2-54-155-99-116.eu-west-1.compute.amazonaws.com",
      logging:  false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      },

    })
  
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */



module.exports = sequelize