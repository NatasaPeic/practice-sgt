Install Node.js and services for database and make some queries via node.js


## Steps

1. Install MySQL;

```
npm install mysql;
```

2. Create a new file that will be used to insert a record into database

```
touch insert.js
```

3. Create a new file that will be used to retreive data

```
touch select.js
```

4. Add reference to MySQL using require


```insert.js
var mysql = require('mysql');
```

5. Create variable connection to create connection, and use createConnection function and pass options. After that we will be connection to the database.

```
var connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'root',
 database: 'books'
});

connection.connect();
```

6. Running the command in terminal

```
node assets/scripts/insert.js
```

It throws an error reffering to:

```
Error: ER_BAD_DB_ERROR: Unknown database 'books'
```

Database needs to be created.

7. cd /usr/local/mysql/bin;

8. ./mysql -u root -p;

9. CREATE DATABASE books;

10. Run node assets/scripts/insert.js (no errors);

11. Create schema.sql;

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

12. MySQL in terminal:
- SHOW DATABASES;
- USE books;

13. Create table within schema.sql for the reference, and paste it in mysql (terminal);

```
CREATE TABLE books(
 id INT PRIMARY KEY AUTO_INCREMENT,
 author VARCHAR(100) NOT NULL,
 title  VARCHAR(100) NOT NULL,
 body   TEXT         NOT NULL
);
```


13. SHOW TABLES;

```
+--------------------+
| Tables_in_books    |
+--------------------+
| books              |
+--------------------+
```


14. DESCRIBE books;

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



15. To insert record, create JavaScript object within insert.js;

```
var book = {
 author: 'Carl Sagan',
 title: 'Cosmos',
 body: 'Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.—The Plain Dealer'
};
```

16. Instead of using database, use query() method and insert record into database;

```
var query = connection.query('insert into books set ?', book, function(err, result){
 console.log(query.sql);
```

Terminal:

~/sgt/excercise-mysql-nodeJS/browser-template-master (master)$ node assets/scripts/insert.js
insert into books set `author` = 'Carl Sagan', `title` = 'Cosmos', `body` = 'Magnificent . . . With a lyrical literary style, and a range that touches almost all aspects of human knowledge, Cosmos often seems too good to be true.”—The Plain Dealer'

17. Handle errors and result;

```
var query = connection.query('insert into books set ?', book, function(err, result){
 if(err){
   console.error(err);
   return;
 }
 console.error(result);
});
```


18. Run node assets/scripts/insert.js;

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

19. Check MySQL database by running: SELECT * FROM books \G

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

20.
