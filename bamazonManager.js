var mysql = require("mysql2");
var inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = require('./db/connection');
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
      if (err) throw err;
      // run the start function after the connection is made to prompt the user
      displayOptions();
    });


var displayOptions = function(){

    inquirer.prompt([
        {
          type: "list",
          name: "options",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
      
      ]).then(function(answer) {
      
        switch (answer.options) {
            case "View Products for Sale":
                viewProducts()
                break

            case "View Low Inventory":
                viewLowInventory()
                break

            case "Add to Inventory":
                updateInventory()
                break

            case "Add New Product":
                addNewProduct()
                break

            default: 
                console.log("I don't recognize that option.")
                break
        }
    
      });

}


var viewProducts = function(){
    // the app should list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
      if (err) throw err;

      // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
      console.table(results) 

      displayOptions()
  });
}

var viewLowInventory = function(){
    // should list all items with an inventory count lower than five.
    var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, results) {

      if (err) throw err;

      if (results.length){
          console.table(results)
      } else {
          console.log("No products have a low inventory.")
      }
      
      displayOptions()
    });

}

var updateInventory = function(){
    //  should display a prompt that will let the manager "add more" of any item currently in the store.
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;

      // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
      console.table(results)

      inquirer
      .prompt([
        {
          name: "item_ID",
          type: "input",
          message: "What is the item ID of the item you would like to add invetory to?",
          validate: function(value) {
              if (isNaN(value)) {
                console.log("Enter a number.")
              }
              return true;
            }
        },
        {
          name: "units",
          type: "input",
          message: "How many units would you like to add?",
          validate: function(value) {
            if (isNaN(value)) {
              console.log("Enter a number.")
            }
            return true;
          }
        }
      ])
      .then(function(answer) {
          // when finished prompting, check stock
          var query = connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [answer.units, answer.item_ID],
            function(error) {
              if (error) throw err;
              console.log("Quantity updated successfully!");
              displayOptions()
            }
          );
      });     
  });
}

var addNewProduct = function(){
    // should allow the manager to add a completely new product to the store
    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the name of the product?",
      },
      {
        name: "department",
        type: "input",
        message: "What is the department?",
      },
      {
        name: "price",
        type: "input",
        message: "What is the price?",
        validate: function(value) {
          if (isNaN(value)) {
            console.log("Enter a number.")
          }
          return true;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the quantity?",
        validate: function(value) {
          if (isNaN(value)) {
            console.log("Enter a number.")
          }
          return true;
        }
      }
    ])
    .then(function(answer) {
        
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was created successfully!");
            // re-prompt the user options
            displayOptions()
          }
        );
    });
}