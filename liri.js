require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var pa = process.argv;
var action = process.argv[2];
var searchParam = process.argv[3];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if(pa.length > 4){
    searchParam = "";
    for(i = 3; i < pa.length; i++){
        searchParam += pa[i] + " ";
    };
};

// console.log(typeof searchParam);

gitTwits = function(){
    client.get('statuses/user_timeline', {q: 'DreamWlkr64', count: 20}, function(error, tweets, response) {
        if(!error){
            for(i = 0; i < tweets.length; i++){
                console.log(`-------------------------------------------------------------------------
created on:  ${tweets[i].created_at}
tweet:       ${tweets[i].text}  
-------------------------------------------------------------------------`);
            };
        };
     });
};

spottySong = function(){
    if(searchParam === undefined){
        searchParam = "the sign";
    }
    spotify.search({type: 'track', query: searchParam}, function(err, data){
        if (err){
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.name);
        for(i = 0; i < data.tracks.items.length; i ++){
            console.log(`=====================================
Artist(s): ${data.tracks.items[i].artists[0].name}
--
Song Name: ${data.tracks.items[i].name}
--
Preview: ${data.tracks.items[i].preview_url}
--
Album: ${data.tracks.items[i].album.name}
=====================================`);
        }
    })
}

omgMove = function(){
    moviePasser = searchParam.split(' ').join('+');
    //or .replace(/ /g,'+');
    url = 'https://www.omdbapi.com/?t=' + moviePasser + '&apikey=trilogy';
    request(url, function(error, response, body){
        if(error){
            console.log("Error: ", error);
            console.log('statusCode: ', response && response.statusCode);
        } else{
            movieAct = JSON.parse(response.body);
            console.log(`====================================
Title: ${movieAct.Title}
--
Year: ${movieAct.Year}
--
IMDB Rating: ${movieAct.imdbRating}
--
Rotton Tomatoes Rating: ${movieAct.Ratings[1].Value}
--
Country: ${movieAct.Country}
--
Language(s): ${movieAct.Language}
--
Plot: ${movieAct.Plot}
--
Actors: ${movieAct.Actors}
====================================`);
        }
    });
};


switch(action){
    case "my-tweets":
        gitTwits();
        break;
    case "spotify-this-song":
        spottySong();
        break;
    case "movie-this":
        omgMove();
        break;
    case "do-what-it-says":
        break;
};