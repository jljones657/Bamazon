var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) {
      throw err;
  }
  else {
      queryAllProducts();
  }
})
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("");
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
      }
      console.log("\n------------------------------------------------\n");
      promptUser(res);
  })
}
function promptUser(res) {
  inquirer.prompt([
      {
      name: "id",
      message: "What is the ID of the product you would like to purchase?"
      },
      {
      name: "quantity",
      message: "\nHow many units of the product would you like to buy?"
      }
  ]).then(function checkStore(answers) {
      for (var i = 0; i < res.length; i++) {
          if (parseInt(answers.id) === res[i].item_id) {
              if (res[i].stock_quantity >= (parseInt(answers.quantity))) {
                  console.log("\norder processing...");
                  
                  var orderCost = parseFloat(res[i].price * answers.quantity);
                  console.log("\n Your order total is: $" + orderCost.toFixed(2));
                  console.log("\n------------------------------------------------");
                  
                  var newQuantity = res[i].stock_quantity - (parseInt(answers.quantity));
                  
                  connection.query("UPDATE products SET ? WHERE ?",
                  [{
                      stock_quantity : newQuantity 
                  }, {
                      item_id : answers.id
                  }
                  ], function(error, response) {
                      if (error) console.log(error);
                      else {
                          printUpdatedProducts();
                      }
                  })
              }
              else {
                  console.log("\nI'm sorry we don't have that many products in stock.\n");
                  promptUser(res);
              }
          }
      }
  })
  .catch(function(err) {
      if (err) {
          console.log(err);
      }
  })
}
function printUpdatedProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("");
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].product_name + " | Quantity left: " + res[i].stock_quantity);
      }
      console.log("\n------------------------------------------------\n");
  })
  connection.end();
}