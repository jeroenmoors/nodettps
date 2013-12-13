// Require some modules...
var express     = require('express');
var path        = require('path');
var fs          = require('fs');
var http        = require('http');
var https       = require('https');
var tlsSessions = require('strong-cluster-tls-store');

// Store the certificate details for later use
var httpsOptions = {
    key: fs.readFileSync('ssl/nodettps.dev.fluoline.net.key', 'utf8'), 
    cert: fs.readFileSync('ssl/nodettps.dev.fluoline.net.crt', 'utf8'),
    ca: [fs.readFileSync('ssl/geotrust_cross_root_ca.txt', 'utf8'), fs.readFileSync('ssl/rapid_ssl_ca.txt', 'utf8')],
    ciphers: 'ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true    
};
                    
// Create our express application
var app = express();

// Redirect all http traffic to https
app.use(function(req,res,next) {
    if (!/https/.test(req.protocol)){
        res.redirect("https://" + req.headers.host + req.url);
    } else {
		// If we're on https, ensure all requests will be over https
		// http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
		res.setHeader("Strict-Transport-Security", "max-age=31536000");
        return next();
    } 
});

// Define some routes
app.get('/', function(req, res) {
    // Render
    res.send("welcome");
});

// Create a http and https server for our app
var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

tlsSessions(httpsServer);

httpServer.listen(80);
httpsServer.listen(443);
