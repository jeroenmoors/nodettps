// Require some modules...
var express     = require('express');
var path        = require('path');
var fs          = require('fs');
var http        = require('http');
var https       = require('https');

// Store the certificate details for later use
var httpsOptions = {
    key: fs.readFileSync('ssl/nodettps.dev.fluoline.net.key', 'utf8'), 
    cert: fs.readFileSync('ssl/nodettps.dev.fluoline.net.crt', 'utf8'),
    ca: [fs.readFileSync('ssl/geotrust_cross_root_ca.txt', 'utf8'), fs.readFileSync('ssl/rapid_ssl_ca.txt', 'utf8')]
};
                    
// Create our express application
var app = express();

// Define some routes
app.get('/', function(req, res) {
    // Render
    res.send("welcome");
});

// Create a http and https server for our app
var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(8000);
httpsServer.listen(443);
