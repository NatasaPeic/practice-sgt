var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'books'
});

connection.connect();


// no arguments are passed besides callback because there isn't a placeholder.
connection.query('select * from books where id = 1', function(err, result){

  if(err){
    console.error(err);
    return;
  }
  console.error(result);
});
