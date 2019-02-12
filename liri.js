
    //----------------------------------!!!!!!!!!!!!!---------------------------------------//
   //------!!!IMPORTANT!!!-------PLEASE!!! READ THE READ ME FILE--------!!!IMPORTANT!!!----//
  //------------------------------------!!!!!!!!!!!!!-------------------------------------//

require("dotenv").config();
var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
var Giphy = require('giphy-api');
var song = 'spotify-this-song';
var movie = 'movie-this';
var doIt = 'do-what-it-says';

//getting user value for functions.
var userInput = process.argv[2];

//getting song value from user 
var nodeArgs = process.argv;
var newSearch = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        newSearch = newSearch + "+" + nodeArgs[i];
    }
    else {
        newSearch += nodeArgs[i];
    }
}

//console.log(newSearch);


// using fs to read random text
if (userInput === doIt) {
    fs.readFile('random.txt', function (err, data) {
        //----- getting the comand lines from .txt file----//
        var newData = data.toString();
        var newData2 = newData.replace(/-/g, '+');
        var newData3 = newData2.replace(/ /g, '+');
        var newData4 = newData3.replace(',', ' ');
        var newData5 = newData4.replace(/"/g, '');
        var newArray = newData5.split(' ');
        //--------- new values for user input and search-------- //
        //var userInput = newArray[0];
        var newSearch = newArray[1];
        //console.log(userInput, newSearch);

        var spotify = new Spotify(keys.spotify);

        spotify
            .request('https://api.spotify.com/v1/search?query=' + newSearch + '&type=track&offset=0&limit=5')
            .then(function (data) {
                //console.log(newSearch);

                // -----------this is for a single result----------//

                console.log('songs names: ' + data.tracks.items[0].name); //songs names
                console.log('Artists names: ' + data.tracks.items[0].album.artists[0].name); //artists names
                console.log('preview: ' + data.tracks.items[0].preview_url); //preview url
                console.log('Albums names: ' + data.tracks.items[0].album.name); //album name  
            })

            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

        if (err) {
            return console.error(err);
        }
    });
}

//----------------function to run api if user input is = to spotify this song--------------//

else if (userInput === song) {
    var spotify = new Spotify(keys.spotify);
    spotify
        .request('https://api.spotify.com/v1/search?query=' + newSearch + '&type=track&offset=0&limit=5')
        .then(function (data) {
            //console.log(newSearch);
            // this is for a single result//

            // console.log('songs names: ' + data.tracks.items[0].name); //songs names
            // console.log('Artists names: ' + data.tracks.items[0].album.artists[0].name); //artists names
            // console.log('preview: ' + data.tracks.items[0].preview_url); //preview url
            // console.log('Albums names: ' + data.tracks.items[0].album.name); //album name  

            //for loop to grab more results
            var myData = data.tracks.items;
            for (var i = 0; i < myData.length; i++) {
                console.log('SONG NAME: ' + myData[i].name); //songs names
                console.log('ARTIST NAME: ' + myData[i].album.artists[0].name); //artist name
                console.log('PREVIEW LINK: ' + myData[i].preview_url); // preview
                console.log('ALBUM NAME: ' + myData[i].album.name); //album name  
            }

        })

        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

}

// -----------------second API------------------//

if (userInput === movie) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + newSearch + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            if (newSearch != "") {
                //console.log(response.data);
                console.log('TITLE: ' + response.data.Title); // movie title
                console.log('YEAR: ' + response.data.Year);//movie year
                console.log('COUNTRY: ' + response.data.Country); // movie country
                console.log('LANGUAGES: ' + response.data.Language); // movie language
                console.log('ACTORS: ' + response.data.Actors); // movie actors
                console.log('PLOT: ' + response.data.Plot);
                console.log('RATING:')
                console.log(response.data.Ratings[1]);
            }
        }

    ).catch(
        function (error) {
            console.log(error);
        }

    )

}

// 3rd API Giphy-API
if(userInput === 'giphy-this'){
    var giphy = new Giphy(keys.giphy);
     //giphy.translate(newSearch).then(function (response) {
     //console.log(newSearch);
    //})  
    giphy.translate( newSearch)//"https://api.giphy.com/v1/gifs/search?q="+ newSearch +"&limit=1"
    .then(function (response) {
        console.log('THIS IS YOUR RESULT: ' + response.data.url);
    
    })
    }


//  empty search   
if (userInput === "", newSearch === "") {
    console.log("If you haven't watched" + '"' + "Mr. Nobody" + '"' + ",then you should: <http://www.imdb.com/title/tt0485947/> Its on Netflix!")

}


