// Require some modules...
var express     = require('express');
var path        = require('path');
var fs          = require('fs');
var http        = require('http');
var https       = require('https');
var tlsSessions = require('strong-cluster-tls-store');

// Require Passport and its BasicStrategy module
var passport        = require('passport');
var BasicStrategy   = require('passport-http').BasicStrategy;


// Store the certificate details for later use
var httpsOptions = {
    key: fs.readFileSync('ssl/nodettps.dev.fluoline.net.key', 'utf8'), 
    cert: fs.readFileSync('ssl/nodettps.dev.fluoline.net.crt', 'utf8'),
    ca: [fs.readFileSync('ssl/geotrust_cross_root_ca.txt', 'utf8'), fs.readFileSync('ssl/rapid_ssl_ca.txt', 'utf8')],
    ciphers: 'ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true    
};
                    
// Create our express application and configure it
var app = express();
app.configure(function() {
    app.use(passport.initialize());
    app.use(app.router);
});

// Initiate Passport for http Basic authentication 
passport.use(new BasicStrategy(
    function(username, password, done) {
        if (username == "admin" && password == "demo") {
            return done(null, "admin");
            //return done("admin", true);
        } else {
            return done(null, false);
        }
    }
));

// Define some routes
app.get('/', function(req, res) {
    res.send("Welcome click <a href=\"/login\">here</a> to login.");
});

app.get('/login', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.send("It is you, " + req.user + "!");
  });

// Create a http and https server for our app
var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

tlsSessions(httpsServer);

httpServer.listen(80);
httpsServer.listen(443);
