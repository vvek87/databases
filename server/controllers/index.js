var models = require('../models');
var db = require('../db');
// var Sequelize = require('sequelize');
// console.log('db----------------------------------', db);
// console.log('db.Message----------------------------------', db.Message);

// module.exports = {
//   messages: {
//     get: function (req, res) {
//       db.Message.sync()
//   .then(function() {
//     // Retrieve objects from the database:
//     return db.Message.findAll();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {} // a function which handles posting a message to the database
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {},
//     post: function (req, res) {}
//   }
// };

module.exports = {
  messages: {
    get: function (req, res) {
      // console.log('req.body in messages get ------------------------------', req.body);
      models.messages.get((err, data) => {
        // console.log('err in controller messages get --------'. err);
        // console.log('data------------------------------', data)
        if (err) {
          console.log('error ', err);
        } else {
          // res.setHeader('content-type', 'text/plain');
          // console.log('data[0].text_message*******', data[0].text_message);
          res.send(data);
        }
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('req.body in messages post ------------------------------', req.body);
      models.messages.post(req.body, (err, req) => {
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        console.log('req.body within models.messages.post --------', req.body);
        if (err) {
          console.log('error ', err);
        } else {
          // res.setHeader('content-type', 'application/json');
          res.send({'rows': req.body}); //send 200 request
        }
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // console.log('req.body in users get -------------------------', req.body);
      models.users.get((err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          // res.setHeader('content-type', 'text/plain');
          res.send(rows);
        }
      })
    },
    post: function (req, res) {
      // console.log('req.body in users post ------------------------------', req.body);
      models.users.post(req.body, (err, rows) => {
        if (err) {
          console.log('error ', err);
        } else {
          // res.setHeader('content-type', 'application/json');
          res.send({'rows': req.body}); //req.body
        }
      })
    }
  }
};

