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
    ca: [   fs.readFileSync('ssl/geotrust_cross_root_ca.txt', 'utf8'), 
            fs.readFileSync('ssl/rapid_ssl_ca.txt', 'utf8'),
            fs.readFileSync('ssl/citizen_ca.txt', 'utf8'),
            fs.readFileSync('ssl/belgium_root_ca.txt', 'utf8')
        ],
    ciphers: 'ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true,
    requestCert: true,
    rejectUnauthorized: false
};


// Create our express application
var app = express();

// Configure our application
app.configure(function() {
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.enable('view cache');
    app.engine('html', require('hogan-express'));
})

// Define some routes
app.get('/', function(req, res) {
    res.render("welcome");
});

// Create a http and https server for our app
//var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

//httpServer.listen(80);
httpsServer.listen(443);

httpsServer.on('error', function (e) {
  // Handle your error here
  console.log(e);
});
