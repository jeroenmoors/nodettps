// Require some modules...
var express     = require('express');
var http        = require('http');

// Create our express application
var app = express();

// Define some routes
app.get('/', function(req, res) {
    res.send("Welcome!");
    
});

// Create a http for our app
var httpServer = http.createServer(app);

httpServer.listen(8000);
