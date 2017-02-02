// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");
// Create an instance of the express app.
var app = express();
// Specify the port.
var PORT = process.env.PORT || 3000;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/app/public"));
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
// Routes
// =============================================================
require("./app/routing/htmlroutes.js")(app);
// Initiate the listener.
app.listen(PORT, function () {
    console.log('App listening on Port ' + PORT);
});