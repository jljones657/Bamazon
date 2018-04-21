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
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
});

// function startMenu() {
//   inquirer.prompt([
//     {
//       name: "action",
//       type: "list",
//       message: "What are you shopping for today?",
//       choices: [
//         "See all products",
//         "Buy Something",
//         "Exit"
//       ]
//     }
//   ]).then (function (action) {
//     switch (action.action) {
//       case "View Products":
//         queryAllProducts();
//     break;

//     case "Buy Something":
//       purchaseItem();
//     break;

//     case "Exit":
//       console.log("\n Thank You for shopping with Bamazon!\n")
//     }
//   })
// }

function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i< res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("--------------------------------------")
    userInput();
  });
  var userInput = function () {
    inquirer.prompt([

      {
        type: "input",
        name: "item_number",
        message: "What is the number of the product you wish to purchase?"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many do you wish to purchase?"
      }

    ]).then(function (answers) {

      // check to see if units purchased is < quantity,     
      var query = connection.query("SELECT * FROM products WHERE item_id=?", answers.item_number, function (err, res) {
        // if yes then update SQL to subtract units purchased
        if (answers.quantity > res[0].stock_quantity) {
          console.log("Order too large. We can not fulfill your order.")
        }
        // if no then console.log("Insufficient quantity!");
        else {
          var query = connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: res[0].stock_quantity - answers.quantity
            },
            {
              item_id: answers.item_number
            }
          ]);
          console.log("Your total cost is $" + answers.quantity * res[0].price.toFixed(2));
        };

      })
    })
  }
}



// function purchaseItem() {
//   inquirer.prompt([
//     {
//       name: "ID",
//       message: "Enter the Product ID to being purchase:"
//   },
//   {
//       name: "quant",
//       message: "How many would you like to buy?"
//   }
//   ]).then( function (custInput){
//     let query = connection.query ("SELECT * FROM products WHERE id=?", custInput.ID, function (err, res){
//         if (err) throw err;
//         if ( !res.length) {
//             console.log("Sorry! I didn't recognize that ID number. Please try again.\n")
//             purchaseItem();
//         }
//         else if (custInput.quant > res[0].quantity) {
//             console.log("Sorry we dont have enough in stock. Please revise your order.\n")
//             purchaseItem();
//         }
//         else {
//             connection.query("UPDATE products SET ? WHERE ?", [
//                 {
//                     quantity: res[0].quantity - custInput.quant,
//                     product_sales: res[0].product_sales + 
//                         (custInput.quant * res[0].price)
//                 },
//                 {
//                     id: custInput.ID
//                 }
//             ]);
//             console.log("Your total is: $" + (custInput.quant * res[0].price))
//         customerMenu();
//         }
//     })
// }) 
// }




