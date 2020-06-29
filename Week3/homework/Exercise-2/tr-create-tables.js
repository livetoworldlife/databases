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
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT NOT NULL,
      balance INT NOT NULL,
      PRIMARY KEY (account_number)
    );`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
  CREATE TABLE IF NOT EXISTS account_number(
    change_number INT NOT NULL,
    account_number INT NOT NULL,
    amount INT NOT NULL,
    changed_date DATETIME NOT NULL,
    remark TEXT NOT NULL,
    CONSTRAINT FK_Account FOREIGN KEY (account_number) REFERENCES account(account_number),
    PRIMARY KEY(change_number)
  );`;

  connection.connect();

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();