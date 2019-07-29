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
    },
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
    }
  },

  users: {
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