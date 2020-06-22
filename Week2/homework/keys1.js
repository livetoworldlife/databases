const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors (
      author_no INT NOT NULL,
      author_name VARCHAR(50) NOT NULL,
      university TEXT NOT NULL,
      date_of_birth DATE NOT NULL,
      h_index INT NOT NULL,
      gender ENUM('m', 'f') NOT NULL,
      Collaborator INT,
      PRIMARY KEY (author_no)
    );`;

  const ALTER_PK_AUTHORS = `ALTER TABLE Authors
  ADD CONSTRAINT FK_Collaborator FOREIGN KEY (Collaborator) REFERENCES Collaborators(collaborator_no);`;
  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ALTER_PK_AUTHORS);



  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
