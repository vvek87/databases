var mysql = require('mysql');
var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  dialect: 'mysql'
});

  db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const Message = db.define('message', {
    text_message: Sequelize.STRING,
    room: Sequelize.STRING
  })

  const User = db.define('user', {
    user_name: Sequelize.STRING
  })


  console.log('dsfsdfdsfdsfdsfds', Message);
  console.log('hakshdflakjshfkajshfkjahslk', User);

// var User = db.define('User', {
//   username: Sequelize.STRING
// });

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".




// var dbConnection = mysql.createConnection({
//   multipleStatements: true,
//   // host: "localhost",
//   user: "root",
//   password: "",
//   database: "chat"
// });


// dbConnection.connect(function(err) {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }

//     console.log('Connected as id ' + dbConnection.threadId);
// });


module.exports = {
  dbConnection: db
};
