## TASK #1 continued

- Try out the different joins – left, right, inner and outer

For the purpose of this excercise, I followed example found http://mikehillyer.com/articles/an-introduction-to-database-normalization/ that was recommended as a reading material. I wanted to get familiar with database normalization as well as using inner, outer, full joins.

## Mike’s Bookstore

- Title
- Author
- Author Biography
- ISBN
- Price
- Subject
- Number of Pages
- Publisher
- Publisher Address
- Description
- Review
- Reviewer Name


Typical approach:

```
CREATE DATABASE bookstore;
```

```
CREATE  TABLE `bookstore`.`books` (
  `title` VARCHAR(255) NOT NULL DEFAULT '' ,
  `author` VARCHAR(45) NOT NULL DEFAULT '' ,
  `bio` VARCHAR(45) NOT NULL DEFAULT '' ,
  `ISBN` INT NOT NULL DEFAULT 0 ,
  `subject` VARCHAR(45) NOT NULL DEFAULT '' ,
  `pages` INT NOT NULL DEFAULT 0 ,
  `publisher` VARCHAR(45) NOT NULL DEFAULT '' ,
 );
```

```
INSERT INTO `bookstore`.`books` (`title`, `author`, `bio`, `ISBN`, `subject`, `pages`, `publisher`) VALUES ('Beginning MySQL Database Design and Optimization', 'Chad Russell, Jon Stephens	', 'Chad Russell is a programmer and network administrator who owns his own Internet hosting company., Jon Stephens is a member of the MySQL AB documentation team.	1590593324	', '1590593324	', 'MySQL, Database Design', '520', 'Apress');
```

```
mysql> describe books;
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| ISBN      | int(11)      | NO   | PRI | NULL    |       |
| title     | varchar(255) | NO   |     |         |       |
| author    | varchar(45)  | NO   |     |         |       |
| bio       | varchar(255) | NO   |     |         |       |
| subject   | varchar(45)  | NO   |     |         |       |
| pages     | int(11)      | NO   |     | 0       |       |
| publisher | varchar(45)  | NO   |     |         |       |
+-----------+--------------+------+-----+---------+-------+
8 rows in set (0.00 sec)
```
```
mysql> SELECT * FROM books \G
*************************** 1. row ***************************
  idbooks: 101
    title: Beginning MySQL Database Design
   author: Chad Russell, Jon Stephens
      bio: Chad Russell is a programmer and network administrator who owns his own Internet hosting company., Jon Stephens is a member of the MySQL AB documentation team.	1590593324
     ISBN: 1590593324
  subject: MySQL, Database Design
    pages: 520
publisher: Apress
1 row in set (0.00 sec)
```

Table created this way is subject to several anomalies.

- Insertion anomaly - we cannot list publishers or authors without having a book because the ISBN is a primary key which cannot be NULL
- Deletion anomaly - we cannot delete a book without losing information on the authors and publisher
- Update anomaly - when updating information, such as an author’s name, we must change the data in every row, potentially corrupting data

**Normalization is a part of relational theory, which requires that each relation (AKA table) has a primary key.**

Also, this table is not very efficient with storage and this design does not protect data consistency.

## First Normal Form

The first normal form (or 1NF) requires that the values in each column of a table are atomic. By atomic we mean that there are no sets of values within a column.

One method for bringing a table into first normal form is to separate the entities contained in the table into separate tables. In our case this would result in Book, Author, Subject and Publisher tables.

```
CREATE  TABLE `bookstore`.`book` (
  `ISBN` INT NOT NULL ,
  `title` VARCHAR(255) NOT NULL DEFAULT '' ,
  `pages` INT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`ISBN`) );
```

```
INSERT INTO `bookstore`.`book` (`ISBN`, `title`) VALUES ('1590593324	', 'Beginning MySQL Database Design and Optimization');
```

