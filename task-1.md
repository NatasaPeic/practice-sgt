## TASK #1

- Install MySQL and become familiar with running some simple sql queries. Use a GA release http://dev.mysql.com/downloads/mysql/


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


## List of commands

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
5. Create table;

```
CREATE TABLE IF NOT EXISTS products (
    -> productID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -> productCode CHAR(3) NOT NULL DEFAULT '',
    -> name VARCHAR(30) NOT NULL DEFAULT '',
    -> quantity INT UNSIGNED NOT NULL DEFAULT 0,
    -> price DECIMAL(7,2) NOT NULL DEFAULT 99999.99,
    -> PRIMARY KEY (productID)
    -> );
```



PULSE CHECK:

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

8. Insert records;
```
INSERT INTO products VALUES
    -> (NULL, 'PEN', 'Pen Blue',  8000, 1.25),
    -> (NULL, 'PEN', 'Pen Black', 2000, 1.25);

    INSERT INTO products VALUES
    -> (NULL, 'PEN', 'Pen Blue',  8000, 1.25);

    INSERT INTO products (productCode, name) VALUES ('PEC', 'Pencil HB');
```

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

27. Delete colum from existing table;

```
ALTER TABLE products DROP COLUMN customer_id;
```


## TASK #1 continued

- Create one more customer table – Customer Name, street number and name, town, state, zip, product_id, numbers_bought. Populate with some data.

- Try out join and group and sort statements. Customers could have bought several items.


Write sample queries for:

1. For each customer, list the total amount spent.
2. For each state list the dollar value of goods sold, sorted alphabetically by amount and then by state.



## STEPS

- download and install MySQL Workbench;
- create new connection `test`;
- create new database `store`
- create new table `products` and populate with some data;

```
CREATE TABLE IF NOT EXISTS products (
         productID    INT(10) UNSIGNED  NOT NULL AUTO_INCREMENT,
         product_CODE CHAR(3)       NOT NULL DEFAULT '',
         name         VARCHAR(30)   NOT NULL DEFAULT '',
         quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
         price        DECIMAL(7,2)  NOT NULL DEFAULT 99999.99,
         PRIMARY KEY  (productID)
       );
```

```
INSERT INTO products (product_CODE, name, quantity, price) VALUES
         ('PEN', 'Blue', 1000, 1.25),
         ('PEN', 'Red', 5000, 2.25);
```

- create new table `customers` and populate with some data;

```
CREATE TABLE customers (
         customerID  INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         name        VARCHAR(30)   NOT NULL DEFAULT '',
		     address     VARCHAR(50)   NOT NULL DEFAULT '',
         state       VARCHAR(5)    NOT NULL DEFAULT '',
         zip_code    VARCHAR(5)   NOT NULL DEFAULT '',
         phone       VARCHAR(20)   NOT NULL DEFAULT '',
         PRIMARY KEY (customerID)
       );
```

```
INSERT INTO customers VALUE
          (501, 'Natasa', 'Ridge Lane', 'MA', '02452', '4044336003'),
          (502, 'Aleksandra', 'Trapelo', 'MA', '02452', '6174336003');
```

- `ALTER TABLE` to add a new column customer_id into the products table;

```
 ALTER TABLE products ADD COLUMN customer_id INT(10) UNSIGNED NOT NULL;
```


- Set the customerID of the existing records in "products" table to a VALID customerID of "customers" table;

```
UPDATE products SET customer_id = 501;
```

Now both records will have the same customer_id.

- add a foreign key constraint on the customer_id columns of the `products` child table to the `customers` parent table, to ensure that every customer_id in the products table always refers to a valid customer_id in the customers table - this is called referential integrity.

```
ALTER TABLE products ADD FOREIGN KEY (customer_id) REFERENCES customers (customerID);
```

```
DESCRIBE products;
```

```
Field	Type	Null	Key	Default	Extra
productID	int(10) unsigned	NO	PRI	NULL	auto_increment
product_CODE	char(3)	NO
name	varchar(30)	NO
quantity	int(10) unsigned	NO		0
price	decimal(7,2)	NO		99999.99
customer_id	int(10) unsigned	NO	MUL	0
```


- Update recodrs to have different customer_id;

```
UPDATE products SET customer_id = 502 WHERE productID  = 3;
```


- populate tables with more data;

```
INSERT INTO customers VALUE
          (503, 'XYZ', 'Ridge Lane', 'MA', '02452', '4044336003'),
          (504, 'ABC', 'Trapelo', 'MA', '02452', '6174336003');
```

```
INSERT INTO products (product_CODE, name, quantity, price, customer_id) VALUES
         ('NOTEBOOK', 'Blank', 500, 5.25, 504),
         ('MARKER', 'Yellow', 1000, 3.25, 504),
		     ('PAPER', 'White', 100, 1.25, 502),
         ('DESK', 'Brown', 5, 100.25, 501);
```

- Update prouctID in prodcuts;

```
UPDATE `store`.`products` SET `productID`='1' WHERE `productID`='2';
UPDATE `store`.`products` SET `productID`='2' WHERE `productID`='3';
UPDATE `store`.`products` SET `productID`='3' WHERE `productID`='8';
UPDATE `store`.`products` SET `productID`='4' WHERE `productID`='9';
UPDATE `store`.`products` SET `productID`='5' WHERE `productID`='10';
```

- For each customer, list the total amount spent.

```
SELECT customers.name, SUM(products.price*products.quantity) AS "Total spent"
FROM products
   INNER JOIN customers
   ON products.customer_id = customers.customerID
   GROUP BY customers.name
```

```
+------------+-------------+
|   name     | Total spent |
+------------+-------------+
|   ABC      | 17125       |
| Aleksandra | 1751.25     |
|  Natasa    | 125         |
+------------+-------------+
```

- Update State column;

```
UPDATE `store`.`customers` SET `state`='GA' WHERE `customerID`='502';
UPDATE `store`.`customers` SET `state`='MD' WHERE `customerID`='504';
```
