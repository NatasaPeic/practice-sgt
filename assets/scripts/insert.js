var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'books'
});

connection.connect();

var book = [
  {
      author: 'Carl Sagan',
      title: 'Cosmos',
      body: 'Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.”—The Plain Dealer'
    },
    {
  author: 'William Shakespeare',
  title: 'Hamlet',
  body: 'The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet father, the King, and then taken the throne and married Gertrude, Hamles mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption.'
},
];





// Call query() method and pass sql
// '?' is a special symbol when working with MySQL. It is a placeholder. Instead of manually mapping every column and values, use placeholder and pass to the same query() method to books that we want to insert.
// This method is async, so we pass callback



// Assingning this operation to variable we can access the generated sql using console.log in terminal
// Run node assets/scripts/insert.js

// from terminal with console.log(query.sql)
// ~/sgt/excercise-mysql-nodeJS/browser-template-master (master)$ node assets/scripts/insert.js
// insert into books set `author` = 'Carl Sagan', `title` = 'Cosmos', `body` = 'Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.”—The Plain Dealer'

// result variable holds arguments of how many rows are affected, insert ID etc.
var query = connection.query('insert into books set ?', book, function(err, result){
  // console.log(query.sql);


  // handle errors
  if(err){
    console.error(err);
    return;
  }
  console.error(result);
});