```
mysql> describe book;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| ISBN  | int(11)      | NO   | PRI | NULL    |       |
| title | varchar(255) | NO   |     |         |       |
| pages | int(11)      | NO   |     | 0       |       |
+-------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

```
mysql> SELECT * FROM book;
+------------+--------------------------------------------------+-------+
| ISBN       | title                                            | pages |
+------------+--------------------------------------------------+-------+
| 1590593324 | Beginning MySQL Database Design and Optimization |   520 |
+------------+--------------------------------------------------+-------+
1 row in set (0.01 sec)
```

```
CREATE  TABLE `bookstore`.`author` (
  `author_ID` INT NOT NULL ,
  `first_name` VARCHAR(45) NOT NULL DEFAULT '' ,
  `last_name` VARCHAR(45) NOT NULL DEFAULT '' ,
  PRIMARY KEY (`author_ID`) );
```

```
INSERT INTO `bookstore`.`author` (`author_ID`, `first_name`, `last_name`) VALUES ('1', 'Chad', 'Russell');
INSERT INTO `bookstore`.`author` (`author_ID`, `first_name`, `last_name`) VALUES ('2', 'Jon', 'Stephens');
INSERT INTO `bookstore`.`author` (`author_ID`, `first_name`, `last_name`) VALUES ('3', 'Mike', 'Hillyer');
```

```
mysql> describe author;
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| author_ID  | int(11)     | NO   | PRI | NULL    |       |
| first_name | varchar(45) | NO   |     |         |       |
| last_name  | varchar(45) | NO   |     |         |       |
+------------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

```
mysql> SELECT * FROM author;
+-----------+------------+-----------+
| author_ID | first_name | last_name |
+-----------+------------+-----------+
|         1 | Chad       | Russell   |
|         2 | Jon        | Stephens  |
|         3 | Mike       | Hillyer   |
+-----------+------------+-----------+
3 rows in set (0.00 sec)
```

```
CREATE  TABLE `bookstore`.`subject` (
  `subject_ID` INT NOT NULL ,
  `name` VARCHAR(45) NOT NULL DEFAULT '' ,
  PRIMARY KEY (`subject_ID`) );
```

```
INSERT INTO `bookstore`.`subject` (`subject_ID`, `name`) VALUES ('1', 'MySQL');
INSERT INTO `bookstore`.`subject` (`subject_ID`, `name`) VALUES ('2', 'Database Design');
```

```
mysql> describe subject;
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| subject_ID | int(11)     | NO   | PRI | NULL    |       |
| name       | varchar(45) | NO   |     |         |       |
+------------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

```
mysql> SELECT * FROM subject;
+------------+-----------------+
| subject_ID | name            |
+------------+-----------------+
|          1 | MySQL           |
|          2 | Database Design |
+------------+-----------------+
2 rows in set (0.00 sec)
```


```
CREATE  TABLE `bookstore`.`publisher` (
  `idpublisher` INT NOT NULL ,
  `name` VARCHAR(45) NOT NULL DEFAULT '' ,
  `address` VARCHAR(45) NOT NULL DEFAULT '' ,
  `city` VARCHAR(45) NOT NULL DEFAULT '' ,
  `state` VARCHAR(45) NOT NULL DEFAULT '' ,
  `zip` INT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`idpublisher`) );
```

```
INSERT INTO `bookstore`.`publisher` (`idpublisher`, `name`, `address`, `city`, `state`) VALUES ('1', 'Appress', '2560 Ninth Street, Station 219', 'Berkeley', 'California');
```

```
mysql> describe publisher;
+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| idpublisher | int(11)     | NO   | PRI | NULL    |       |
| name        | varchar(45) | NO   |     |         |       |
| address     | varchar(45) | NO   |     |         |       |
| city        | varchar(45) | NO   |     |         |       |
| state       | varchar(45) | NO   |     |         |       |
| zip         | int(11)     | NO   |     | 0       |       |
+-------------+-------------+------+-----+---------+-------+
6 rows in set (0.00 sec)
```

mysql> SELECT * FROM publisher;
+-------------+---------+--------------------------------+----------+------------+-----+
| idpublisher | name    | address                        | city     | state      | zip |
+-------------+---------+--------------------------------+----------+------------+-----+
|           1 | Appress | 2560 Ninth Street, Station 219 | Berkeley | California |   0 |
+-------------+---------+--------------------------------+----------+------------+-----+
1 row in set (0.00 sec)
