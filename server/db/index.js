var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".




var dbConnection = mysql.createConnection({
  // host: "localhost",
  user: "root",
  password: "",
  database: "chat"
});


dbConnection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + dbConnection.threadId);
});

// dbConnection.end((err)) {

// };

module.exports = {
  dbConnection: dbConnection
};
