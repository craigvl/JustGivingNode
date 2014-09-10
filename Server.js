var Hapi = require('hapi');
var server = new Hapi.Server(3000);
var http = require('http');
var requests = require('request');
var Joi = require('joi');

var user = {
    username: '',
    password: ''
}

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Just Giving!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});