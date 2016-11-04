Install Node.js and services for database and make some queries via node.js


## Steps

- Install MySQL;

```
npm install mysql;
```

- Create a new file that will be used to insert a record into database

```
touch insert.js
```

- Create a new file that will be used to retreive data

```
touch select.js
```

- Add reference to MySQL using require


```insert.js
var mysql = require('mysql');
```

- Create variable connection to create connection, and use createConnection function and pass options. After that we will be connection to the database.

```
var connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'root',
 database: 'books'
});

connection.connect();
```

- Running the command in terminal

```
node assets/scripts/insert.js
```

It throws an error reffering to:

```
Error: ER_BAD_DB_ERROR: Unknown database 'books'
```

Database needs to be created.

- cd /usr/local/mysql/bin;

- ./mysql -u root -p;

- CREATE DATABASE books;

- Run node assets/scripts/insert.js (no errors);

- Create schema.sql;

```
touch schema.sql
```

Paste the following:

```
CREATE TABLE books(
 id INT PRIMARY KEY AUTO_INCREMENT,
 author VARCHAR(100) NOT NULL,
 title  VARCHAR(100) NOT NULL,
 body   TEXT         NOT NULL
);
```


- SHOW DATABASES;
- USE books;

- Create table within schema.sql for the reference, and paste it in mysql (terminal);

```
CREATE TABLE books(
 id INT PRIMARY KEY AUTO_INCREMENT,
 author VARCHAR(100) NOT NULL,
 title  VARCHAR(100) NOT NULL,
 body   TEXT         NOT NULL
);
```


- SHOW TABLES;

```
+--------------------+
| Tables_in_books    |
+--------------------+
| books              |
+--------------------+
```


- DESCRIBE books;

```
+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| id     | int(11)      | NO   | PRI | NULL    | auto_increment |
| author | varchar(100) | NO   |     | NULL    |                |
| title  | varchar(100) | NO   |     | NULL    |                |
| body   | text         | NO   |     | NULL    |                |
+--------+--------------+------+-----+---------+----------------+
```



- To insert record, create JavaScript object within insert.js;

```
var book = {
 author: 'Carl Sagan',
 title: 'Cosmos',
 body: 'Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.—The Plain Dealer'
};
```

- Instead of using database, use query() method and insert record into database;

```
var query = connection.query('insert into books set ?', book, function(err, result){
 console.log(query.sql);
```

Terminal:

```
~/sgt/excercise-mysql-nodeJS/browser-template-master (master)$ node assets/scripts/insert.js
insert into books set `author` = 'Carl Sagan', `title` = 'Cosmos', `body` = 'Cosmos has 13 heavily illustrated chapters, corresponding to the 13 episodes of the Cosmos television series. In the book, Sagan explores 15 billion years of cosmic evolution and the development of science and civilization. Cosmos traces the origins of knowledge and the scientific method, mixing science and philosophy, and speculates to the future of science. The book also discusses the underlying premises of science by providing biographical anecdotes about many prominent scientists throughout history, placing their contributions into the broader context of the development of modern science.'

- Handle errors and result;

```
var query = connection.query('insert into books set ?', book, function(err, result){
 if(err){
   console.error(err);
   return;
 }
 console.error(result);
});
```


- Run node assets/scripts/insert.js;

```
~/sgt/excercise-mysql-nodeJS/browser-template-master (master)$ node assets/scripts/insert.js

OkPacket {
 fieldCount: 0,
 affectedRows: 2,
 insertId: 1,
 serverStatus: 2,
 warningCount: 0,
 message: '',
 protocol41: true,
 changedRows: 0 }
 ```

- Check MySQL database by running: SELECT * FROM books \G

Books are inserted.

```
*************************** 1. row ***************************
   id: 1
author: Carl Sagan
title: Cosmos
 body: Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.”—The Plain Dealer
*************************** 2. row ***************************
   id: 2
author: William Shakespeare
title: Hamlet
 body: The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet father, the King, and then taken the throne and married Gertrude, Hamles mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption.
```
