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
