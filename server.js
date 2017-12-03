var express = require('express');
var main = require('./main.js');
var app = express();

app.get('/', function (req, res) {
 res.send('Hello World');
});

app.get('/baby', function (req, res) {
    //console.log(req);
    main.getPrices.then(function(data){
        res.send(data);
    });
    //console.log(api);
    
});

app.listen(3000);