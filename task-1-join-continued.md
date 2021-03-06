## TASK #4

- Remove the quantity and customer_id from the products table. Also insert a product_id field.

```
ALTER TABLE `store`.`products` DROP COLUMN `customer_id` , DROP COLUMN `quantity` , ADD COLUMN `product_id` INT(10) NOT NULL DEFAULT 0  AFTER `price`
, DROP INDEX `customer_id` ;
```


```
UPDATE `store`.`products` SET `product_id`='1' WHERE `productID`='1';
UPDATE `store`.`products` SET `product_id`='1' WHERE `productID`='2';
UPDATE `store`.`products` SET `product_id`='2' WHERE `productID`='3';
UPDATE `store`.`products` SET `product_id`='1' WHERE `productID`='4';
UPDATE `store`.`products` SET `product_id`='3' WHERE `productID`='5';
UPDATE `store`.`products` SET `product_id`='3' WHERE `productID`='6';
```

```
mysql> SELECT * FROM products;
+-----------+--------------+--------+--------+------------+
| productID | product_CODE | name   | price  | product_id |
+-----------+--------------+--------+--------+------------+
|         1 | PEN          | Blue   |   1.25 |          1 |
|         2 | PEN          | Red    |   2.25 |          2 |
|         3 | NOTEBOOK     | Blank  |   5.25 |          3 |
|         4 | MARKER       | Yellow |   3.25 |          4 |
|         5 | PAPER        | White  |   1.25 |          5 |
|         6 | DESK         | Brown  | 100.25 |          6 |
+-----------+--------------+--------+--------+------------+
6 rows in set (0.00 sec)
```


- Create a new table orders with fields order_id, customer_id, product_id, number_of_products. Populate with some data. Eg.
In amazon you can order several products and multiple numbers of each product.

Typical approach:

```
CREATE  TABLE `store`.`orders` (
  `order_id` INT NOT NULL ,
  `customer_id` INT NOT NULL ,
  `product_id` INT NOT NULL ,
  `number_of_products` INT NOT NULL ,
  PRIMARY KEY (`order_id, customer_id, product_id`) );
```

If a primary key consists of two or more columns it is called a composite primary key. The pair ('order_id, customer_id, product_id') must then be unique for the table and neither value can be NULL.

```
INSERT INTO `store`.`orders` (`order_id`, `customerID`, `product_id`, `number_of_products`) VALUES ('101', '501', '7', '1');
INSERT INTO `store`.`orders` (`order_id`, `customerID`, `product_id`, `number_of_products`) VALUES ('102', '503', '2', '4');
INSERT INTO `store`.`orders` (`order_id`, `customerID`, `product_id`, `number_of_products`) VALUES ('103', '502', '1', '5');
INSERT INTO `store`.`orders` ( `order_id`, `customerID`, `product_id`, `number_of_products`) VALUES ( '104', '504', '7', '5');
```

```
mysql> SELECT * FROM orders;
+----------+-------------+------------+--------------------+
| order_id | customer_id | product_id | number_of_products |
+----------+-------------+------------+--------------------+
|      101 |         501 |          5 |                  1 |
|      102 |         502 |          2 |                  4 |
|      103 |         503 |          1 |                  5 |
|      104 |         504 |          7 |                  5 |
+----------+-------------+------------+--------------------+
4 rows in set (0.00 sec)
```

This is the simpliest example where a customer purchases certain number of only one item per order. What if customer wants to purchase certain number of several items and not just one? We introduce many to many relationship between orders and products.


```
CREATE  TABLE `store`.`orders_products` (
  `order_id` INT NOT NULL ,
  `product_id` INT NOT NULL ,
  PRIMARY KEY (`product_id`) );
```


```
INSERT INTO `store`.`orders_products` (`order_id`, `product_id`) VALUES ('101', '1');
INSERT INTO `store`.`orders_products` (`order_id`, `product_id`) VALUES ('102', '2');
INSERT INTO `store`.`orders_products` (`order_id`, `product_id`) VALUES ('103', '3');
INSERT INTO `store`.`orders_products` (`order_id`, `product_id`) VALUES ('104', '4');
```

```
mysql> SELECT * FROM orders_products;
+----------+------------+
| order_id | product_id |
+----------+------------+
|      101 |          1 |
|      100 |          2 |
|      100 |          3 |
|      104 |          4 |
+----------+------------+
4 rows in set (0.00 sec)
```

Add a foreign key constraint

```
ALTER TABLE orders_products ADD FOREIGN KEY (order_id) REFERENCES orders (order_id);
```

```
ALTER TABLE orders_products ADD FOREIGN KEY (product_id) REFERENCES products (productID);
```

Error.


Ran into this problem twice:

```
SHOW ENGINE INNODB STATUS
```
**LATEST FOREIGN KEY ERROR**

2016-12-03 19:14:57 0x700000dd9000 Error in foreign key constraint of table store/#sql-5e_1d:
FOREIGN KEY (product_id) REFERENCES products (productID):
Cannot find an index in the referenced table where the
referenced columns appear as the first columns, or column types
in the table and the referenced table do not match for constraint.
Note that the internal storage type of ENUM and SET changed in
tables created with >= InnoDB-4.1.12, and such columns in old tables
cannot be referenced by such columns in new tables.
Please refer to http://dev.mysql.com/doc/refman/5.7/en/innodb-foreign-key-constraints.html for correct foreign key definition.


