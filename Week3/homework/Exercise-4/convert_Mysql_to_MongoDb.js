// this codes convert the tables and columns-rows which got from Mysql-new_world database 
// to collections and fields-documents which are into MondoDb-importedDb database.
const mysql = require('mysql'),
  MongoClient = require('mongodb').MongoClient,
  mongoOptions = { useUnifiedTopology: true },
  url = "mongodb://localhost:27017",
  dbName = "importedDb";

// to get all tables names from Mysql-database
function getMysqlTables(mysqlConnection, callback) {
  mysqlConnection.query("show full tables where Table_Type = 'BASE TABLE';", (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      const tables = [];
      results.forEach((row) => {
        for (let key in row) {
          if (row.hasOwnProperty(key)) {
            if (key.startsWith('Tables_in')) tables.push(row[key]);
          }
        }
      });
      callback(null, tables);
    }
  });
}
// the tables and rows which got from mysql-database, are converted to MondoDb collections
function tableToCollection(mysqlConnection, tableName, mongoCollection, callback) {
  const sql = 'SELECT * FROM ' + tableName + ';';
  mysqlConnection.query(sql, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      if (results.length > 0) {
        mongoCollection.insertMany(results, {}, error => error ? callback(error) : callback(null));
      } else {
        callback(null);
      }
    }
  });
}
// connect to mongoDb
MongoClient.connect(url, mongoOptions, (error, client) => {
  if (error) throw error;

  const MysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
  });
  // connect to Mysql
  MysqlCon.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + MysqlCon.threadId);
  });

  let jobs = 0;
  // convert to mysql data to mongodb data
  getMysqlTables(MysqlCon, (error, tables) => {
    tables.forEach((table) => {
      const db = client.db(dbName);
      const collec = db.collection(table);
      ++jobs;
      tableToCollection(MysqlCon, table, collec, (error) => {
        if (error) throw error;
        --jobs;
      });
    })
  });

  // Waiting for all jobs to complete before closing databases connections.
  const interval = setInterval(() => {
    if (jobs <= 0) {
      clearInterval(interval);
      console.log('done!');
      client.close();
      MysqlCon.end();
    }
  }, 1000);
});