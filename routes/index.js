var express = require('express');
var router = express.Router();
var http = require('https');

var barer = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function (req, res) {
  var result = {};  
  console.log("BUSQUEDA EN NODE: "+req.query.q);
  var options = {
    host: 'api.twitter.com',
    path: '/1.1/search/tweets.json?q='+escape(req.query.q),
    method: 'GET',
    headers: {
        'Authorization': 'Bearer '+barer,
      }
    
  };  
  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      dataJSON = JSON.parse(str);
    res.send(dataJSON);
    
    });
  }

  var req = http.request(options, callback);
  req.end();
});


function getBArer(){
  var options = {
    host: 'api.twitter.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
        'Authorization': 'Basic aGRpcGdrTzc1eUo2cTAyUWM3RXltQjNjVzpyeG5QNDBoSzJLaXNnaE1QcFYwdUgwWnpDRGlVU0pqNXdNcTcxNHFFSDd4SGN0dm1SRw==',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    
  };  
  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
    dataJSON = JSON.parse(str);
    barer = dataJSON.access_token;
    console.log(barer);
    });
  }

  var req = http.request(options, callback);
  req.write("grant_type=client_credentials");
  req.end();
}

getBArer();

module.exports = router;
