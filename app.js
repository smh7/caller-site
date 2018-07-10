const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


// Config
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


const port = process.env.PORT || 8082;

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });

  next();
});
var requestUrl = 'http://localhost:8080/cards';
app.get('/', function(req, res) {
  return request(requestUrl, function (error, response, body) {
    var objCards = {};
    let payload = JSON.parse(response.body);
      if (!error && response.statusCode == 200) {
          objCards = {
            print: payload
          }
          // console.log("this is IT!", objCards); 

          res.render('products', objCards);    // send some response here
      } else {
          console.log("There was an error: ") + response.statusCode;
          console.log(body);
          // res.send(...)     // send some response here
      }
  });
})




app.get("/signup.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.get("/login.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.get("/addcard.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/addcard.html"));
});

// var requestUrlLogin = 'http://localhost:8080/card';
// app.post('/card', function(req, res) {
//   return request(requestUrl, function (error, response, body) {
//     var objCards = {
//         card_img_top: req.body.card_img_top,
//         card_title: req.body.card_title,
//         card_text: req.body.card_title,
//         list_group1: req.body.list_group1,
//         list_group2: req.body.list_group2,
//         list_group3: req.body.list_group3
//       };
//     let payload = JSON.parse(response.body);
//       if (!error && response.statusCode == 200) {
//           objCards = {
//             print: payload
//           }
//           // console.log("this is IT!", objCards); 

//           res.render('products', objCards);    // send some response here
//       } else {
//           console.log("There was an error: ") + response.statusCode;
//           console.log(body);
//           // res.send(...)     // send some response here
//       }
//   });
// })

// app.post("/added", (request, results) => {
//   var track = {
//     product_name: request.body.product_name,
//     image_url: request.body.image_url,
//     product_desc: request.body.product_desc,
//     department_name: request.body.department_name,
//     instock_quantity: request.body.instock_quantity,
//     consumer_price: request.body.consumer_price,
//     business_cost: request.body.business_cost,
//     lifetime_sold: request.body.lifetime_sold
//   };

//   console.log(JSON.stringify(request.body));
//   var sql = `INSERT INTO products SET ?`;
//   let query = connection.query(sql, track, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   })
//   // 
//   results.render('added', {
//     data: 5,
//     product_name: request.body.product_name,
//     image_url: request.body.image_url,
//     product_desc: request.body.product_desc,
//     department_name: request.body.department_name,
//     instock_quantity: request.body.instock_quantity,
//     consumer_price: request.body.consumer_price,
//     business_cost: request.body.business_cost,
//     lifetime_sold: request.body.lifetime_sold
    
//   })
// });

// //------------Adam's management console code -------------//
// app.get('/manager', function (req, res) {
//   var obj = {};
//   let query = connection.query('SELECT * FROM products WHERE instock_quantity > 0 ORDER BY consumer_price DESC', function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('report1', obj);
//     }
//   });
// });

// //------------ Bowden working here -------------//
// app.get('/customer', function (req, res) {
//   var obj = {};
//   let query = connection.query('SELECT * FROM users WHERE user_id=1', function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('customer', obj);

//     }
//   });
// });

// app.get('/motorcars', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND department_name = 'motorcars' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });

// app.get('/groceries', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND department_name = 'groceries' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });

// app.get('/toys', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND department_name = 'toys' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });
// app.get('/jaguar', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND product_name= 'Jaguar' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });
// app.get('/Lambo', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND product_name= 'Lamborghini' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });
// app.get('/Ferrari', function (req, res) {
//   var obj = {};
//   let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND product_name= 'Ferrari' ORDER BY consumer_price DESC", function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//       res.render('products', obj);

//     }
//   });
// });

// app.get("/buy/:productid", function (req, res) {
//   var chosen = req.params.productid;
//   var obj = {}
//   var customerCost = function priceCheck(chosen) {
//     let sql = `SELECT consumer_price FROM products WHERE item_id = ${chosen}`;
//     let query = connection.query(sql, function (err, result) {
//       if (err) {
//         throw err;
//       } else {
//         console.log("input item_id is ",chosen);
//         console.log(result[0].consumer_price);
//         console.log("parseFloat result", parseFloat(result[0].consumer_price))
//         var custCharge =  parseFloat(result[0].consumer_price);
//         console.log("priceCheck returned the value below for product id: ", chosen);
//         console.log(custCharge);
//         console.log("User starts out with this amount",userDollars, "type of is ",typeof(userDollars))
//         console.log("Customer Cost",)
//         if (userDollars - custCharge < 0){
//           console.log("hit insufficient funds condition");
//           res.render('insufficientfunds');
//         }
//         userDollars -= custCharge;
//         console.log("User Dollars should be less now ", userDollars);
      
// ;
//       }
//     });
//   }
//   let sqlquery = `UPDATE products SET instock_quantity = instock_quantity - 1 WHERE item_id = ${chosen}`
//   let query = connection.query(sqlquery, function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       console.log("doing the query for all fields to show decremented qty");
//       let sql2 = `SELECT * FROM products WHERE item_id = ${chosen}`
//       let query = connection.query(sql2, function (err, result) {
//         if (err) {
//           throw err;
//         } else {
//           obj = {
//             print: result
//           };
//           res.render('purchase', obj);
//         }
//       });
//     }
//   })

// });

// function priceCheck(chosen) {
//   let sql = `SELECT consumer_price FROM products WHERE item_id = ${chosen}`;
//   let query = connection.query(sql, function (err, result) {
//     if (err) {
//       throw err;
//     } else {
//       console.log("input item_id is ",chosen);
//       console.log(result[0].consumer_price);
//       console.log("parseFloat result", parseFloat(result[0].consumer_price))
//       return parseFloat(result[0].consumer_price);
//     }
//   });
// }

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});