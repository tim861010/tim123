var express = require('express');
const exec = require('child_process').exec;
const fetch = require('node-fetch');
var app = express();
app.get('/', function(req, res) {
  fetch('http://10.100.0.9:8080/')
    .then(res => res.json())
    .then(body => res.send(body));
});
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Example app listening at 'http://%s:%s'", host, port);
})