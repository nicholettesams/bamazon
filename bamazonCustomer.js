var mysql = require("mysql2");
var inquirer = require("inquirer");
const cTable = require("console.table");

const connection = require('./db/connection');

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayItems();
  });


  var  displayItems = function() {
    // query the database for all products
    connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
        if (err) throw err;

        console.table(results)

        checkStock()
             
    });

  }

var checkStock = function() {
    // The app should then prompt users with two messages.
    // The first should ask them the ID of the product they would like to buy.
    // The second message should ask how many units of the product they would like to buy.

    inquirer
    .prompt([
      {
        name: "item_ID",
        type: "input",
        message: "What is the item ID of the item you would like to buy?",
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
        message: "How many units would you like to buy?",
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
        var query = connection.query("SELECT * FROM products WHERE ?", [
          {
            item_id: answer.item_ID
          }
        
        ], function(err, results) {

          if (err) throw err;

          var quantity = parseInt(results[0].stock_quantity)
          var units = parseInt(answer.units)

          if (units > quantity){
              console.log("Insufficient quantity!")
          } else {
              buyProduct(answer.item_ID, units, quantity, results[0].price)
          }
        });

    });
}


var buyProduct = function (item_id, units, starting_quantity, price){

  // updating the SQL database to reflect the remaining quantity.
  var newQuantity = starting_quantity - units
  var totalCost = units * price

  connection.query(
    "UPDATE products SET stock_quantity = ?, product_sales = product_sales + ? WHERE item_id = ?", [newQuantity, totalCost, item_id],
    function(err) {
      if (err) throw err;
      console.log("Order placed successfully!");

      // Once the update goes through, show the customer the total cost of their purchase.
      console.log("Total Cost: $" + totalCost)
      connection.end();
    }
  );
}
