# LIRI-node-app

LIRI: The Language Interpretation and Recognition Interface.

Trilogy Education Services Full-Stack Web Developer Program

University of Miami Cohort - 201710FSF3

Week 13 Homework Assignment:

Create a Language Interpretation and Recognition Interface command line node application.

### Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

3. `node liri.js movie-this '<movie name here>'`

   * This will output the movie information to your terminal/bash window:

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.


### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
