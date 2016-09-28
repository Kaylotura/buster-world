# Proposal: Buster World

**Buster World** is a web application that allows players to take on the role of an enthusiastic explorer-hero, seeking to pop the demoralizing bubbles that are tormenting the world in a location-based augmented reality game. Some major inspirations for this game are Ingress, Pokemon Go, and [Buster Bros](https://www.youtube.com/watch?v=ulfIohdFv08).

Upon starting up Buster World the player sees a start screen, which will provide the basic instructions on how to play the game, a link to the highs-score page, and a 'play' button to begin the game. Once they’ve begun, their screen will then render a map in real time based on their GPS location, with a triangle 'player' icon centered at their location. Every 5 seconds for 80 minutes or so a large bouncing bubble will be generated and bounce around the character’s local area. By tapping on the screen (or clicking their mouse if playing on a computer) the player can launch a grappling-hook chain in the direction tapped (or clicked.) Bubbles that come in contact with the grappling-hook will pop and increase the players Catharsis Score! However if a player is struck by one of the demoralizing bubbles, they will lose one point of Resolve. Once they have run out of resolve, it's game over, and the player can submit their name and score for the High Score page.

## Specific Functionality

### Start Page
The start page will have a image-link that when clicked will lead to the game page. There will also be some basic instructions over the 'play' image-link. Above the instructions is a small image-link to the high score page.

### Game Page
Here the player sees the map and game. The player uses this view to play the game. They may tap anywhere on the screen to fire their grappling-hooks in the specified direction. In the top right corner of the game layer there will be a Resolve Meter displaying zero to three shields a point of resolve (see below). The game page will also display the bouncing bubbles, buildings, and player's actual location as a top down map using Google Maps street view.
When the game over condition is met, the map and game layers will be hidden, and a hidden 'Game Over' field will be revealed that displays the player's score and time, and a form that asks for their name. Upon accepting the player's name, the page will submit the player's Player Stats and redirect the player to the High Score page.

### High Score Page
Here the player can scroll through all the scores logged in the game. They will be listed vertically starting with the highest score first and descending order from there. By each score will be the name of the  player (as entered in the Game page) who earned that particular score. At the top of the page there will be a link that leads back to the Start Page.

## Data Model

### Player Stats
Each instance of the game being played will be stored as a Player Stats model.
Each Player Stats models has the following properties.
* Player Name (Entered at the end of the game)
* Score (Gained throughout the playing of the game)
* Time (How long the player survived before the game ended) (This will be used for future achievements).

## Game Model

### Character
Information that represents the Character
* Resolve (A number between 0 and 3. Starting at 3, each time struck by a bubble, the character reduces their resolve by 1. At 0 the game is over)
* Score (An integer representing how well the player is doing)
* Icon (An image that is rendered on the World screen)
* Time (A timed count of how long the player has been surviving)
* Location (Coordinates representing where to render the Icon on the World)

### World
The visual background and setting of the game.
* Map (The map is a rendering of the local around the players location using a library similar to OpenLayers)
* Bubble Icons
* Character Icons

### Bubbles
Large round bubbles that bounce around the world setting and lower the player's resolve on contact.
* Icon (An image representing the bubble to be rendered on World screen)
* Speed (How quickly the bubble moves across the screen, based on Hit Points)
* Size (A ratio that is used as a divisor for the points the bubble is worth, and when a bubble is popped, it is divided by 2, and two new bubbles are created using the new size (down to .25))

### Chain
A long trailing chain launched from the character that pops bubbles.
* Icon (An image representing the chain to be rendered on World screen)

### Final Score
While each character has a running tally of what their score is, when the character loses their final resolve, that score is to be saved within the database, so that it may be compared to other scores, and rendered as part of the Scores Menu and the Game page, this will allow the player to see who has reached the prized high score.

## Technical Components
Much of the game is going to take place in JavaScript, with the rendering handled with PhaserJS and a little CSS for layering it over the google map.

The objects of the game will largely interact through PhaserJS structures; this would include Character, Bubbles, and Chains.

Python will store character scores and be used to manipulate the data-base of character scores and the high scores among them.

## Schedule (23 days)
* Initiate Django Structure - Very Easy - 1 hour
* Create Minimal Game - Easy - 1 hour
* Start Page - Easy - 1/2 day
* High Score Page - Easy - 1/2 day
* Blank Game Page - Easy - 1/2 day
* Construct Mimimal Game with Score & Time - Medium - 2 days
* Game Page that renders game - Medium - 2 days
* Connect Game to Data - Medium - 2 days
* *Super minimal game experience (Minimal Game/Structure)*
* Canvas JS to render backgrounds - Medium - 2 days
* Get Gelocational Satellite view through canvas on game - Hard - 5 days
* Build out full game in Phaser - Medium/Hard - 3 days
* *Minimal game experience (Game takes place on gelocational map)*
* Manage to get physical movement to replace game cursers - Hard? - 5 days
* *Game Complete*
* Basic HTML & CSS Tidy-Up - Easy - 1/2 day
* *MVP*

##Future Goals
* Player Achievements based on time, maybe bubbles popped, etc.
* Music (Midi Music)
* Sound Effects
* Buildings as Objects that chains stick to and Bubbles bounce off of.
* Four upgrade grapples [Includes new menu and Upgrade drops]
  * Standard
  * Double (can shoot 1 grapple while a grapple is already shot)
  * Hook (Pops 2 bubbles instead of 1)
  * Laser (Shorter 'chain' but can fire up to 5 chains)
* Four upgrade foods [Includes new menu and Upgrade drops]
  * Apple (Pops all bubbles on screen down to smallest size)
  * Kale (+1 Resolve, not limited to 3)
  * Radish (Immune to next 2 Bubble hits)
  * Banana (Reduces Speed of all bubbles to 0 for 3 seconds)
* Global Pause/Character invulnerability on Menu open...
* Distractions (Different type of bubbles or targets that grapples can interact with)
  * Pointy Snail (If chain interacts with Pointy Snail, Pointy snail comes to Icon, and reduces Resolve)
  * Swooping Hawk (Quickly flies around popping bubbles but offering no points to the player)
  * Flying Owl (Flies through screen. Disperses chain like bubble, but offers no points
* Customizable Avatar as Character Icon [3 options]
* Customizable Avatar as Character Icon [Upload Image]
* User Log In
* Globally consistent game.
* Multi-player Options [Renders other players, game consistent]
* Messaging Function (Contact other players)
* Music based on time of day.
* Some sort of JS function that allows a user to enter their own Google maps API Key?
