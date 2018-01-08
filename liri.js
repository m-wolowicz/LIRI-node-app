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
		var Spotify = require("node-spotify-api");

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

		//Default "else" option, which console.logs the instructions to user in case of bad command
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
		console.log("\n ==== HERE ARE YOUR TWEETS ====\n");

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
									"\n   " + tweetText +
									"\n   Posted on: " + timeCreated +
									"\n --------------------------------" +
									"\n";
					//Log each tweet to the console.
					console.log(output);

					//BONUS Append data to log.txt file
					appendToLogFile(output);

				}
			} else {
				console.log(error);
			}
		});
	}

	//spotifyThis Function
	function spotifyThis() {
		//Logging a separator to place the results under
		console.log("\n ==== HERE IS YOUR SONG ====\n");

		//Creating a new spotify variable using the keys file
		var spotify = new Spotify({
			id: keys.spotifyKeys.id,
			secret: keys.spotifyKeys.secret
		});

		//Get the userinput for the song title and store in new Variable
		var songTitle = inputTitles;

		//If the user doesn't input a song
		if(!songTitle){
			//then the songtitle will be The Sign
			songTitle = "The Sign";
		}

		//Store the song title as a parameter for the search:
		var params = songTitle;

		//Search Spotify api
		spotify.search({ type: 'track', query: params }, function(err, data) {

			//If there is an error, log the error
			if (err) {
				return console.log('Error occurred: ' + err);
			} else {
				//Otherwise, log the song information:
				var output = 	" ---- You searched for: " + params.toUpperCase() + " ----" +
								"\n   Artist: " + data.tracks.items[0].album.artists[0].name +
								"\n   Song Name: " + params +
								"\n   Album: " + data.tracks.items[0].album.name +
								"\n   Preview link on Spotify: " + data.tracks.items[0].album.external_urls.spotify +
								"\n --------------------------------" +
								"\n";

				console.log(output);

				//BONUS Append data to log.txt file
				appendToLogFile(output);
			}
		});
	}

	//movieThis Function
	function movieThis() {
		//Logging a separator to place the results under
		console.log("\n ==== HERE IS YOUR MOVIE ====\n");

		//Retrieve the OMDB key
		var omdbKey = keys.omdbKey.key;

		//Get the user input for the movie title
		var movieTitle = inputTitles;

		//If the user doesn't input a movie title
		if(!movieTitle) {
			//Then the movie title will be "Mr Nobody"
			movieTitle = "mr nobody";
		}

		//Store the movie title into a new Variable
		var params = movieTitle;

		//Use request to retrieve the information from OMDB api
		request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + omdbKey, function (error, response, body) {

			//If there is no error, return information
			if (!error && response.statusCode == 200) {

				//Parse JSON data into new Variable
				var data = JSON.parse(body);

				//Console.log the movie information
				var output =	" ---- You searched for: " + params.toUpperCase() + " ----" +
								"\n   Movie Title: " + data.Title +
								"\n   Release Year: " + data.Year +
								"\n   IMDB Rating: " + data.Ratings[0].Value +
								"\n   Rotten Tomatoes Rating: " + data.Ratings[1].Value +
								"\n   Production Country: " + data.Country +
								"\n   Language: " + data.Language +
								"\n   Plot: " + data.Plot +
								"\n   Actors: " + data.Actors +
								"\n --------------------------------" +
								"\n";

				console.log(output);

				//BONUS Append data to log.txt file
				appendToLogFile(output);

			} else {
				console.log('error:', error); // Print the error if one occurred
				return;
			}
		});
	}

	//doWhatItSays Function
	function doWhatItSays() {

		//Use fs to read the random file
		fs.readFile("random.txt", "utf8", function(error, data) {

			//If there isn't an error
			if (!error) {

				//get the data from the file and split it into an array
				var randomFileText = data.split(",");

				//Grab each portion of the new array and save as new input command and input title
				var randomInputCommand = randomFileText[0];
				var randomInputTitle = randomFileText[1];

				//Use the new variables to run the same swith statement and call all functions as above
					//Switch statement that calls each function depending on user input
					switch (randomInputCommand) {

						//Option 1: node liri.js my-tweets
						case "my-tweets":
							//Call Function for generating tweets from Twitter API
							myTweets();
							break;

						//Option 2: node liri.js spotify-this-song '<song name here>'
						case "spotify-this-song":
							//Call Function for generating song info from Spotify API
							//User Input for song and movie titles
							inputTitles = randomInputTitle;
							spotifyThis();
							break;

						//Option 3: node liri.js movie-this '<movie name here>'
						case "movie-this":
							//Call Function for generating movie info from OMDB API
							//User Input for song and movie titles
							inputTitles = randomInputTitle;
							movieThis();
							break;

						//Default "else" option, which console.logs the instructions to user in case of bad command
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
			} else {
				throw error;
			}
		});
	}

	// =====
	// BONUS
	// =====
		//Function that appends data to a log file
		function appendToLogFile(data) {

			// Add a few spaces
			fs.appendFile("log.txt", '\r\n\r\n');

			//Add data
			fs.appendFile("log.txt", JSON.stringify(data), function(err) {

				// If an error was experienced we say it.
				if (err) {
					console.log(err);
				}
				// If no error is experienced, we'll log the phrase "Content Added" to our node console.
				else {
					console.log("The 'log.txt' has been updated and more content has been added!");
				}
			});
		}
