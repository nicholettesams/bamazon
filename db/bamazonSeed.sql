DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('bamazon Kindle', 'Electronics', 99.99, 100),
('bamazon Echo Dot', 'Electronics', 49.99, 100),
('bamazon Fire TV', 'Electronics', 69.99, 100),
('Bluetooth Headset', 'Electronics', 49.99, 50),
('Where the Sidewalk Ends', 'Books', 12.99, 12),
('Office Space', 'Movies', 14.99, 50),
('Sweater', 'Clothing', 99.99, 20),
('Hiking Boots', 'Shoes', 99.99, 30),
('Laptop Computer', 'Electronics', 799.99, 75),
('Power Strip', 'Electronics', 9.99, 10);


CREATE TABLE departments (
	department_id INT AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id)
);

ALTER TABLE bamazon.products 
ADD COLUMN product_sales DECIMAL(20,2) DEFAULT 0;

INSERT INTO bamazon.departments (department_name, over_head_costs)
VALUES ('Electronics', 1000),
('Books', 5000),
('Movies', 1000),
('Clothing', 1000), 
('Shoes', 1000)
