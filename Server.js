﻿var Hapi = require('hapi');
var server = new Hapi.Server(3000);
var http = require('http');
var requests = require('request');
var Joi = require('joi');

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Just Giving!');
    }
});

//http://localhost:3000/countries
server.route({
    method: 'GET',
    path: '/countries',
    handler: function (request, reply) {
        requests({ headers: { 'Accept': 'application/json','Content-Type': 'application/json' }, url: 'https://api-sandbox.justgiving.com/{API Key}/v1/countries' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Country search called...");
                reply(JSON.parse(body));
            }
            else {
                console.log("Error with Country search...");
                reply("Error");
            }
        })
    }
});

//http://localhost:3000/charity/categories
server.route({
    method: 'GET',
    path: '/charity/categories',
    handler: function (request, reply) {
        requests({ headers: { 'Accept': 'application/json','Content-Type': 'application/json' }, url: 'https://api-sandbox.justgiving.com/{API Key}/v1/charity/categories' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Category search called...");
                reply(JSON.parse(body));
            }
            else {
                console.log("Error with category search...");
                reply("Error");
            }
        })
    }
});

//http://localhost:3000/searchall/dog
server.route({
    method: 'GET',
    path: '/searchall/{query}',
    handler: function (request, reply) {
        requests({ headers: { 'Accept': 'application/json','Content-Type': 'application/json' }, url: 'https://api-sandbox.justgiving.com/{API Key}/v1/onesearch?q=' + request.params.query }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var foo = JSON.parse(body);
                console.log("All search total records found: "+ foo.Total);
                for (var index in foo.GroupedResults) {
                    console.log(foo.GroupedResults[index].Title);
                }
                reply(JSON.parse(body));
            }
            else {
                console.log("Error with the all search...");
                reply("Error");
            }
        })
    }
});


//http://localhost:3000/charity/search/dog
server.route({
    method: 'GET',
    path: '/charity/search/{query}',
    handler: function (request, reply) {
        requests({ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, url: 'https://api-sandbox.justgiving.com/{API Key}/v1/charity/search?q=' + request.params.query }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var foo = JSON.parse(body);
                console.log('Number of Hits:' + JSON.parse(foo.numberOfHits) + " for query:" + request.params.query);
                reply(JSON.parse(body));
            }
            else {
                console.log("Error with charity search...");
                reply("Error");
            }
        })
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});