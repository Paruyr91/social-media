// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });



if (!global.hasOwnProperty('db')) {
    const Sequelize = require('sequelize')
     
  
    
      // the application is executed on Heroku ... use the postgres database
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port:5432,
        host:'ec2-54-155-99-116.eu-west-1.compute.amazonaws.com',
        password:"399a201638003a2f8caec463539ef79c511164b04bae414c95892f5237caca66",
        logging: false
      })
    
  
    global.db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
    //   User:      require('./user') 
      // add your other models here
    }
  
    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
  }
  
  module.exports = global.db