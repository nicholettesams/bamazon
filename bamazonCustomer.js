var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayItems();
  });


  var  displayItems = function() {
    // query the database for all products
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " " + results[i].product_name);
        }

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

          // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
          var quantity = Number(results[0].stock_quantity)

          if (quantity <= 0){
              console.log("Insufficient quantity!")
              return
          } else {
              buyProduct(answer.item_ID, answer.units, quantity, results[0].price)
          }
        });

    });
}


var buyProduct = function (item_id, units, starting_quantity, price){
  // updating the SQL database to reflect the remaining quantity.
  

  var newQuantity = starting_quantity - units

  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: item_id
      }
    ],
    function(err) {
      if (err) throw err;
      console.log("Order placed successfully!");
      // Once the update goes through, show the customer the total cost of their purchase.
      var totalCost = units * price
      console.log("Total Cost:" + totalCost)
    }
  );
}
