var csv = require('csv');
const fs = require('fs');
const moment = require('moment');
// change file reading to async when your done testing
getPrices = new Promise (function(resolve,reject){
    var basket = [];
    var data = fs.readFileSync('data/prices.csv').toString();
    csv.parse(data,{columns:true},function(err,output){
        if(safe(output)){               
            output.forEach(function(item){
                var list = {}
                var date_refine = moment(item.DATE,'YYYY-MM-DD').unix();
                item.unix = date_refine;
                //list[date_refine] = item;
                basket.push(item);
            });
            
            basket.sort(function(a,b){
                //sorts the price data from oldest date to latest date using UNIX timestamp
            return a.unix - b.unix;
            });
            //console.log(basket);
            resolve(basket);
            //return basket;
        }else{
            return 'i dont know man';
        }
        return this.collector = 'ohhhhhhhhhhhhhhhhhhhhhhhhhh';
    });
    function safe(obj){
        if(obj === null || obj === undefined || obj === ''){
            return false;
        }
        return true;
    };
    //return this.collector;
});

whyMe = function(){
    // var f = moment().toString();
    // return {'why':f};
    // setTimeout(function(){
    //     console.log('heyyyyyyyyyyyyy')
    // },3000);

    var myFirstPromise = new Promise(function(resolve, reject){
        // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
        // In this example, we use setTimeout(...) to simulate async code. 
        // In reality, you will probably be using something like XHR or an HTML5 API.
        setTimeout(function(){
          resolve(console.log('heyyyyyyyyyyyyy')); // Yay! Everything went well!
        }, 3000);
    });

    myFirstPromise.then(function(successMessage){
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        console.log("Yay! ");
      });
}

// getPrices.then(function(data){
//     console.log(data);
// });

module.exports.getPrices = getPrices;

//console.log(obj);