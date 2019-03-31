//Install express server
const express = require('express');
const path = require('path');
const app = express();
var fs = require('fs');


/*
var Request = require("request");

var userDetails;

Request.get("http://httpbin.org/ip", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function main() {
    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails)
    }, function(err) {
        console.log(err);
    })
}

main();*/




var obj;
var CONTENT = require('./content.json');
fs.readFile('./content.json', 'utf8', function (err, data) {
  if (err) throw err;
  CONTENT = JSON.parse(data);
});







const PATH = '/src/assets/plume-d-or/';
app.use(express.static(__dirname + PATH));
app.use(express.static(__dirname + '/dist/'));
app.get(['/', '/index', '/home', '/accueil'], function(req,res) {
  var template = path.join(__dirname + PATH + 'index.ejs');
  var accueil = CONTENT[0];
  res.render(template, accueil);
})
.get(['/notre-ecole', 'a-propos'], function(req,res) {
  var template = path.join(__dirname + PATH + 'notre-ecole/index.ejs');
  var about = CONTENT[1];
  res.render(template, about);
})
.get('/actualites', function(req,res) {
  res.sendFile(path.join(__dirname + PATH + 'actualites/index.html'));
})
.get('/clubs', function(req,res) {
  res.sendFile(path.join(__dirname + PATH + 'clubs/index.html'));
})
.get('/contact', function(req,res) {
  res.sendFile(path.join(__dirname + PATH + 'contact/index.html'));
})
.get('/app/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4201);


