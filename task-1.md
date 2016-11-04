Install MySQL and become familiar with running some simple sql queries. Use a GA release http://dev.mysql.com/downloads/mysql/


## Steps

1. install MySQL for Mac -- Mac OS X 10.11 (x86, 64-bit), DMG Archive;
2. got a temporary password for root@localhost;
3. start MySQL server via System Preferences;
4. ran the following commands in my terminal in order to set a new password:

- cd /usr/local/mysql/bin;
- ./mysql -u root -p;
- enter temporary password;
- not able to create database, so I set my new password in next step;
- SET PASSWORD FOR 'root'@'localhost' = PASSWORD('****');
- ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;
- exit;
- ./mysql -u root -p;
- mysql> was running properly;


## List of commands and queires

1. SHOW DATABASES;
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

2. CREATE DATABASE practice;
3. SHOW DATABASES
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| practice           |
| sys                |
+--------------------+
```

4. USE practice;
5. CREATE TABLE IF NOT EXISTS products (
    - productID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    - productCode CHAR(3) NOT NULL DEFAULT '',
    - name VARCHAR(30) NOT NULL DEFAULT '',
    - quantity INT UNSIGNED NOT NULL DEFAULT 0,
    - price DECIMAL(7,2) NOT NULL DEFAULT 99999.99,
    - PRIMARY KEY (productID)
    - );



Pulse check:
- INT UNSIGNED - non-negative integers;
-  CHAR(3) - a fixed-length alphanumeric string of 3 characters;
- VARCHAR(30) - a variable-length string of up to 30 characters (variable-length string for name varies);
- DECIMAL(10,2) - a decimal number with 2 decimal places (DECIMAL type is recommended for currency);
- "NOT NULL" specifies that the column cannot contain the NULL value;
- productID as the so-called primary key. Values of the primary-key column must be unique. Every table need a primary key. This ensures that every row can be distinguished from other rows.
- AUTO_INCREMENT. have default starting value of 1. The maximum value of productID column plus 1 would be inserted each time;


6. SHOW TABLES;
```
+--------------------+
| Tables_in_practice |
+--------------------+
| products           |
+--------------------+
```

7. DESCRIBE products;
```
+-------------+------------------+------+-----+----------+----------------+
| Field       | Type             | Null | Key | Default  | Extra          |
+-------------+------------------+------+-----+----------+----------------+
| productID   | int(10) unsigned | NO   | PRI | NULL     | auto_increment |
| productCode | char(3)          | NO   |     |          |                |
| name        | varchar(30)      | NO   |     |          |                |
| quantity    | int(10) unsigned | NO   |     | 0        |                |
| price       | decimal(7,2)     | NO   |     | 99999.99 |                |
+-------------+------------------+------+-----+----------+----------------+
```

8. INSERT INTO products VALUES
    - (NULL, 'PEN', 'Pen Blue',  8000, 1.25),
    - (NULL, 'PEN', 'Pen Black', 2000, 1.25);

    INSERT INTO products VALUES
    - (NULL, 'PEN', 'Pen Blue',  8000, 1.25);

    INSERT INTO products (productCode, name) VALUES ('PEC', 'Pencil HB');

9. SELECT * FROM products;
```
+-----------+-------------+-----------+----------+----------+
| productID | productCode | name      | quantity | price    |
+-----------+-------------+-----------+----------+----------+
|         1 | PEN         | Pen Blue  |     8000 |     1.25 |
|         2 | PEN         | Pen Black |     2000 |     1.25 |
|         3 | PEN         | Pen Blue  |     8000 |     1.25 |
|         4 | PEC         | Pencil HB |        0 | 99999.99 |
+-----------+-------------+-----------+----------+----------+
```

10. DELETE FROM products WHERE productID = 4;

11.  SELECT * FROM products;
```
+-----------+-------------+-----------+----------+-------+
| productID | productCode | name      | quantity | price |
+-----------+-------------+-----------+----------+-------+
|         1 | PEN         | Pen Blue  |     8000 |  1.25 |
|         2 | PEN         | Pen Black |     2000 |  1.25 |
|         3 | PEN         | Pen Blue  |     8000 |  1.25 |
+-----------+-------------+-----------+----------+-------+
```


12. SELECT name, price SELECT products;
```
+-----------+-------+
| name      | price |
+-----------+-------+
| Pen Blue  |  1.25 |
| Pen Black |  1.25 |
| Pen Blue  |  1.25 |
+-----------+-------+
```

13. SELECT name, price FROM products WHERE price > 1.0;
```
+-----------+-------+
| name      | price |
+-----------+-------+
| Pen Blue  |  1.25 |
| Pen Black |  1.25 |
| Pen Blue  |  1.25 |
+-----------+-------+
```

14. SELECT name, price FROM products WHERE quantity <= 2000;
```
+-----------+-------+
| name      | price |
+-----------+-------+
| Pen Black |  1.25 |
+-----------+-------+
```

15. SELECT name, price FROM products WHERE name like 'pen%';
```
+-----------+-------+
| name      | price |
+-----------+-------+
| Pen Blue  |  1.25 |
| Pen Black |  1.25 |
| Pen Blue  |  1.25 |
+-----------+-------+
```

16. SELECT * FROM products WHERE quantity >=5000 AND name LIKE 'Pen %';
```
+-----------+-------------+----------+----------+-------+
| productID | productCode | name     | quantity | price |
+-----------+-------------+----------+----------+-------+
|         1 | PEN         | Pen Blue |     8000 |  1.25 |
|         3 | PEN         | Pen Blue |     8000 |  1.25 |
+-----------+-------------+----------+----------+-------+
```

17. SELECT CONCAT(productCode, ' - ', name) as `Product description`, price FROM products;
```
+---------------------+-------+
| Product description | price |
+---------------------+-------+
| PEN - Pen Blue      |  1.25 |
| PEN - Pen Black     |  1.25 |
| PEN - Pen Blue      |  1.25 |
+---------------------+-------+
```

18. SELECT price FROM products;
```
+-------+
| price |
+-------+
|  1.25 |
|  1.25 |
|  1.25 |
+-------+
```

19. SELECT DISTINCT price as `Distinct Price` FROM products;
```
+----------------+
| Distinct Price |
+----------------+
|           1.25 |
+----------------+
```

20.SELECT DISTINCT price, name FROM products;
```
+-------+-----------+
| price | name      |
+-------+-----------+
|  1.25 | Pen Blue  |
|  1.25 | Pen Black |
+-------+-----------+
```

21. SELECT * FROM products ORDER BY productCode, productID;
```
+-----------+-------------+-----------+----------+-------+
| productID | productCode | name      | quantity | price |
+-----------+-------------+-----------+----------+-------+
|         1 | PEN         | Pen Blue  |     8000 |  1.25 |
|         2 | PEN         | Pen Black |     2000 |  1.25 |
|         3 | PEN         | Pen Blue  |     8000 |  1.25 |
+-----------+-------------+-----------+----------+-------+
```

22. SELECT COUNT(*) as `Count` FROM products;
```
+-------+
| Count |
+-------+
|     3 |
+-------+
```

23. SELECT productCode, COUNT(*) FROM products GROUP BY productCode;
```
+-------------+----------+
| productCode | count(*) |
+-------------+----------+
| PEN         |        3 |
+-------------+----------+
```

24. SELECT MAX(price), MIN(price), AVG(price), STD(price), SUM(quantity)
    -> from products;
```
+------------+------------+------------+------------+---------------+
| max(price) | min(price) | avg(price) | std(price) | sum(quantity) |
+------------+------------+------------+------------+---------------+
|       1.25 |       1.25 |   1.250000 |          0 |         18000 |
+------------+------------+------------+------------+---------------+
```

25. UPDATE products SET price = price * 1.1;

26. SELECT * FROM products;
```
+-----------+-------------+-----------+----------+-------+
| productID | productCode | name      | quantity | price |
+-----------+-------------+-----------+----------+-------+
|         1 | PEN         | Pen Blue  |     8000 |  1.38 |
|         2 | PEN         | Pen Black |     2000 |  1.38 |
|         3 | PEN         | Pen Blue  |     8000 |  1.38 |
+-----------+-------------+-----------+----------+-------+
```


TO DO:
- import csv file and run similar commands;
