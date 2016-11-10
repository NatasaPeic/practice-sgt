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


## TASK #1 continued

- I recall you did a project with CDC data – put this into the database, and see if you can make some queries.

```
CREATE  TABLE `cdc`.`death_rates` (
  `iddeath_rates` INT NOT NULL ,
  `symbol` VARCHAR(45) NOT NULL DEFAULT '' ,
  `date` YEAR NOT NULL DEFAULT 0 ,
  `rate` DECIMAL(4,1) NOT NULL ,
  PRIMARY KEY (`iddeath_rates`) );
```

This csv file doesn't have headers.
```
LOAD DATA LOCAL INFILE '/Users/Buvica/Desktop/death-rate.csv' INTO TABLE death_rates FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

- MySQL Workbench;

```
SELECT symbol, COUNT(*) FROM death_rates GROUP BY symbol;
```
Exported as JSON
```
[
	{
		'symbol' : 'Accidents',
		'COUNT(*)' : 114
	},
	{
		'symbol' : 'Cancer',
		'COUNT(*)' : 114
	},
	{
		'symbol' : 'Heart Disease',
		'COUNT(*)' : 114
	},
	{
		'symbol' : 'Influenza and Pneumonia',
		'COUNT(*)' : 114
	},
	{
		'symbol' : 'Stroke',
		'COUNT(*)' : 114
	}
]
```

```
SELECT MAX(rate) FROM death_rates;
```
Exported as JSON

```
[
	{
		'MAX(rate)' : 612.4
	}
]
```

```
SELECT date, COUNT(*) FROM death_rates GROUP BY date;
```
Exported as JSON
```
[
	{
		'date' : 1901,
		'COUNT(*)' : 6
	},
	{
		'date' : 1902,
		'COUNT(*)' : 5
	},
	{
		'date' : 1903,
		'COUNT(*)' : 5
	},
	{
		'date' : 1904,
		'COUNT(*)' : 5
	},
	{
		'date' : 1905,
		'COUNT(*)' : 5
	},
	{
		'date' : 1906,
		'COUNT(*)' : 5
	},
	{
		'date' : 1907,
		'COUNT(*)' : 5
	},
	{
		'date' : 1908,
		'COUNT(*)' : 5
	},
	{
		'date' : 1909,
		'COUNT(*)' : 5
	},
	{
		'date' : 1910,
		'COUNT(*)' : 5
	},
	{
		'date' : 1911,
		'COUNT(*)' : 5
	},
	{
		'date' : 1912,
		'COUNT(*)' : 5
	},
	{
		'date' : 1913,
		'COUNT(*)' : 5
	},
	{
		'date' : 1914,
		'COUNT(*)' : 5
	},
	{
		'date' : 1915,
		'COUNT(*)' : 5
	},
	{
		'date' : 1916,
		'COUNT(*)' : 5
	},
	{
		'date' : 1917,
		'COUNT(*)' : 5
	},
	{
		'date' : 1918,
		'COUNT(*)' : 5
	},
	{
		'date' : 1919,
		'COUNT(*)' : 5
	},
	{
		'date' : 1920,
		'COUNT(*)' : 5
	},
	{
		'date' : 1921,
		'COUNT(*)' : 5
	},
	{
		'date' : 1922,
		'COUNT(*)' : 5
	},
	{
		'date' : 1923,
		'COUNT(*)' : 5
	},
	{
		'date' : 1924,
		'COUNT(*)' : 5
	},
	{
		'date' : 1925,
		'COUNT(*)' : 5
	},
	{
		'date' : 1926,
		'COUNT(*)' : 5
	},
	{
		'date' : 1927,
		'COUNT(*)' : 5
	},
	{
		'date' : 1928,
		'COUNT(*)' : 5
	},
	{
		'date' : 1929,
		'COUNT(*)' : 5
	},
	{
		'date' : 1930,
		'COUNT(*)' : 5
	},
	{
		'date' : 1931,
		'COUNT(*)' : 5
	},
	{
		'date' : 1932,
		'COUNT(*)' : 5
	},
	{
		'date' : 1933,
		'COUNT(*)' : 5
	},
	{
		'date' : 1934,
		'COUNT(*)' : 5
	},
	{
		'date' : 1935,
		'COUNT(*)' : 5
	},
	{
		'date' : 1936,
		'COUNT(*)' : 5
	},
	{
		'date' : 1937,
		'COUNT(*)' : 5
	},
	{
		'date' : 1938,
		'COUNT(*)' : 5
	},
	{
		'date' : 1939,
		'COUNT(*)' : 5
	},
	{
		'date' : 1940,
		'COUNT(*)' : 5
	},
	{
		'date' : 1941,
		'COUNT(*)' : 5
	},
	{
		'date' : 1942,
		'COUNT(*)' : 5
	},
	{
		'date' : 1943,
		'COUNT(*)' : 5
	},
	{
		'date' : 1944,
		'COUNT(*)' : 5
	},
	{
		'date' : 1945,
		'COUNT(*)' : 5
	},
	{
		'date' : 1946,
		'COUNT(*)' : 5
	},
	{
		'date' : 1947,
		'COUNT(*)' : 5
	},
	{
		'date' : 1948,
		'COUNT(*)' : 5
	},
	{
		'date' : 1949,
		'COUNT(*)' : 5
	},
	{
		'date' : 1950,
		'COUNT(*)' : 5
	},
	{
		'date' : 1951,
		'COUNT(*)' : 5
	},
	{
		'date' : 1952,
		'COUNT(*)' : 5
	},
	{
		'date' : 1953,
		'COUNT(*)' : 5
	},
	{
		'date' : 1954,
		'COUNT(*)' : 5
	},
	{
		'date' : 1955,
		'COUNT(*)' : 5
	},
	{
		'date' : 1956,
		'COUNT(*)' : 5
	},
	{
		'date' : 1957,
		'COUNT(*)' : 5
	},
	{
		'date' : 1958,
		'COUNT(*)' : 5
	},
	{
		'date' : 1959,
		'COUNT(*)' : 5
	},
	{
		'date' : 1960,
		'COUNT(*)' : 5
	},
	{
		'date' : 1961,
		'COUNT(*)' : 5
	},
	{
		'date' : 1962,
		'COUNT(*)' : 5
	},
	{
		'date' : 1963,
		'COUNT(*)' : 5
	},
	{
		'date' : 1964,
		'COUNT(*)' : 5
	},
	{
		'date' : 1965,
		'COUNT(*)' : 5
	},
	{
		'date' : 1966,
		'COUNT(*)' : 5
	},
	{
		'date' : 1967,
		'COUNT(*)' : 5
	},
	{
		'date' : 1968,
		'COUNT(*)' : 5
	},
	{
		'date' : 1969,
		'COUNT(*)' : 5
	},
	{
		'date' : 1970,
		'COUNT(*)' : 5
	},
	{
		'date' : 1971,
		'COUNT(*)' : 5
	},
	{
		'date' : 1972,
		'COUNT(*)' : 5
	},
	{
		'date' : 1973,
		'COUNT(*)' : 5
	},
	{
		'date' : 1974,
		'COUNT(*)' : 5
	},
	{
		'date' : 1975,
		'COUNT(*)' : 5
	},
	{
		'date' : 1976,
		'COUNT(*)' : 5
	},
	{
		'date' : 1977,
		'COUNT(*)' : 5
	},
	{
		'date' : 1978,
		'COUNT(*)' : 5
	},
	{
		'date' : 1979,
		'COUNT(*)' : 5
	},
	{
		'date' : 1980,
		'COUNT(*)' : 5
	},
	{
		'date' : 1981,
		'COUNT(*)' : 5
	},
	{
		'date' : 1982,
		'COUNT(*)' : 5
	},
	{
		'date' : 1983,
		'COUNT(*)' : 5
	},
	{
		'date' : 1984,
		'COUNT(*)' : 5
	},
	{
		'date' : 1985,
		'COUNT(*)' : 5
	},
	{
		'date' : 1986,
		'COUNT(*)' : 5
	},
	{
		'date' : 1987,
		'COUNT(*)' : 5
	},
	{
		'date' : 1988,
		'COUNT(*)' : 5
	},
	{
		'date' : 1989,
		'COUNT(*)' : 5
	},
	{
		'date' : 1990,
		'COUNT(*)' : 5
	},
	{
		'date' : 1991,
		'COUNT(*)' : 5
	},
	{
		'date' : 1992,
		'COUNT(*)' : 5
	},
	{
		'date' : 1993,
		'COUNT(*)' : 5
	},
	{
		'date' : 1994,
		'COUNT(*)' : 5
	},
	{
		'date' : 1995,
		'COUNT(*)' : 5
	},
	{
		'date' : 1996,
		'COUNT(*)' : 5
	},
	{
		'date' : 1997,
		'COUNT(*)' : 5
	},
	{
		'date' : 1998,
		'COUNT(*)' : 5
	},
	{
		'date' : 1999,
		'COUNT(*)' : 5
	},
	{
		'date' : 2000,
		'COUNT(*)' : 5
	},
	{
		'date' : 2001,
		'COUNT(*)' : 5
	},
	{
		'date' : 2002,
		'COUNT(*)' : 5
	},
	{
		'date' : 2003,
		'COUNT(*)' : 5
	},
	{
		'date' : 2004,
		'COUNT(*)' : 5
	},
	{
		'date' : 2005,
		'COUNT(*)' : 5
	},
	{
		'date' : 2006,
		'COUNT(*)' : 5
	},
	{
		'date' : 2007,
		'COUNT(*)' : 5
	},
	{
		'date' : 2008,
		'COUNT(*)' : 5
	},
	{
		'date' : 2009,
		'COUNT(*)' : 5
	},
	{
		'date' : 2010,
		'COUNT(*)' : 5
	},
	{
		'date' : 2011,
		'COUNT(*)' : 5
	},
	{
		'date' : 2012,
		'COUNT(*)' : 5
	},
	{
		'date' : 2013,
		'COUNT(*)' : 5
	}
]
```
