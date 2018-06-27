require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
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

spottySong = function(takeOver){
    if(takeOver){
        searchParam = takeOver;
    }
    if(searchParam === undefined){
        searchParam = "the sign ace of base";
    }
    spotify.search({type: 'track', query: searchParam, popularity: 100, limit: 20}, function(err, data){
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

omgMove = function(takeOver){
    if(takeOver){
        searchParam = takeOver;
    }
    if(searchParam === undefined){
        searchParam = "mr nobody";
    }
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

doItSwitcher = function(command, param){
    
    switch(command){
        case "my-tweets":
            gitTwits();
            break;
        case "spotify-this-song":
            spottySong(param);
            break;
        case "movie-this":
            omgMove(param);
            break;
        default: console.log("You shouldn't be seeing this");
    }
};

doIt = function(searchParam2){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        } else{
            var dataActArr = data.split("|");
            if(searchParam2){
                searchParam2 -= 1;
            } else {
                searchParam2 = 0;
            };
            newDatArr = dataActArr[searchParam2].split(",");
            actionPasser = newDatArr[0];
            if(newDatArr.length > 1){
                newSearch = newDatArr[1];
            } else {
                newSearch = null;
            }
            doItSwitcher(actionPasser, newSearch);
        }
    });
}

stalkerLogger = function(stalkAction, stalkParam){
    if(stalkParam){
        fs.appendFile("node-logs", stalkAction + "," + stalkParam + "|", function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Action Logged");
            }
        });
    } else {
        fs.appendFile("node-logs", stalkAction + "|", function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Action Logged");
            }
        });
    }
};


switch(action){
    case "my-tweets":
        stalkerLogger(action);
        gitTwits();
        break;
    case "spotify-this-song":
        stalkerLogger(action, searchParam);
        spottySong();
        break;
    case "movie-this":
        stalkerLogger(action, searchParam);
        omgMove();
        break;
    case "do-what-it-says":
        stalkerLogger(action, searchParam);
        doIt(searchParam);
        break;
    default:
        console.log(`==========================
To narrow searches with Spotify, include artist and/or album name as well
Options:  my-tweets, spotify-this-song <song name here>, movie-this <movie name here> do-what-it-says <number (1-3) here>        
Type: node liri.js <your option here>
==========================`);
};