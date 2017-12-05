var express = require('express');
var formidable = require('express-formidable');
var main = require('./main.js');
var app = express();
app.use(formidable());

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/index.html');
});

app.get('/baby', function (req, res) {
    //console.log(req);
    main.getPrices.then(function(data){
        res.send(data);
    });
});

app.post('/form', function(req,res){
    //console.log(req.files);
    var output = {};
    //form file input name is crucial for grabing file object
    var path = req.files.boobs.path;
    main.getFile(path)
    .then(function(data){
        output.file = data;
        return main.getPrices;
        
    })
    .then(function(data){
        output.prices = data;
        output.etf_price = [];
        //get the most recent price and it will be the last index of the array because it has been sorted by time
        var newPrice = output.prices[data.length - 1];
        output.recent_date = output.prices[data.length - 1].DATE;
        output.file.forEach(function(item){
            item.price = newPrice[item.name];
            item.holding = Number(item.price) * Number(item.weight);
        });
        //get ETF prices for each time period using only the data from uploaded csv
        for(var x in output.prices){
            var total = 0;
            var basket = {};
            output.file.forEach(function(item){
                total += Number(output.prices[x][item.name]) * Number(item.weight);
            });
            basket.DATE = output.prices[x].DATE;
            basket.total = total;
            output.etf_price.push(basket);

        }
        res.send(output);
    })
    //res.send(req.files);
});


app.listen(3000);