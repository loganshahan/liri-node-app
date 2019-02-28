var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios');


var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var command = process.argv[2];
var searchName = process.argv.slice(3).join(" ");

function switchCase(command, searchName){
    switch (command){
        case 'concert-this':
        bandInTown(searchName);
        break

        case 'spotify-this-song':
        spotSong(searchName);
        break

        case 'movie-this':
        omdb(searchName);
        break

        case 'do-what-it-says':
        doWhat(searchName);
        break

        default:
        console.log("invalid instruction");
        break
    }
} ;
function bandInTown(searchName){
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchName + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    axios.get(queryUrl).then(function(response){
        console.log("Venue name: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city +" " + response.data[0].venue.country);
        console.log(moment(response.data[0].datetime).format("MM/DD/YY"));
    })

    // request(queryUrl, function(error, response, body){
    //     if(!error && response.statusCode === 200){
    //         var concertData = JSON.parse(body);
    //         // for (i = 0; i < concertData.length; i++) {
    //         //     // console.log(createLine);
    //         //     console.log("Venue: " + concertData[i].venue.name);
    //         //     console.log("City: " + concertData[i].venue.city + ", " + concertData[i].venue.country);
    //         //     console.log(moment(concertData[i].datetime).format("MM/DD/YY"));
    //         // }
            

    //         // var concertDT = concertData[0].datetime;
    //         // var momentDT = moment().format('L');

    //         console.log("Venue Name: " + concertData.venue.name);
    //         // console.log("Venue location: " + concertData.venue.city + ", " + concertData.venue.country);
    //         // console.log(moment(concertData[0].datetime).format("MM/DD/YY"));

    //     }
    //     else{
    //         console.log(error);
    //     }
    // })
    
};
function spotSong(searchName)
 {
     if(searchName == undefined){
     searchName = "I Want it that way";
     spotSong(searchName);
 }
 else{
    spotify.search({ type: 'track', query: searchName }).then(function(response){
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
      console.log("Preview: " + response.tracks.items[3].preview_url);
      console.log("Album: " + response.tracks.items[0].album.name);

    });
};
 }
function omdb(searchName){
    
      var queryUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy"

    axios.get(queryUrl).then(
  function(response) {
    // console.log(response.data)
    
    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot Summary: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
  
);
  
};
function doWhat(){
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
          }
        
          // We will then print the contents of data
          console.log(data);
        
          // Then split it by commas (to make it more readable)
          var dataArr = data.split(",");
        
          // We will then re-display the content as an array for later use.
          console.log(dataArr);
  
          switchCase(dataArr[0], dataArr[1]);  
}
    );
}

switchCase(command, searchName);