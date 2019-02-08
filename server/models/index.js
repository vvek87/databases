var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // connectDB.connect()
      db.dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
        if (err) {
          console.log('Error while performing Query.', err);
          callback(err, null);
        } else {
          console.log('rows and fields ', rows);
          callback(null, rows);
        }
      });
      db.dbConnection.end();
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

