var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.send(data);
        }
      });
    },
    post: function (req, res) {
      models.messages.post(req.body, (err, req) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.send({'rows': req.body}); //send 200 request
        }
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.send(rows);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body, (err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.send({'rows': rows});
        }
      });
    }
  }
};

