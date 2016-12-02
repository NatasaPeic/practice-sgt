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
