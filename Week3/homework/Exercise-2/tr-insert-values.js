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

  const INSERT_ACCOUNT_TABLE = `INSERT INTO account(account_number,balance)
  VALUES (101,5000),(102,5000),(103,3000),(104,4000);`;

  const INSERT_ACCOUNT_CHANGES_TABLE = `INSERT INTO account_number(change_number, account_number, amount, changed_date, remark)
  VALUES (1001,103,50,"2020-06-12 11:12:13","debt money"),
  (1002,104,150,"2020-06-13 12:13:14","for rent house");`;

  connection.connect();

  try {
    await execQuery(INSERT_ACCOUNT_TABLE);
    await execQuery(INSERT_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();