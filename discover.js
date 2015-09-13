var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hi, this is chat');
});

var server = app.listen(9001, function () {
    console.log('Chat app signaling server');
});

var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/mypeers'});
var connected = [];
server.on('connection', function (id) {
    var idx = connected.indexOf(id);
    if (idx === -1) {
        connected.push(id);
    }
    console.log('+', id, ':', connected);
});

server.on('disconnect', function (id) {
    var idx = connected.indexOf(id);
    if (idx !== -1) {
        connected.splice(idx, 1);
    }
    console.log('-', id, ':', connected);
});

app.get('/lookup', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res.json(connected);
});