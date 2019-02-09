var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // connectDB.connect()
      var query = "SELECT users.user_name, messages.text_message, rooms.room_name FROM messages INNER JOIN users ON users.id = messages.user_ID INNER JOIN rooms ON messages.room_ID = rooms.id";

      db.dbConnection.query(query, function(err, rows, fields) {
        if (err) {
          console.log('Error while performing Query.', err);
          callback(err, null);
        } else {
          console.log('rows and fields from get', rows);
          callback(null, rows);
        }
      });
      // db.dbConnection.end();
    }, // a function which produces all the messages
    post: function (message, callback) {
      console.log('test---');
      console.log('message----------', message);
      db.dbConnection.query(`INSERT INTO messages (text_message) VALUES (+ ${message})`, function (err, rows, fields) {
        if (err) {
          console.log('Error while performing Query.', err);
          callback(err, null);
        } else {
          console.log('rows and fields from post ', rows);
          callback(null, rows);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


