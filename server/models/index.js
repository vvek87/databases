var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.Message.sync()
        .then(function () {
          return db.Message.findAll();
        })
        .then(function (data) {
          callback(null, { results: data });
        })
        .catch(function (err) {
          callback(err, null);
          db.dbConnection.close();
        });
    }, // a function which produces all the messages
    post: function (postData, callback) {
      let message = postData.message;
      let room = postData.roomname;
      db.Message.sync()
        .then(function () {
          return db.Message.create({ 'text_message': message, 'room': room });
        })
        .then(function (data) {
          callback(null, data.dataValues);
        })
        .catch(function (err) {
          callback(err, null);
          db.dbConnection.close();
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.User.sync()
        .then(function () {
          return db.User.findAll();
        })
        .then(function (data) {
          callback(null, { results: data });
        })
        .catch(function (err) {
          callback(err, null);
          db.dbConnection.close();
        });
    },
    post: function (data, callback) {
      let user = data.username;
      db.User.sync()
        .then(function () {
          return db.User.create({ 'user_name': user });
        })
        .then(function (data) {
          callback(null, data.dataValues);
        })
        .catch(function (err) {
          callback(err, null);
          db.dbConnection.close();
        });
    }
  }
};


// module.exports = {
//   messages: {
//     get: function (callback) {
//       // connectDB.connect()
//       console.log('callback in models messages get -------------', callback);
//       var query = "SELECT users.user_name, messages.text_message, rooms.room_name FROM messages INNER JOIN users ON users.id = messages.user_ID INNER JOIN rooms ON messages.room_ID = rooms.id";

//       db.dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
//         if (err) {
//           console.log('Error while performing Query.', err);
//           callback(err, null);
//         } else {
//           console.log('rows and fields from get', rows);
//           callback(null, rows);
//         }
//       });
//       // db.dbConnection.end();
//     }, // a function which produces all the messages
//     post: function (message, callback) {
//       console.log('message in messages post---------dsfdsfdsfdsfds', message)
//       var oldQuery = 'INSERT INTO messages (text_message, roomname) VALUES ('+JSON.stringify(message.message)+', '+JSON.stringify(message.room)+' )';
//       var query = 'INSERT INTO messages (text_message) VALUES ('+JSON.stringify(message.message)+')';

//       db.dbConnection.query(query, function (err, rows, fields) {
//         if (err) {
//           console.log('Error while performing Query.', err);
//           callback(err, null);
//         } else {
//           console.log('rows and fields from post ', rows);
//           callback(null, rows);
//         }
//       });
//     } // a function which can be used to insert a message into the database
//   },

//   users: {
//     // Ditto as above.
//     get: function (callback) {
//       console.log('callback in models users get ----------------------', callback);

//       db.dbConnection.query('SELECT * FROM users', function(err, rows, fields) {
//         if (err) {
//           console.log('Error while performing Query.', err);
//           callback(err, null);
//         } else {
//           // console.log('rows and fields from get', rows);
//           callback(null, rows);
//         }
//       });
//     },
//     post: function (user, callback) {
//       // console.log('user in models users post--------------', user);
//       // console.log('callback in models users post----------', callback);
//       db.dbConnection.query('INSERT INTO users (user_name) VALUES ('+JSON.stringify(user.username)+')', function (err, rows, fields) {
//         if (err) {
//           console.log('Error while performing Query.', err);
//           callback(err, null);
//         } else {
//           console.log('rows and fields from post ', rows);
//           callback(null, rows);
//         }
//       });
//     }
//   }
// };


