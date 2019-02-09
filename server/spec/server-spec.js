/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    console.log('within the beforeEach function');
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

       var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        console.log('within the server-spec.js', queryString);

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log('right before the expect')
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text_message).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output a messages from the DB', function(done) {
    // Let's insert a message into the db
       var message = 'Men like you can never change!';
       var room = 'main';
       var queryString = 'INSERT INTO messages (text_message, room) VALUES ('+ JSON.stringify(message) +', '+ JSON.stringify(room) +')';
       var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('message log in spec', messageLog);
        expect(messageLog[0].text_message).to.equal('Men like you can never change!');
        expect(messageLog[0].room).to.equal('main');
        done();
      });
    });
  });

  it('Should output correct room name', function(done) {
    // Let's insert a message into the db
       var message = 'hello!';
       var room = 'lobby';
      //  var queryString = 'INSERT INTO messages (text_message, room) VALUES ('+ JSON.stringify(message) +', '+ JSON.stringify(room) +'), ('+ JSON.stringify(message2) +', '+ JSON.stringify(room) +') ';
      var query = "INSERT INTO messages (text_message, room) VALUES ('hello', 'lobby'), ('hello again!','lobby')";
      //  var message2 = 'hello to you, too!';
      //  var room = 'lobby';
      //  var queryString2 = 'INSERT INTO messages (text_message, room) VALUES ('+ JSON.stringify(message2) +', '+ JSON.stringify(room) +')';
       var queryArgs = [];

      //  var combinedQuery = queryString + ' ; ' + queryString2;
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(query, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('message log in spec', messageLog);
        expect(messageLog[0].room).to.equal('lobby');
        done();
      });
    });
  });


  it('Should output correct user name', function(done) {
    // Let's insert a message into the db

      //  var queryString = 'INSERT INTO messages (text_message, room) VALUES ('+ JSON.stringify(message) +', '+ JSON.stringify(room) +'), ('+ JSON.stringify(message2) +', '+ JSON.stringify(room) +') ';
      var query = "INSERT INTO users (user_name) VALUES ('Aarushi')";
      //  var message2 = 'hello to you, too!';
      //  var room = 'lobby';
      //  var queryString2 = 'INSERT INTO messages (text_message, room) VALUES ('+ JSON.stringify(message2) +', '+ JSON.stringify(room) +')';
       var queryArgs = [];

      //  var combinedQuery = queryString + ' ; ' + queryString2;
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(query, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('message log in spec', messageLog);
        expect(messageLog[0].user_name).to.equal('Valjean');
        done();
      });
    });
  });




});
