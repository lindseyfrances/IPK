var express = require('express');
var app = express();

// Heroku passes a port # as an environment var
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.static(__dirname + '/static'));

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});
