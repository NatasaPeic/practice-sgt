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
| ABC        | 17125.00    |
| Aleksandra | 1751.25     |
| Natasa     | 125.00      |
+------------+-------------+
```
- Update State column;

```
UPDATE `store`.`customers` SET `state`='GA' WHERE `customerID`='502';
UPDATE `store`.`customers` SET `state`='MD' WHERE `customerID`='504';
```


- For each state list the dollar value of goods sold, sorted alphabetically by amount and then by state.

Sorted alphabetically by state:
```
SELECT customers.state, SUM(products.price*products.quantity) AS "Total $ spent per state"
FROM products
   INNER JOIN customers
   ON products.customer_id = customers.customerID
   GROUP BY customers.state ASC;
```


```
+------------+--------------------------+
|   name     | Total $ spent per state  |
+------------+--------------------------+
| GA         |  125.00                  |
| MA         |  1751.25                 |
| MD         |  17125.00                |
+------------+--------------------------+
```
