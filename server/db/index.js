var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  dialect: 'mysql',
});

db
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Message = db.define('message', {
  'text_message': Sequelize.STRING,
  'room': Sequelize.STRING,
}, {
  timestamps: false
});

Message.sync({force: true});


const User = db.define('user', {
  'user_name': Sequelize.STRING
}, {
  timestamps: false
});

User.sync({force: true});


module.exports = {
  dbConnection: db,
  Message: Message,
  User: User
};
