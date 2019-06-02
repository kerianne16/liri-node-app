require("dotenv").config();

const keys = require("./keys.js");
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");


let type = process.argv.slice(2, 3).join("");
let search = process.argv.slice(3).join(" ");

function liri() {
    switch (type) {
        case "concert-this":
            concertThis()
            break;
        case "spotify-this-song":
            spotifyThisSong()
            break;
        case "movie-this":
            movieThis()
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
        default:
            console.log("Nothing found");

    }
}
liri();

function spotifyThisSong() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        fs.appendFile("log.txt", data.tracks.items[0].name + "\n", function (err) { });
        fs.appendFile("log.txt", data.tracks.items[0].preview_url + "\n", function (err) { });
        fs.appendFile("log.txt", data.tracks.items[0].album.artists[0].name + "\n", function (err) { });
        fs.appendFile("log.txt", data.tracks.items[0].album.name + "\n \n", function (err) { });
    });

}

function movieThis() {
    if (search === "") {
        search = "Mr.Nobody";
        console.log(movieThis);
    }
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(function (request) {

        fs.appendFile("log.txt", request.data.Title + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Year + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Rated + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Ratings[1] + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Country + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Language + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Plot + "\n", function (err) { });
        fs.appendFile("log.txt", request.data.Actors + "\n \n", function (err) { });


    })

}

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/"
        + search + "/events?app_id=codingbootcamp").then(function (request) {
            fs.appendFile("log.txt", request.data[0].venue.name + "\n", function (err) { });
            fs.appendFile("log.txt", request.data[0].venue.city + "\n", function (err) { });
            fs.appendFile("log.txt", request.data[0].venue.region + "\n \n", function (err) { });
            fs.appendFile("log.txt", moment(request.data[0].datetime).format('MMMM Do YYYY, h:mm a') + "\nBe there or be square!", function (err) { });

        });
}


function doWhatItSays() {

    fs.readFile("./random.txt", function (err, data) {
        let dataString = data.toString();
        userInput = dataString.split(" ").slice(0, 1).join("");
        userSearch = dataString.split(" ").slice(1).join(" ");

        fs.appendFile("log.txt", data + "\n \n", function (err) { });
    });
}