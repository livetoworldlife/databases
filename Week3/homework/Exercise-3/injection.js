const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});
conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + conn.threadId);
});

/*
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}';`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}
*/


function getPopulation(Country, name, code, cb) {
  // Escaping the parameter ( replacing the unwanted characters)
  const sqlQuery = `SELECT Population FROM ` + Country + ` WHERE Name = ` + conn.escape(name) + `and code = ` + conn.escape(code);
  conn.query(sqlQuery, (err, result) => {
    if (err) cb(err);
    if (result.length == 0) cb(new Error("Not found"));
    cb(null, result[0].Population);
  }
  );
}


/*
function getPopulation(Country, name, code, cb) {
  // Using a question mark syntax to do the escaping
  const sqlQuery = `SELECT Population FROM ` + Country + ` WHERE Name = ? AND code = ?`;
  const whereValues = [name, code];
  conn.query(sqlQuery, whereValues, (err, result) => {
    if (err) cb(err);
    if (result.length == 0) cb(new Error("Not found"));
    cb(null, result[0].Population);
  }
  );
}
*/

getPopulation("country", "Angola' OR 1=1;show full tables;", "", (a, b) => (a === null) ? console.log(b) : console.error(a));


conn.end();
