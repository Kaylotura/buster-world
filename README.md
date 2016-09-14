#Buster World
A bubble-busting location-based augmented reality game inspired Buster Bros., Pang, and Ingress. Players controll a character on a map based on their real-world location, and pop bubbles that bounce around over the map in effort to increase their highscore!

Currently, Buster World is a work in progress. 

For more information, see the [proposal](/proposal.md).

##Setup
In order to run Buster World, a user will need to get a google-map API [key](https://developers.google.com/maps/documentation/javascript/get-api-key), and create a python file named `buster-world/buster-world/key.py` with the following code: 
`KEY = "YOUR_API_KEY"`

From there you will want to host a server for Buster World:
In the terminal navigate to the Buster-World Directory and issue the following command lines:
`source venv/bin/activate`
`python manage.py runserver`

In a browser navigate to the location of your server, and begin playing by pressing the start link!

##Usage
There are three pages on Buster World; A Start Page, a Game Page, and a High Score Page.

###Start Page
The start page has a link to the Highscore Page and a Link to the Game Page, as well as some basic game instructions.

###Game Page
At this time the game page is an incomplete mock-up of what the game will actually be.
The background image is set to a static-world map, while the forground is an Invaders style.
The player controlls their character by pressing the left and right keyboard arrow keys to more left or right.
The player can also have the character launch a chain by pressing space.
Popping Bubbles increases the player's score, while being hit by the small bubbles reduces the player's resolve (shields in the top right corner of the game.)
If a player pops all of the bubbles they may click on the screen to refresh the stage but maintain their score.
When a player runs out of resolve the game is over, and above the game a form displaying Score and Time Played is rendered with a textfield for player's name.
After a player submits their name they are redirected to the Highscore Page.

###High Score Page
This page holds all of the scores and player names associated with the score in descending order.
The highest ten scores are bolder and larger than all of the other scores.

##Status: Incomplete
Currently Buster World runs as a super minimalistic game without any of the geo-locational features. Even the gameplay is inaccurate at this time, designed to generate a score and time for testing.
