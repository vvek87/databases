var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'application/json');
          res.send({'rows': rows});
        }
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('hello------------------------------');
      models.messages.post((err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'application/json');
          res.send({'rows': rows}); //req.body
        }
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

