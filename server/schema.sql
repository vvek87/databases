CREATE DATABASE chat;

USE chat;



/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(14)
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(14)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT PRIMARY KEY,
  text_message VARCHAR(50),
  user_id INT,
  room_id INT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(room_id) REFERENCES rooms(id)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

