// GLOBAL VARIABLES
// ================

	// =======
	// REQUIRE
	// =======
		// Includes the core node package for reading and writing files
		var fs = require("fs");

		// Include the request npm package (REMEMBER: run "npm install request" in this folder first!)
		var request = require("request");

		//Code needed to grab the data from keys.js.
		var keys = require("./keys.js");

		//Include the node modules for twitter spotify
		var Twitter = require("twitter");
		var spotify = require("node-spotify-api");

	// ===============
	// INPUT VARIABLES
	// ===============
		//User Input for command parameter
		var inputCommand = process.argv[2];
		//User Input for song and movie titles
		var inputTitles = process.argv[3];


// MAIN PROCESS
// ============

	//Switch statement that calls each function depending on user input
	switch (inputCommand) {

		//Option 1: node liri.js my-tweets
		case "my-tweets":
			//Call Function for generating tweets from Twitter API
			myTweets();
			break;

		//Option 2: node liri.js spotify-this-song '<song name here>'
		case "spotify-this-song":
			//Call Function for generating song info from Spotify API
			spotifyThis();
			break;

		//Option 3: node liri.js movie-this '<movie name here>'
		case "movie-this":
			//Call Function for generating movie info from OMDB API
			movieThis();
			break;

		//Option 4: node liri.js do-what-it-says
		case "do-what-it-says":
			//Call Function for generating random command in random.txt file
			doWhatItSays();
			break;

		//Default "else" option, which console.logs the instructions to user
		default: console.log(
			'\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
			'\n node liri.js my-tweets'  +
			'\n node liri.js spotify-this-song "any song name"' +
			'\n node liri.js movie-this "any movie name"' +
			'\n node liri.js do-what-it-says' +
			'\n'
			);
	}

// FUNCTIONS
// ============

	//myTweets Function
	function myTweets() {
		console.log("...Retrieving your Tweets...");
	}

	//spotifyThis Function
	function spotifyThis() {
		console.log("...Retrieving your Song...");
	}

	//movieThis Function
	function movieThis() {
		console.log("...Retrieving your Mpvie...");
	}

	//doWhatItSays Function
	function doWhatItSays() {
		console.log("...Doing What It Says...");
	}
