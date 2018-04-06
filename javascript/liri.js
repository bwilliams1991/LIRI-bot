
require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var exec = require("child_process").exec;
var omdbapi = require("omdb-client");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var key = process.argv[2];
var spotifySearch = "0hrBpAOgrt8RXigk83LLNE"
var query = process.argv[3];
// search term is not working -------------------------

switch (key) {
	case `my-tweets`:
		var params = {
			screen_name: 'b_LIRI_',
			count: 10
		};
		client.get('statuses/user_timeline', params, function (error, tweets, response) {
			for (let i = 0; i < params.count; i++) {
				if (!error) {

					// console.log(tweets);
					// if (tweets[i].created_at === !null) {
					console.log("\n" + tweets[i].created_at);
					console.log("----------------")
					console.log(tweets[i].text);
					// }
				} 	// If there is an error log it.
				else {
					return;
				}
			}
		});
		break;

	case `spotify-this-song`:
		if (process.argv[3]) {
			spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}
				console.log("\n" + data.tracks.items[0].artists[0].name);
				console.log(data.tracks.items[0].name);
				console.log(data.tracks.items[0].preview_url);
				console.log(data.tracks.items[0].album.name);

			});
		} else {
			spotify.request('https://api.spotify.com/v1/tracks/' + spotifySearch)
				.then(function (data) {
					console.log("\n" + data.artists[0].name);
					console.log(data.name);
					console.log(data.external_urls.spotify);
					console.log(data.album.name);
				})
				.catch(function (err) {
					console.error('Error occurred: ' + err);
				});
		};
		break;
	case `movie-this`:
		// debug
		// console.log(queryUrl);
		var nodeArgs = process.argv;
		var movieName = nodeArgs[3];

		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

		for (var i = 2; i < nodeArgs.length; i++) {

			if (i > 2 && i < nodeArgs.length) {
				movieName = movieName + "+" + nodeArgs[i];
			}
			else {
				movieName += nodeArgs[i];
			}
		}
		request(queryUrl, function (error, response, body) {

			// If the request is successful
			if (!error && response.statusCode === 200) {
				// console.log(body);
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Release Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
			}
		});

		break;
	case `do-what-it-says`:
	fs.readFile('random.txt', "utf8", function (err, data) {
		if (err) {
			return console.log("There was a problem: " + err);
		}
		console.log(data);

		var input = (' node javascript/liri.js ' +  data);
		exec(input, function(err, stdout, stderr){
			console.log(stdout);
			if(err){
				console.log("err:", err);
			}
			if(stderr){
				console.log("stderr:", stderr);
			}
		});


	});
		break;
	default: console.log("This is not a valid command Please Choose one of the following: \n my-tweets \n spotify-this-song \n movie-this \n do-what-it-says");
		break;
}

