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

  const QUERY_ALL = [
    `SELECT Research_Papers.paper_title, COUNT(Authors.author_name) AS NumberOfAuthor FROM Authors
    LEFT JOIN Research_Papers ON Research_Papers.author_id=Authors.author_no
    GROUP BY paper_title ORDER BY NumberOfAuthor DESC;`,
    'SELECT COUNT(Authors.gender) AS Female_Authors_PP FROM  Authors RIGHT JOIN Research_Papers ON Research_Papers.author_id = Authors.author_no WHERE Authors.gender = "f";',
    'SELECT university,AVG(h_index) AS Avg_h_index FROM Authors GROUP BY university;',
    'SELECT COUNT(Research_Papers.author_id) AS Authors_Count, university FROM  Authors RIGHT JOIN Research_Papers ON Research_Papers.author_id = Authors.author_no GROUP BY university;',
    'SELECT university,MIN(h_index) AS Min_h_index,MAX(h_index) AS Max_h_index FROM Authors GROUP BY university;'
  ];


  connection.connect();

  try {
    let queryExecList = QUERY_ALL.map(query => execQuery(query));
    await Promise
      .all(queryExecList)
      .then(values => console.log(values));

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();