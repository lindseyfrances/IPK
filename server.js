var express = require('express');
var app = express();
var mongoose = require('mongoose');

var MONGO_DB_URI = '';
if (process.env.PROD_MONGODB) {
    MONGO_DB_URI = process.env.PROD_MONGODB;
} else {
    var creds  = require('./app/creds/creds.js');
    MONGO_DB_URI = creds.MONGO_DB_URI;
}

console.log(MONGO_DB_URI);

mongoose.connect(MONGO_DB_URI);

// Heroku passes a port # as an environment var
const PORT = process.env.PORT || 3000;
// Heroku doesn't like __dirname, so we set the current
// working directory to an ENV variable to reference
// a static directory containing data files
process.env.PWD = process.cwd();

app.use(express.static('dist'));
//app.use(express.static(process.env.PWD + '/static'));

app.get('/api/data', function(req, res) {
    console.log('hi');
    res.send('hi');
});

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});
