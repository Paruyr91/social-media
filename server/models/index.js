
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

     

module.exports = sequelize