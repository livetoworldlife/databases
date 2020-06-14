/**

1-What are the names of countries with population greater than 8 million?
select name from city where Population > 8000000;

2-What are the names of countries that have “land” in their names?
select name from country where name like '%land%';

3-What are the names of the cities with population in between 500,000 and 1 million?
select name from city where Population between 500000 and 1000000;

4-What's the name of all the countries on the continent ‘Europe’?
select name from country where continent = 'Europe';

5-List all the countries in the descending order of their surface areas.
select name, SurfaceArea from country order by SurfaceArea desc;

6-What are the names of all the cities in the Netherlands?
select name from city where CountryCode='NLD';

7-What is the population of Rotterdam?
select population from city where name='Rotterdam';

8-What's the top 10 countries by Surface Area?
select name, SurfaceArea from country order by SurfaceArea desc limit 10;

9-What's the top 10 most populated cities?
select name, population from country order by population desc limit 10;

10-What is the population number of the world?
select sum(population) from city;
  const QUERY_1 = 'select name from city where Population > 8000000;';
  const QUERY_2 = 'select name from country where name like "%land%";';
  const QUERY_3 = 'select name from city where Population between 500000 and 1000000;';
  const QUERY_4 = 'select name from country where continent = "Europe";';
  const QUERY_5 = 'select name, SurfaceArea from country order by SurfaceArea desc;';
  const QUERY_6 = 'select name from city where CountryCode="NLD";';
  const QUERY_7 = 'select population from city where name="Rotterdam";';
  const QUERY_8 = 'select name, SurfaceArea from country order by SurfaceArea desc limit 10;';
  const QUERY_9 = 'select name, population from country order by population desc limit 10;';
  const QUERY_10 = 'select sum(population) from city;';

await Promise
      .all([execQuery(QUERY_1), execQuery(QUERY_2), execQuery(QUERY_3), execQuery(QUERY_4), execQuery(QUERY_5), execQuery(QUERY_6), execQuery(QUERY_7), execQuery(QUERY_8), execQuery(QUERY_9), execQuery(QUERY_10)])
      .then(values => console.log(values));

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

*/

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