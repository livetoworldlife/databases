const util = require('util'),
  mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {


  const QUERY_ALL = ['select name from city where Population > 8000000;',
    'select name from country where name like "%land%";',
    'select name from city where Population between 500000 and 1000000;',
    'select name from country where continent = "Europe";',
    'select name, SurfaceArea from country order by SurfaceArea desc;',
    'select name from city where CountryCode="NLD";',
    'select population from city where name="Rotterdam";',
    'select name, SurfaceArea from country order by SurfaceArea desc limit 10;',
    'select name, population from country order by population desc limit 10;',
    'select sum(population) from city;'
  ];
  connection.connect();

  try {
    let queryExecList = QUERY_ALL.map(query => execQuery(query));
    await Promise
      .all(queryExecList)
      .then(values => console.log(values));
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
