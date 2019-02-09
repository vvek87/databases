var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // connectDB.connect()
      console.log('callback in models messages get -------------', callback);
      var query = "SELECT users.user_name, messages.text_message, rooms.room_name FROM messages INNER JOIN users ON users.id = messages.user_ID INNER JOIN rooms ON messages.room_ID = rooms.id";

      db.dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
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
      console.log('message in messages post---------dsfdsfdsfdsfds', message)
      // console.log('callback in messages post---------', callback)
      db.dbConnection.query('INSERT INTO messages (text_message) VALUES ('+JSON.stringify(message.message)+')', function (err, rows, fields) {
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
    get: function (callback) {
      console.log('callback in models users get ----------------------', callback);

      db.dbConnection.query('SELECT * FROM users', function(err, rows, fields) {
        if (err) {
          console.log('Error while performing Query.', err);
          callback(err, null);
        } else {
          console.log('rows and fields from get', rows);
          callback(null, rows);
        }
      });
    },
    post: function (user, callback) {
      // console.log('user in models users post--------------', user);
      // console.log('callback in models users post----------', callback);
      db.dbConnection.query('INSERT INTO users (user_name) VALUES ('+JSON.stringify(user.username)+')', function (err, rows, fields) {
        if (err) {
          console.log('Error while performing Query.', err);
          callback(err, null);
        } else {
          console.log('rows and fields from post ', rows);
          callback(null, rows);
        }
      });
    }
  }
};


