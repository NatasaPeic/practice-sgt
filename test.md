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


```
mysql> SELECT customer_id, SUM(orders.number_of_products * products.price) AS "The total amount purchased"
    ->     FROM orders
    -> LEFT JOIN products
    -> ON products.product_id = orders.product_id
    -> GROUP BY orders.customer_id;
+-------------+----------------------------+
| customer_id | The total amount purchased |
+-------------+----------------------------+
|         501 |                      10.25 |
|         502 |                       9.00 |
|         503 |                       6.25 |
|         504 |                      26.25 |
+-------------+----------------------------+
4 rows in set (0.00 sec)
```

This query also falls into simpliest approach where one customer purchases ceratin number of one item. What if one customer have multiple orders from the same store? We introduce one to many relationship between orders and products. Each customer can have many orders, but an order belongs to a single customer.

```
ALTER TABLE `store`.`customers` ADD COLUMN `order_id` INT NOT NULL  AFTER `number_of_products` ;
```

```
mysql> SELECT * FROM customers;
+------------+------------+------------+-------+----------+------------+--------------------+----------+
| customerID | name       | address    | state | zip_code | phone      | number_of_products | order_id |
+------------+------------+------------+-------+----------+------------+--------------------+----------+
|        501 | Aleksandra | Trapelo    | MA    | 02452    | 6174336003 |                  1 |      101 |
|        502 | Natasa     | Ridge Lane | GA    | 02452    | 4044336003 |                  2 |      102 |
|        503 | XYZ        | Ridge Lane | MA    | 02452    | 4044336003 |                  3 |      102 |
|        504 | ABC        | Trapelo    | MD    | 02452    | 6174336003 |                  4 |      104 |
+------------+------------+------------+-------+----------+------------+--------------------+----------+
4 rows in set (0.00 sec)
```