**_Keys have to be the same data types._**


```
ALTER TABLE `store`.`orders_products` CHANGE COLUMN `order_id` `order_id` INT(11) UNSIGNED NOT NULL  , CHANGE COLUMN `product_id` `product_id` INT(11) UNSIGNED NOT NULL  ;
```


```
ALTER TABLE orders_products ADD FOREIGN KEY (product_id) REFERENCES products (productID);
```





![Alt text](img3.png)

Now a customer can purchase certain number of several items per order.


Pracicing querying from 3 tables (orders, products, orders_products)

```
mysql> SELECT products.product_CODE AS `Product code`
    -> FROM orders_products
    -> JOIN products ON orders_products.product_id = products.productID
    -> JOIN orders ON orders_products.order_id = orders.order_id
    -> WHERE products.name = 'Blue';
+--------------+
| Product code |
+--------------+
| PEN          |
+--------------+
1 row in set (0.01 sec)
```


- Create a query which will list for each customer the total amount purchased.

Introducing many to many relationship between products and customers.

```
CREATE  TABLE `store`.`products_customers` (
  `productID` INT NOT NULL ,
  `customerID` INT NOT NULL ,
  PRIMARY KEY (`productID`, `customerID`) );
```


```
INSERT INTO `store`.`products_customers` (`productID`, `customerID`) VALUES ('1', '501');
INSERT INTO `store`.`products_customers` (`productID`, `customerID`) VALUES ('2', '501');
INSERT INTO `store`.`products_customers` (`productID`, `customerID`) VALUES ('3', '502');
INSERT INTO `store`.`products_customers` (`productID`, `customerID`) VALUES ('2', '502');
```

```
mysql> SELECT * FROM products_customers;
+-----------+------------+
| productID | customerID |
+-----------+------------+
|         1 |        501 |
|         2 |        501 |
|         2 |        502 |
|         3 |        502 |
+-----------+------------+
4 rows in set (0.00 sec)
```

Add a foreign key constraint:

```
ALTER TABLE products_customers ADD FOREIGN KEY (productID) REFERENCES products (productID);
```
```
ALTER TABLE `store`.`customers` CHANGE COLUMN `customerID` `customerID` INT(10) NOT NULL;
```
```
ALTER TABLE products_customers ADD FOREIGN KEY (customerID) REFERENCES customers (customerID);
```

```
mysql> SELECT customers.name AS `Customer name`, SUM(customers.number_of_products * products.price) AS "The total amount purchased"
    -> FROM products_customers
    -> JOIN products ON products_customers.productID = products.productID
    -> JOIN customers ON products_customers.customerID = customers.customerID
    -> GROUP BY customers.name;
+---------------+----------------------------+
| Customer name | The total amount purchased |
+---------------+----------------------------+
| Aleksandra    |                       3.50 |
| Natasa        |                      15.00 |
+---------------+----------------------------+
2 rows in set (0.00 sec)
```






- Create a query which list all customers who have not bought “white paper”.

Introducing one to many relationship between customers and orders.

```
ALTER TABLE `store`.`customers` ADD COLUMN `order_id` INT NOT NULL  AFTER `number_of_products` ;
```


```
UPDATE `store`.`customers` SET `order_id`='101' WHERE `customerID`='501';
UPDATE `store`.`customers` SET `order_id`='103' WHERE `customerID`='502';
UPDATE `store`.`customers` SET `order_id`='102' WHERE `customerID`='503';
```

```
mysql> SELECT * FROM customers;
+------------+------------+------------+-------+----------+------------+--------------------+----------+
| customerID | name       | address    | state | zip_code | phone      | number_of_products | order_id |
+------------+------------+------------+-------+----------+------------+--------------------+----------+
|        501 | Aleksandra | Trapelo    | MA    | 02452    | 6174336003 |                  1 |      101 |
|        502 | Natasa     | Ridge Lane | GA    | 02452    | 4044336003 |                  2 |      102 |
|        503 | XYZ        | Ridge Lane | MA    | 02452    | 4044336003 |                  3 |      103 |
|        504 | ABC        | Trapelo    | MD    | 02452    | 6174336003 |                  4 |      104 |
+------------+------------+------------+-------+----------+------------+--------------------+----------+
4 rows in set (0.00 sec)
```

```
mysql> SELECT * FROM orders;
+----------+-------------+------------+--------------------+
| order_id | customer_id | product_id | number_of_products |
+----------+-------------+------------+--------------------+
|      101 |         501 |          5 |                  1 |
|      102 |         502 |          2 |                  4 |
|      103 |         503 |          1 |                  5 |
|      104 |         504 |          7 |                  5 |
+----------+-------------+------------+--------------------+
4 rows
```


```
mysql> SELECT DISTINCT customers.name
    -> FROM customers
    -> LEFT JOIN orders
    -> ON customers.order_id = orders.order_id
    -> WHERE NOT (product_id = 7);
+--------+
| name   |
+--------+
| Natasa |
| XYZ    |
| ABC    |
+--------+
3 rows in set (0.00 sec)
```
