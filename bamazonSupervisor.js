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
            choices: ["View Product Sales by Department", "Create New Department"]
        }
        
        ]).then(function(answer) {
        
        switch (answer.options) {
            case "View Product Sales by Department":
                viewProducts()
                break

            case "Create New Department":
                addDepartment()
                break

            default: 
                console.log("I don't recognize that option.")
                break
        }
    
        });

}


var viewProducts = function(){
    // the app should list department_id, department_name, over_head_costs, product_sales, total_profit
    var sql = "SELECT d.department_id, d.department_name, d.over_head_costs"
    sql += ", ifnull(sum(p.product_sales), 0) as product_sales"
    sql += ", ifnull(sum(p.product_sales), 0) - d.over_head_costs as total_profit"
    sql += " FROM bamazon.departments as d LEFT JOIN bamazon.products as p ON d.department_name = p.department_name"
    sql += " GROUP BY d.department_id, d.department_name, d.over_head_costs"
    sql += " ORDER BY d.department_name;"
    
    
    connection.query(sql, function(err, results) {
      if (err) throw err;

      // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
      console.table(results);
    
      displayOptions()
  });
}


var addDepartment = function(){
    // should allow the manager to add a completely new product to the store
    inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
      {
        name: "costs",
        type: "input",
        message: "What is the over head costs for the department?",
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
          "INSERT INTO departments SET ?",
          {
            department_name: answer.department,
            over_head_costs: answer.costs
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");
            // re-prompt the user options
            displayOptions()
          }
        );
    });
}