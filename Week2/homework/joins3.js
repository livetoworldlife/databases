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

  const AUTHORS_NAME = `SELECT Authors.author_name,Collaborators.collaborator_name
  FROM Authors
  LEFT JOIN Collaborators
  ON Authors.Collaborator=Collaborators.collaborator_no;`;

  const AUTHORS_PAPER = `SELECT Authors.*, Research_Papers.paper_title
  FROM  Authors
  LEFT JOIN Research_Papers 
  ON Research_Papers.author_id = Authors.author_no;`;

  connection.connect();

  try {
    // call the function that returns promise
    const queryAuthorsName = await execQuery(AUTHORS_NAME);
    console.log(queryAuthorsName);
    console.log("************************************");
    const queryAuthorsPaper = await execQuery(AUTHORS_PAPER);
    console.log(queryAuthorsPaper);

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();