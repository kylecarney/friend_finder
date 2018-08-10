// =============================
// DEPENDENCIES
// NPM Packages
// =============================

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// =============================
// EXPRESS CONFIGURATION
// Setup properties for express server
// =============================

var app = express(); // Informs Node of "express" server
var PORT = process.env.PORT || 3000; // Sets PORT

// Allow server to interpret data through BodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// =============================
// ROUTER
// Point server to routes
// =============================

require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);








// =============================
// LISTENER
// Start the server
// =============================

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});