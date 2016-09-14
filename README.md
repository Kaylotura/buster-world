#Buster World
A bubble-busting location-based augmented reality game inspired Buster Bros., Pang, and Ingress. Players control a character on a map based on their real-world location, and pop bubbles that bounce around over the map in effort to increase their high-score!

Currently, Buster World is a work in progress. 

For more information, see the [proposal](/proposal.md).

##Setup
* Get a Google-Map API [Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
* Navigate to your Buster World directory and create a file named  `buster-world/buster-world/key.py` 
* Open `buster-world/buster-world/key.py` and include the following code:

`KEY = "YOUR_API_KEY"`

*  In the terminal navigate to the Buster-World Directory and issue the following command lines:

`source venv/bin/activate`

`python manage.py runserver`

* In a browser navigate to the location of your server, and begin playing by pressing the start link!

##Usage
There are three pages on Buster World; A Start Page, a Game Page, and a High Score Page.

###Start Page
The start page has a link to the High-score Page and a Link to the Game Page, as well as some basic game instructions.

###Game Page
At this time the game page is an incomplete mock-up of what the game will actually be. The background image is set to a static-world map, while the foreground is an Invaders style.

####Controls
* Left/Right Arrow Keys move the player left or right accordingly.
* Space Bar launches a chain at the Large Bubbles.
* Each Bubble Popped Increases the Player's Score
* If a player pops all of the bubbles they may click on the screen to refresh the stage but maintain their score.
* Each time the player is struck by a small red bubble, they lose one of their Resolve Shields.
* When a player runs out of resolve the game is over, and above the game a form displaying Score and Time is rendered with a text-field for player's name.
* After a player submits their name they are redirected to the High-score Page.

###High Score Page
This page holds all of the scores and player names associated with the score in descending order.
The highest ten scores are bolder and larger than all of the other scores.

##Status: Incomplete
Currently Buster World runs as a super minimalistic game without any of the geo-locational features. Even the game-play is inaccurate at this time, designed to generate a score and time for testing.
