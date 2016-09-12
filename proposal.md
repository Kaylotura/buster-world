# Proposal: Buster World

**Buster World** is a web application that allows players to take on the role of an enthusiastic explorer-hero, seeking to pop the demoralizing bubbles that are tormenting the world in a location-based augmented reality game. Some major inspirations for this game are Ingress, Pokemon Go, and [Buster Bros](https://www.youtube.com/watch?v=ulfIohdFv08).

Upon starting up Buster World the player sees a start screen, which will provide the basic instructions on how to play the game, a link to the highs-score page, and a a start button to begin the game. Once they’ve begun, they will need to enter a unique name of 1 - 20 characters which will be used to track their score. Their screen will then render a map in real time based on their GPS location, with a character icon centered at their location.  They may rotate the character icon to face in different directions by implementing commands from a control pad-button displayed. They can also launch grapples at nearby bubbles in attempt to pop them. There will be several large bouncing bubbles that display on screen that will bounce around the character’s local area. Character will be able to launch grappling hooks with a tailing chain that pops bubbles into smaller faster bubbles, but is disrupted by bubbles. For each bubble popped, the character's score increases.

## Specific Functionality

### Start Page
The start page will have a button that when clicked will reveal a hiden name form. Once the name form is filled out and submited, it will link to the game page. There will also be some basic isntructions over the start button/name form. And below the start button will be a link to the High Score Page.

### Game Page
Here the player sees the map, bubbles, and character icon. The player uses this screen to play the game. In the center of the screen is their icon from which they may tap to fire their grapple hooks. In the left hand corner there will be two rotational arrows, one clockwise, the other counterclockwise, used to rotate their central icon so that they may fire at bubbles in any direction. In the bottom right corner of the the page there will be a Menu button that links to the Scores Page. In the top right corner of the page there will be a Resolve Meter  displaying zero to three shields a point of resolve (see below). The game page will also display the bouncing bubbles, buildings, and player's actual location as a top down map (similar to goolge maps or ingress).

### High Score Page
Here the player can scroll through all the scores logged in the game for the past 7 days. They will be listed vertically starting with the highest score first and descending order from there. By each score will be the name of the  player (as entered in the Name page) who earned that particular score. At the top of the page there will be a link that leads back to the Start Page.

### Game Over Page
A page displaying that the game is over, and showing the player's score as well as a Play Again button, that leads to another game from the Game Page.

## Data Model

### Player Stats
Each instance of the game being played will be stored as a Player Stats model.
Each Player Stats moels has the following propreties.
* Player Name (Entered at the beginning of the game)
* Score (Gained throughout the playing of the game)
* Time (How long the player survived before the game ended) (This will be used for future achievements).


## Game Model

### Character
Information that represents the Character
* Resolve (A number between 0 and 3. Starting at 3, each time struck by a bubble, the character reduces their resolve by 1. At 0 the game is over)
* Name (A string of 1-20 characters that represents the character in the Scores Menu and Start Page)
* Score (An int representing how well the player is doing)
* Icon (An image that is rendered on the World screen)
* Time (A timed count of how long the player has been surviving)
* Location (Coordinates representing where to render the Icon on the World)
* Facing (The direction a character is facing, which is which direction to launch grapple)


### World
The visual background and setting of the game.
* Map (The map is a rendering of the local around the players location using a library similar to OpenLayers)
* Bubble Icons
* Character Icons

### Bubbles
Large round bubbles that bounce around the world setting and lower the player's resolve on contact.
* Icon (An image representing the bubble to be rendered on World screen)
* Location (Coordinates representing where to render the object in the game)
* Hit Points (Ranges from 5 to 0. Each strike of a chain reduces this by one and reduces the size of the bubble, but spawns an identical bubble, and increases the speed of both bubbles.)
* Strike Box (Defines the full space of the Bubble, if the bubble's strike box interacts with the player' Hit Box the player loses a resolve, and the bubble bounces away. If a bubble's strike box interacts with another bubble's strike box both bubbles bounce away. This is based on Hit Points)
* Speed (How quickly the bubble moves across the screen, based on Hit Points)
* Value (How much the bubble is worth if popped)

### Chain
A long trailing chain launched from the character that pops bubbles.
* Location (Coordinates representing where to render the object in the game)
* Icon (An image representing the chain to be rendered on World screen)
* Length (How long the chain is)
* Strike Box (Defines the full space of the chain. If the chain's strike box interacts with a bubble's strike box it pops the bubble, spawning two smaller faster bubbles and increases the character's score. This also removes the chain from play.)

### Final Score
While each character has a running tally of what their score is, when the character loses their final resolve, that score is to be saved within the database, so that it may be compared to other scores, and rendered as part of the Scores Menu and the Game page, this will allow the player to see who has reached the prized high score.

## Technical Components

Much of the game is going to take place in JavaScript, with the rendering handled with JQuery.

The objects of the game will largely interact through JavaScript structures; this would include Character, Bubbles, and Chains. Most of the game engine and logic will be hosted in JavaScript modules as well, including the random creation of Bubbles; how Bubbles, Characters, and Chains all interact; the limit on using one chain at a time; and ending the game when the player gets to 0 resolve.

Python will store character scores and be used to manipulate the data-base of character scores and the high scores amoung them.

I anticipate much of the HTML and CSS to be relatively minimal, with much of the game being rendered through Canvas and the PhaserJS libraries. I am not yet certain if I will be able to manipulate the Geolocations and GoogleMaps view into the Canvas for this, but I intend to look into work arounds to get this to funtion.
Players Scores will be stored and searched using Django Models in a database.
I also expect to be using the PhaserJS library to initiate the interactions between Bubbles, Characters, and Chains.

As for testing, I am interested in using MochaJS, as it seems to have promises as part of its basic packaging.

Potentially useful libraries include [pygame](http://www.pygame.org/hifi.html), [Gulp](http://gulpjs.com/), [melonJS](http://melonjs.org/), [CreateJS](http://createjs.com/), [Sound Manager 2](http://www.schillmania.com/projects/soundmanager2/), [CraftyJS](http://craftyjs.com/), and [Stage.js](http://piqnt.com/stage.js/).

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
* Get Gelocational Satelite view through canvas on game - Hard - 5 days
* Build out full game in Phaser - Medium/Hard - 3 days
* *Minmial game experience (Game takes place on gelocational map)*
* Manage to get physical movement to replace game cursers - Hard? - 5 days
* *Game Complete*
* Basic HTML & CSS Tidy-Up - Easy - 1/2 day
* *MVP*

##Future Goals
* Player Achievments based on time, maybe bubbles popped, etc.
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
