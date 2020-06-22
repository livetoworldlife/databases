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
  const CREATE_RPAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS Research_Papers (
      paper_id INT AUTO_INCREMENT,
      paper_title VARCHAR(255) NOT NULL,
      conference TEXT NOT NULL,
      publish_date DATE NOT NULL,
      h_index INT NOT NULL,
      genre VARCHAR(255) NOT NULL,
      author_id INT NOT NULL,
      CONSTRAINT FK_Authors FOREIGN KEY (author_id) REFERENCES Authors(author_no),
      PRIMARY KEY (paper_id)
    );`;

  const CREATE_COLLABORATOR_TABLE = `
    CREATE TABLE IF NOT EXISTS Collaborators (
      collaborator_no INT AUTO_INCREMENT,
      collaborator_name VARCHAR(50) NOT NULL,
      gender ENUM('m', 'f') NOT NULL,
      PRIMARY KEY (collaborator_no)
    );`;

  const collaborators = [
    { collaborator_name: 'Mia', gender: 'f' },
    { collaborator_name: 'Saido', gender: 'm' },
    { collaborator_name: 'Charlotte', gender: 'f' },
    { collaborator_name: 'Ahmet', gender: 'm' },
    { collaborator_name: 'Emma', gender: 'f' }
  ]

  const researchPapers = [
    { paper_title: "The great pleasure of Nightmare Abbey", conference: "Shelley", publish_date: '2020-02-11', h_index: 340, genre: 'Fantasy', author_id: 106 },
    { paper_title: "Sybil by Benjamin Disraeli", conference: "Edgar", publish_date: '2009-10-10', h_index: 200, genre: 'Horror', author_id: 103 },
    { paper_title: "The Narrative of Arthur", conference: "Allan", publish_date: '2011-10-10', h_index: 300, genre: 'Novel', author_id: 102 },
    { paper_title: "Gordon Pym of Nantucket", conference: "Poe", publish_date: '2011-02-10', h_index: 400, genre: 'Romance', author_id: 101 },
    { paper_title: "Actions and Adventures", conference: "Supernatural", publish_date: '2001-02-28', h_index: 300, genre: 'Short Stories', author_id: 104 },
    { paper_title: "Fascinated and influenced generations of writers", conference: "Adventure", publish_date: '2007-02-11', h_index: 100, genre: 'Classics', author_id: 105 },
    { paper_title: "Laurence Sterne", conference: "Tristram", publish_date: '1996-12-11', h_index: 940, genre: 'Detective', author_id: 109 },
    { paper_title: "Frankenstein", conference: "Peacock", publish_date: '1990-02-11', h_index: 840, genre: 'Literary Fiction', author_id: 103 },
    { paper_title: "Fielding", conference: "Peacock", publish_date: '1996-02-10', h_index: 490, genre: 'Graphic Novel', author_id: 111 },
    { paper_title: "Gentleman", conference: "Masterpiece", publish_date: '1999-02-11', h_index: 240, genre: 'Mystery', author_id: 108 },
    { paper_title: "The Life and Opinions", conference: "Action", publish_date: '1996-12-30', h_index: 400, genre: 'Action', author_id: 110 },
    { paper_title: "Samuel Richardson", conference: "Henry", publish_date: '2006-02-10', h_index: 190, genre: 'Comic Book', author_id: 112 },
    { paper_title: "Gentleman", conference: "Shelley", publish_date: '2020-02-11', h_index: 340, genre: 'Fantasy', author_id: 113 },
    { paper_title: "Original bite", conference: "Edgar", publish_date: '2019-10-10', h_index: 200, genre: 'Horror', author_id: 114 },
    { paper_title: "Gulliver", conference: "Allan", publish_date: '2011-10-10', h_index: 300, genre: 'Novel', author_id: 115 },
    { paper_title: "Travels", conference: "Poe", publish_date: '2001-02-10', h_index: 400, genre: 'Romance', author_id: 101 },
    { paper_title: "Tragic heroine", conference: "Supernatural", publish_date: '2001-02-28', h_index: 300, genre: 'Short Stories', author_id: 104 },
    { paper_title: "Famous characters", conference: "Adventure", publish_date: '2017-02-11', h_index: 200, genre: 'Classics', author_id: 105 },
    { paper_title: "A story of a man", conference: "Tristram", publish_date: '1996-12-11', h_index: 740, genre: 'Detective', author_id: 109 },
    { paper_title: "Fielding", conference: "Peacock", publish_date: '1997-07-11', h_index: 650, genre: 'Literary Fiction', author_id: 109 },
    { paper_title: "Discover new books", conference: "Peacock", publish_date: '1996-09-10', h_index: 490, genre: 'Graphic Novel', author_id: 102 },
    { paper_title: "Travels", conference: "Masterpiece", publish_date: '1999-09-11', h_index: 240, genre: 'Mystery', author_id: 108 },
    { paper_title: "Robinson Crusoe", conference: "Action", publish_date: '1996-12-30', h_index: 400, genre: 'Action', author_id: 110 },
    { paper_title: "Samuel Richardson II", conference: "Henry", publish_date: '2006-02-10', h_index: 190, genre: 'Comic Book', author_id: 112 },
    { paper_title: "Robinson Crusoe", conference: "Shelley", publish_date: '2020-02-11', h_index: 540, genre: 'Fantasy', author_id: 102 },
    { paper_title: "Clarissa", conference: "Poe", publish_date: '2001-02-10', h_index: 400, genre: 'Romance', author_id: 114 },
    { paper_title: "Clarissa", conference: "Poe", publish_date: '2001-02-10', h_index: 400, genre: 'Romance', author_id: 115 },
    { paper_title: "Clarissa", conference: "Poe", publish_date: '2001-02-10', h_index: 400, genre: 'Romance', author_id: 101 },
    { paper_title: "19th century", conference: "Supernatural", publish_date: '2001-02-28', h_index: 300, genre: 'Short Stories', author_id: 104 },
    { paper_title: "Bunyan’s prose", conference: "Adventure", publish_date: '2017-02-11', h_index: 200, genre: 'Classics', author_id: 105 },
    { paper_title: "A story of a man II", conference: "Tristram", publish_date: '1996-12-11', h_index: 740, genre: 'Detective', author_id: 109 },
  ]

  const authors = [
    { author_no: 101, author_name: "Ersin", university: "HYF", date_of_birth: '1986-10-10', h_index: 10, gender: 'm', Collaborator: 3 },
    { author_no: 102, author_name: "Benno", university: "Amsterdam", date_of_birth: '1996-11-10', h_index: 20, gender: 'm', Collaborator: 1 },
    { author_no: 103, author_name: "Henriata", university: "Twente", date_of_birth: '1980-10-03', h_index: 30, gender: 'm' },
    { author_no: 104, author_name: "Carin", university: "Hengelo", date_of_birth: '1976-10-10', h_index: 40, gender: 'f', Collaborator: 2 },
    { author_no: 105, author_name: "Sabina", university: "Tonka", date_of_birth: '2000-01-10', h_index: 50, gender: 'f', Collaborator: 4 },
    { author_no: 106, author_name: "Hans", university: "Assen", date_of_birth: '1966-10-10', h_index: 60, gender: 'm', Collaborator: 3 },
    { author_no: 107, author_name: "Sergey", university: "Rotherdam", date_of_birth: '1980-11-10', h_index: 70, gender: 'm' },
    { author_no: 108, author_name: "Nazife", university: "Hengelo", date_of_birth: '1986-11-05', h_index: 80, gender: 'f', Collaborator: 5 },
    { author_no: 109, author_name: "Oguz", university: "DeHorizon", date_of_birth: '2015-05-10', h_index: 1, gender: 'm', Collaborator: 2 },
    { author_no: 110, author_name: "Wouter", university: "HYF", date_of_birth: '1984-10-10', h_index: 90, gender: 'm', Collaborator: 5 },
    { author_no: 111, author_name: "Noer", university: "Borne", date_of_birth: '1983-11-10', h_index: 90, gender: 'm', Collaborator: 1 },
    { author_no: 112, author_name: "Nisa", university: "Louren", date_of_birth: '1996-10-10', h_index: 80, gender: 'f', Collaborator: 4 },
    { author_no: 113, author_name: "Martin", university: "Ajax", date_of_birth: '1996-10-10', h_index: 10, gender: 'm', Collaborator: 2 },
    { author_no: 114, author_name: "Messi", university: "Barca", date_of_birth: '1986-10-22', h_index: 10, gender: 'm', Collaborator: 3 },
    { author_no: 115, author_name: "Ava", university: "Twente", date_of_birth: '1956-10-10', h_index: 100, gender: 'f' }
  ]


  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_RPAPERS_TABLE);
    await execQuery(CREATE_COLLABORATOR_TABLE);

    collaborators.forEach(async collaborator => {
      await execQuery('INSERT INTO Collaborators SET ?', collaborator);
    });

    authors.forEach(async author => {
      await execQuery('INSERT INTO Authors SET ?', author);
    });

    researchPapers.forEach(async researchPaper => {
      await execQuery('INSERT INTO Research_Papers SET ?', researchPaper);
    });

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();