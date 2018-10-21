const http = require('http');
const https = require('https');

var Q = require('q');
var request = require('request');

let promises = []

for (let i = 0; i < 10; i++) {
    var def = Q.defer();

    request({
        url: "http://localhost:4000/credit_add_one",
        method: "POST",
        json: true,   // <--Very important!!!
        body: {
            username: 'zhaoyi'
        }
    }, function (error, response, body) {
        console.log('\ni: ', i)
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        def.resolve(body.credit);
    });
    console.log(i);

    promises.push(def);
}

Q.all(promises).then(d => {

    request({
        url: "http://localhost:4000/user/zhaoyi",
        method: "GET",
        // json: true,   // <--Very important!!!
        // body: {
        //     username: 'zhaoyi'
        // }
    }, function (error, response, body) {
        console.log('------Result------')
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

})
