
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
var sTerm = process.argv[3];
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
	if (true) {
		// if (sTerm == !spotifySearch) {
			// console.log(sTerm);
			// spotifySearch = sTerm;
			spotify.request('https://api.spotify.com/v1/tracks/' + sTerm)
				.then(function (data) {
					console.log("\n" + data.artists[0].name);
					console.log(data.name);
					console.log(data.external_urls.spotify);
					console.log(data.album.name);
				})
				.catch(function (err) {
					console.error('Error occurred: ' + err);
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
			}
		break;
	case `movie-this`:
		// debug
		// console.log(queryUrl);
		// var nodeArgs = process.argv;
		// var movieName = "";

		// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

		// for (var i = 2; i < nodeArgs.length; i++) {

		// 	if (i > 2 && i < nodeArgs.length) {
		// 		movieName = movieName + "+" + nodeArgs[i];
		// 	}
		// 	else {
		// 		movieName += nodeArgs[i];
		// 	}
		// }
		// request(queryUrl, function (error, response, body) {

		// 	// If the request is successful
		// 	if (!error && response.statusCode === 200) {
		// 		console.log(response);
		// 		// console.log("Release Year: " + JSON.parse(body).Year);
		// 	}
		// });

		break;
	case `do-what-it-says`:

		break;
	default: console.log("This is not a valid command Please Choose one of the following: \n my-tweets \n spotify-this-song \n movie-this \n do-what-it-says");
		break;
}



// {album: { album_type: 'album', artists: [[Object]], available_markets:[],
// 	external_urls: { spotify: 'https://open.spotify.com/album/5OVGwMCexoHavOar6v4al5' },
// 					 href: 'https://api.spotify.com/v1/albums/5OVGwMCexoHavOar6v4al5',
// 						 id: '5OVGwMCexoHavOar6v4al5',
// 				 images: [[Object], [Object], [Object]],
// 					 name: 'Interstellar: Original Motion Picture Soundtrack (Deluxe Digital Version)',
// 						release_date: '2014-11-21',
// 							release_date_precision: 'day',
// 								type: 'album',
// 									uri: 'spotify:album:5OVGwMCexoHavOar6v4al5'
// 	},
// 	artists:
// 	[{
// 		external_urls: [Object],
// 		href: 'https://api.spotify.com/v1/artists/0YC192cP3KPCRWx8zr8MfZ',
// 		id: '0YC192cP3KPCRWx8zr8MfZ',
// 		name: 'Hans Zimmer',
// 		type: 'artist',
// 		uri: 'spotify:artist:0YC192cP3KPCRWx8zr8MfZ'
// 	}],
// 		available_markets:
// 	[],
// 		disc_number: 1,
// 			duration_ms: 126959,
// 				explicit: false,
// 					external_ids: { isrc: 'USNLR1400774' },
// 	external_urls:
// 	{ spotify: 'https://open.spotify.com/track/15WRWc3qqlyAzTne9q5tQK' },
// 	href: 'https://api.spotify.com/v1/tracks/15WRWc3qqlyAzTne9q5tQK',
// 		id: '15WRWc3qqlyAzTne9q5tQK',
// 			is_local: false,
// 				name: 'Cornfield Chase',
// 					popularity: 69,
// 						preview_url: 'https://p.scdn.co/mp3-preview/2be1387d787a1e1c7c2b7ddb5370126a769ca0f1?cid=569fd0cf5e1540328d874b19e3d1b5d5',
// 							track_number: 2,
// 								type: 'track',
// 									uri: 'spotify:track:15WRWc3qqlyAzTne9q5tQK'
// }