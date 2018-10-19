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

            case "View Low Inventory":
                viewLowInventory()

            case "Add to Inventory":
                updateInventory()

            case "Add New Product":
                addNewProduct()

            default: 
                console.log("I don't recognize that option.")
          
        }
    
      });

}


var viewProducts = function(){

}

var viewLowInventory = function(){

}

var updateInventory = function(){

}

var addNewProduct = function(){

}