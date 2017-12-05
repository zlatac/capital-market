var csv = require('csv');
const fs = require('fs');
const moment = require('moment');
getPrices = new Promise (function(resolve,reject){
    var basket = [];
    var dataRead = fs.readFile('data/prices.csv',function(err,data){
        csv.parse(data.toString(),{columns:true},function(err,output){
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
        });
    });    
    
});

function safe(obj){
    if(obj === null || obj === undefined || obj === ''){
        return false;
    }
    return true;
};

getFile = function(location){
    return new Promise (function(resolve,reject){
        var basket = [];
        var dataRead = fs.readFile(location,function(err, data){
            csv.parse(data.toString(),{columns:true},function(err,output){
                if(safe(output)){               
                    resolve(output);
                    
                }
            });
        });
    });
}

// getPrices.then(function(data){
//     console.log(data);
// });

module.exports.getPrices = getPrices;
module.exports.getFile = getFile;