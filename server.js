var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

/*
var connection = mysql.createConnection({
  host: "sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "r6ho0ajn1pca72bc",
  password: "zjgxdankuw1q4yhj",
  database: "lwzcrqmwhqnfvign"
});
*/

if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "root",
    database: "wishes_db"
  });
};


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

});

// Root get route
app.get("/", function(req, res) {

    connection.query("SELECT * FROM wishes;", function(err, data) {
      if (err) throw err;

      // Test it
      // console.log('The solution is: ', data);

      // Test it
      // res.send(data);

      res.render("index", { wishes: data });
    });
});


// Post route -> back to home
app.post("/create", function(req, res) {

    // Test it
    // console.log('You sent, ' + req.body.event);

    // Test it
    // res.send('You sent, ' + req.body.event);

  connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
    if (err) throw err;

    res.redirect("/");
  });

});

app.listen(process.env.PORT || port);
