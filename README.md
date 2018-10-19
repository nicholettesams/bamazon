# bamazon

## Assignment
Creating an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

## Solution
This is a Node console application with a MySQL database.  

## Technologies
Node, MySQL, Inquirer, Console.Table 

## How to Use
There are 3 javaScript files (bamazonCustomer.js, bamazonManager.js and bamazonSupervisor.js) and the user should run the appropriate file in Node for the functionality that they want to use.

### Customer
Run bamazonCustomer.js to display all prouducts and prompt the user for which item they want to buy.  The user will enter the product Id and the number of items they want to buy.  If there is enough stock, the purchase will go through and the database will be updated.  

![Bamazon Customer Examples](screenshots/customer.jpg?raw=true "Bamazon Customer Examples")

### Manager
Run bamazonManager.js to display options to View Products for Sale, View Low Inventory (items where quantity is less than 5), Add to Inventory and Add New Product.

![Bamazon Manager Examples](screenshots/manager.jpg?raw=true "Bamazon Manager Examples")

![Bamazon Manager Examples](screenshots/manager_products.jpg?raw=true "Bamazon Manager Examples")

![Bamazon Manager Examples](screenshots/manager_lowinventory.jpg?raw=true "Bamazon Manager Examples")

![Bamazon Manager Examples](screenshots/manager_addinventory.jpg?raw=true "Bamazon Manager Examples")

![Bamazon Manager Examples](screenshots/manager_addproduct.jpg?raw=true "Bamazon Manager Examples")

### Supervisor
Run bamazonSupervisor.js to display options to View Product Sales by Department and to Create New Department.

![Bamazon Supervisor Examples](screenshots/supervisor.jpg?raw=true "Bamazon Supervisor Examples")