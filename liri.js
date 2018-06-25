require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);

