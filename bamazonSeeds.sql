DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Computers", 1050.50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell Inspiron", "Computers", 1500.50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Levi's Jeans", "Pants", 40.75, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Air", "Computers", 790, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Game Console", 299.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Game Console", 299.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Game Console", 239.95, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Kindle", "E-reader", 119.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1984", "Books", 13.59, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brave New World", "Books", 19.31, 150);