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
    var sql = "select d.department_id, d.department_name, d.over_head_costs, sum(p.product_sales) as product_sales, d.over_head_costs - sum(p.product_sales) as total_profit"
    sql += " from bamazon.departments as d INNER JOIN bamazon.products as p ON d.department_name = p.department_name"
    sql += " group by d.department_id, d.department_name, d.over_head_costs"
    
    connection.query(sql, function(err, results) {
      if (err) throw err;

      // first display all of the items available for sale. Include the ids, names, and prices of products for sale.
      for (var i = 0; i < results.length; i++) {
          console.log(results[i].department_id + " " + results[i].department_name + "Overhead: $" + results[i].over_head_costs + " Product Sales: $" + results[i].product_sales + "Profit: $" + results[i].total_profit);
      }
       
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