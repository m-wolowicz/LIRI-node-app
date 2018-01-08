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
			'\n ==== THAT IS NOT A VALID COMMAND ====' +
			'\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
			'\n node liri.js my-tweets' +
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
		//Logging a separator to place the results under
		console.log("\n==== HERE ARE YOUR TWEETS ====\n");

		//Creating a new Twitter client using the keys file
		var client = new Twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret
		});

		//Gather latest 20 tweets from @MelissaUM account:
		var params = {screen_name: 'MelissaUM', count: 21};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {

			if (!error) {
				//Create a for loop so that the same format is applied to each tweet
				for (var i = 1; i < tweets.length; i++) {
					//Variables containing each JSON data required
					var timeCreated = tweets[i].created_at;
					var tweetText = tweets[i].text;
					//Variable containing format for each tweet
					var output = 	"\n ---- Tweet Number " + i + " ----" +
									"\n Tweet: " + tweetText +
									"\n Posted on: " + timeCreated +
									"\n --------------------------------" +
									"\n";
					//Log each tweet to the console.
					console.log(output);
				}
			} else {
				console.log(error);
			}
		});
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
