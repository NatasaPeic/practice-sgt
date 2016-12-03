## TASK #1 continued

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


```
CREATE  TABLE `store`.`orders` (
  `order_id` INT NOT NULL ,
  `customer_id` INT NOT NULL ,
  `product_id` INT NOT NULL ,
  `number_of_products` INT NOT NULL ,
  PRIMARY KEY (`order_id`) );
```

```
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('100', '501', '1', '10');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('101', '501', '4', '2');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('102', '501', '7', '1');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('103', '503', '2', '4');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('104', '503', '6', '1');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('105', '502', '3', '3');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('106', '502', '1', '5');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('107', '504', '7', '5');
INSERT INTO `store`.`orders` (`order_id`, `customer_id`, `product_id`, `number_of_products`) VALUES ('108', '504', '6', '1');
```

```
mysql> SELECT * FROM orders;
+----------+-------------+------------+--------------------+
| order_id | customer_id | product_id | number_of_products |
+----------+-------------+------------+--------------------+
|      100 |         501 |          1 |                 10 |
|      101 |         501 |          4 |                  2 |
|      102 |         501 |          7 |                  1 |
|      103 |         503 |          2 |                  4 |
|      104 |         503 |          6 |                  1 |
|      105 |         502 |          3 |                  3 |
|      106 |         502 |          1 |                  5 |
|      107 |         504 |          7 |                  5 |
|      108 |         504 |          6 |                  1 |
+----------+-------------+------------+--------------------+
9 rows in set (0.00 sec)
```


Create a query which will list for each customer the total amount purchased.

Create a query which list all customers who have not bought “white paper”.

```
INSERT INTO `store`.`products` (`productID`, `product_CODE`, `name`, `price`) VALUES ('7', 'WHITE PAPER', 'White', '10.25');
```
