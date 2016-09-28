#Buster World
A bubble-busting location-based augmented reality game inspired Buster Bros., Pang, and Ingress. Players control a character on a map based on their real-world location, and pop bubbles that bounce around over the map in effort to increase their high-score!

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
The start page has a link to the High-score Page, some basic game instructions, and a large link to the Game Page labeled "Play"

###Game Page
At this time the game page is an incomplete mock-up of what the game will actually be.
The game and a google map are layered using Z-indexing, and a transparent background for the game.
There are a few small bugs in the game proper, that need to be worked out.

####Controls
* Click anywhere on the screen to launch a chain in that direction.
* Each Bubble Popped Increases the Player's Score
* Popping bubbles of the same size multiplies the score value of each bubble popped after the first.
* Each time the player is struck by a bubble, they lose one of their Resolve.
* When a player runs out of resolve the game is over, and above the game a form displaying Score and Time is rendered with a text-field for player's name.
* After a player submits their name they are redirected to the High-score Page.

####Bugs
* Chain fired is unconnected to player icon.
* Chain does not die on impact with bubble, preventing bubble spawning.
* Geo-locational Movement only works over HTTPS, and needs a secure link.

###High Score Page
This page holds all of the scores and player names associated with the score in descending order.
The highest ten scores are bolder and larger than all of the other scores.

##Status: Incomplete
Awaiting Deployment!
