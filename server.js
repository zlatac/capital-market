const express = require('express');
const formidable = require('express-formidable');
const main = require('./main.js');
const app = express();
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
    //Execute promise to fetch and parse the uploaded CSV file
    main.getFile(path)
    .then(function(data){
        output.file = data;
        //Execute promise to get price data from api source which happens to be a file
        return main.getPrices;
        
    })
    .then(function(data){
        //Prepare the output object to have the necessary data we need for the front-end
        output.prices = data;
        output.etf_price = [];
        //get the most recent price and it will be the last index of the array because it has been sorted by time
        var newPrice = output.prices[data.length - 1];
        output.recent_date = output.prices[data.length - 1].DATE;
        //Compute the holding weight for each constituent of the ETF
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
        //Data is ready to be consumed by the frontend
        res.send(output);
    })
    //res.send(req.files);
});


app.listen(3000);

//ASSUMPTIONS
//Only CSV files can be uploaded and must have name,weight columns.
//The data in price.csv is not in any order and must be sorted properly by date.
//Uploaded file isn't stored on the server for any specific purpose.
//App should be optimized for mobile use.
//Latest Data uploaded persists in the browser even after app is closed.

//Challenges
//I tried adding a zoom functionality to the chart but i would need more time to understand the 3rd party zoom plugin for Chart.js.
//In the mean time the charts go full screen when clicked on.
//With more time unit testing would be included.

//Technologies Used
// - Node.js (Backend)[package.json has the backend dependencies]
// - Angular 1.x (Frontend)
// - Chart.js(charts)
// - MaterializeCSS (style framework)