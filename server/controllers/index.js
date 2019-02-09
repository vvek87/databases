var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('req.body in messages get ------------------------------', req.body);
      models.messages.get((err) => {
        console.log('err in controller messages get --------'. err);
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'text/plain');
          res.send();
        }
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log('req.body in messages post ------------------------------', req.body);
      models.messages.post(req.body, (err, req) => {
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        // console.log('req.body within models.messages.post --------', req.body);
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'application/json');
          res.send({'rows': req.body}); //send 200 request
        }
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('req.body in users get -------------------------', req.body);
      models.users.get((err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'text/plain');
          res.send();
        }
      })
    },
    post: function (req, res) {
      // console.log('req.body in users post ------------------------------', req.body);
      models.users.post(req.body, (err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          res.setHeader('content-type', 'application/json');
          res.send({'rows': req.body}); //req.body
        }
      })
    }
  }
};

