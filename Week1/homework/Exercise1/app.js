const express = require('express'),
  mysql = require('mysql'),
  app = express(),
  hostname = 'localhost',
  port = process.env.PORT || 3000;

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

// Connect
db.connect((err) => {
  if (err) throw err.stack;
  console.log(`MySql Connected...${db.threadId}`);
});

// Create DB if not exists
app.get('/createdb', (req, res) => {
  db.query('DROP DATABASE IF EXISTS meetup');
  let sql = 'CREATE DATABASE meetup';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('meetup database created...');
  });
  db.query('USE meetup');
});

// Create tables
app.get('/createtables', (req, res) => {
  const sqlList = [
    'CREATE TABLE IF NOT EXISTS Invitee(invitee_no int AUTO_INCREMENT, invitee_name VARCHAR(255) default "Ersin", invited_by VARCHAR(255) NOT NULL, PRIMARY KEY(invitee_no))',
    'CREATE TABLE IF NOT EXISTS Room(room_no int AUTO_INCREMENT, room_name VARCHAR(255) NOT NULL, floor_number INT NOT NULL, PRIMARY KEY(room_no))',
    'CREATE TABLE IF NOT EXISTS Meeting(meeting_no int AUTO_INCREMENT, meeting_title VARCHAR(255) default "MYSQL", starting_time DATETIME NOT NULL, ending_time DATETIME NOT NULL, room_no INT NOT NULL, PRIMARY KEY(meeting_no))']

  sqlList.forEach(sql => {
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
  res.send('tables created...');
});

// Insert rows to the table
app.get('/add/:id', (req, res) => {
  let sql = '';
  if (req.params.id === 'invinitee') {
    sql = 'INSERT INTO Invitee VALUES(1, "Fred","Linda"), (2, "Ali","Ayse"), (3, "Hans","Caren"), (4, "Nazife","Ersin"), (5, "Edu","Mike");';
  } else if (req.params.id === 'room') {
    sql = "INSERT INTO Room VALUES(10, 'Room10', 0), (20, 'Room20', 1), (30, 'Room30', 2), (40, 'Room40', 3), (50, 'Room50', 4)";
  } else if (req.params.id === 'meeting') {
    sql = 'INSERT INTO Meeting VALUES(1, "Mysql", "2019-07-01", "2019-07-02", 10), (2, "CSS", "2019-09-01", "2019-09-02", 20), (3, "HTML", "2019-11-01", "2019-11-02", 30), (4, "JavaScript", "2019-07-11", "2019-07-12", 40), (5, "C", "2018-03-21", "2018-03-22", 50);';
  } else {
    return res.send(`${req.params.id} couldn't be added.Input only table name `);
  }
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`${req.params.id} was added...`);
  });
});

// LISTEN TO APP.
app.listen(port, hostname, () => console.log(`Server is running at http://${hostname}:${port}/`));