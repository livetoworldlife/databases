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
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery('UPDATE account SET balance =balance-1000  WHERE account_number = 101');
    await execQuery('UPDATE account SET balance =balance+1000 WHERE account_number = 102');
    await execQuery('INSERT INTO account_number(change_number, account_number, amount, changed_date, remark) VALUES (1003,101,1000,"2020-06-24 11:00:13","you owe me 1000 €")');
    await execQuery('INSERT INTO account_number(change_number, account_number, amount, changed_date, remark) VALUES (1004,102,1000,"2020-06-24 11:01:25","you owe me 1000 €")');
    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
