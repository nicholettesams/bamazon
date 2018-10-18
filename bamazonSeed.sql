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
('bamazon Kindle', 'Electronics', 99.99, 1000),
('bamazon Echo Dot', 'Electronics', 49.99, 1000),
('bamazon Fire TV', 'Electronics', 69.99, 1000),
('Bluetooth Headset', 'Electronics', 49.99, 200),
('50 Shades of Grey', 'Books', 12.99, 100),
('Office Space', 'Movies', 14.99, 50),
('Sweater', 'Clothing', 99.99, 500),
('Hiking Boots', 'Shoes', 99.99, 500),
('Laptop Computer', 'Electronics', 799.99, 500),
('Power Strip', 'Electronics', 9.99, 100)