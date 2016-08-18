# Proposal: Buster World

**Buster World** is a web application that allows players to take on the role of an enthusiastic explorer-hero, seeking to pop the demoralizing bubbles that are tormenting the world in  a location-based augmented reality game. Some major inspirations for this game are Ingress, Pokemon Go, and [Buster Bros](https://www.youtube.com/watch?v=ulfIohdFv08).

Upon starting up Buster World the player sees a start screen, where they can press the start button to begin. Once they’ve begun, they will need to enter a unique name of 1 - 20 characters which will be used to record their score. Their screen will then render a map in real time based on their GPS location, with a character icon centered at their location.  They may rotate the character icon to face in different directions by implementing commands from a control pad-button displayed. They can also launch grapples at nearby bubbles in attempt to pop them. There will be several large bouncing bubbles that display on screen that will bounce around the character’s local area. Character will be able to launch grappling hooks with a tailing chain that pops bubbles into smaller faster bubbles, but is disrupted by bubbles. For each bubble popped, the character's score increases. 

## Specific Functionality

### Start Page
The start page will have a button that will link to the name page which leads to the game page, and will list the top 5 scores and the name of the character who earned them in a vertical list underneath the start button. The start button links to the Name Page.

### Name Page
When the start button is pressed, the Name Page will appear, with a field to enter any given name of 1-20 characters. The name is used record their score for the Start Page and the Score Menu. Once a name is entered and the Go button is pushed, the player is linked to the Game page.

### Game Page
Here the player sees the map, bubbles, and character icon. The player uses this screen to play the game. In the center of the screen is their icon from which they may tap to fire their grapple hooks. In the left hand corner there will be two rotational arrows, one clockwise, the other counterclockwise, used to rotate their central icon so that they may fire at bubbles in any direction. In the bottom right corner of the the page there will be a Menu button that links to the Scores Page. In the top right corner of the page there will be a Resolve Meter  displaying zero to three shields a point of resolve (see below). The game page will also display the bouncing bubbles, buildings, and player's actual location as a top down map (similar to goolge maps or ingress).

### Scores Menu
Here the player can scroll through all the scores logged in the game for the past 7 days. They will be listed vertically starting with the highest score first and descending order from there. By each score will be the name of the  player (as entered in the Name page) who earned that particular score. At the top of the page there will be a Game Button that links back to the Game Page.


### Game Over Page
A page displaying that the game is over, and showing the player's score as well as a Play Again button, that leads to another game from the Game Page.

## Data Model

### Character
Each character is another instance of playing the game, the character has many properties
* Unique ID (For tracking purposes)
* Resolve (A number between 0 and 3. Starting at 3, each time struck by a bubble, the character reduces their resolve by 1. At 0 the game is over)
* Name (A string of 1-20 characters that represents the character in the Scores Menu and Start Page)
* Score (An int representing how well the player is doing)
* Icon (An image that is rendered on the World screen)
* Strike Box (A set of coordinates that if a bubble shares, damages character's resolve by 1)
* Location (Coordinates representing where to render the Icon on the World)
* Facing (The direction a character is facing, which is which direction to launch grapple)
* Inventory (A track of what upgrades a character has access to)

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
* Value (How much the bubble is worth if poped)

### Chain
A long trailing chain launched from the character that pops bubbles.
* Location (Coordinates representing where to render the object in the game)
* Icon (An image representing the chain to be rendered on World screen)
* Length (How long the chain is)
* Strike Box (Defines the full space of the chain. If the chain's strike box interacts with a bubble's strike box it pops the bubble, spawning two smaller faster bubbles and increases the character's score. This also removes the chain from play.)

## Technical Components

Much of the game is going to take place in Python, whereas JavaScript will do much of the rendering through JQuery.

The objects of the game will largely interact as Python classes; this would include Character, Bubbles, and Chains. Most of the game engine will be hosted in Python modules as well, including the random creation of Bubbles; how Bubbles, Characters, and Chains all interact; the limit on using one chain at a time; and ending the game when the player gets to 0 resolve.

Through the use of Javascript will be used to render the game, largely through JQuery, the Google Maps API, and the Geolocations API. I will also be using the BlockJS framework to structure Strike Boxes in order to initiate the interactions between Bubbles, Characters, Chains, and Buildings. I anticipate being able to animate the game using Javascript and Jquerey alone, but if I run into any stumbling blocks I can turn to some of the useful libraries listed below.

I also anticipate much of the HTML and CSS to be relatively minimal, but rendered in realtime through Jquery and DOM Manipulation.

Players Scores will be stored and searched using Django Models in a database.

Potentially useful libraries include [pygame](http://www.pygame.org/hifi.html), [Sound Manager 2](http://www.schillmania.com/projects/soundmanager2/), [CraftyJS](http://craftyjs.com/), and [Stage.js](http://piqnt.com/stage.js/). 

## Schedule (34 days)
* Geolocational Game Page - Medium - 2 days
* Bubble Class - Easy - 1/2 day
* Bubble Sprites - Medium - 2 days
* Character Class - Easy - 1/2 day
* Character Sprite - Easy 1/2 day
* Bubble Generator Module - Medium - 2 days
* *Super minimal game experience (Character on screen & Bubbles Appear Randomly Static)*
* Bubble Animation JS - Hard - 3 days
* Bubble Hit Box JS- Easy - 1 day
* Character Hit Box JS- Easy - 1 day
* Bubble & Character Interaction Module - Medium - 2 days
* Resolve Level & Game Over Function/Module - Easy - 1/2 day
* Display Resolve Meter JS- Easy - 1 day
* *Minmial game experience (Character can dodge around moving bubbles)*
* Name Page JS- Easy - 1/2 Day
* Display Name JS- Easy - 1/2 Day
* Rotation Buttons Module JS- Easy - 1 day
* Rotation Character Action JS- Medium - 2 days
* Chain Class - Medium - 2 days
* Chain Animation - Hard - 3 days
* Chain Sprite - Easy - 1/2 day
* Chain Hit Box - Easy - 1 day
* Chain Bubble Interaction - Medium - 2 days
* Score Menue - Easy - 1/2 day
* *Game Experience sans fleshing out*
* Assign Bubbles value - Easy - 1/2 day
* Database - Hard? - 5 days

##Future Goals
* Buildings as Objects that chains stick to and Bubbles bounch off of.
* Music (Midi Music) 
* Sound Effects
* Four upgrade grapples [Includes new menue and Upgrade drops]
  * Standard
  * Double (can shoot 1 grapple while a grapple is already shot)
  * Hook (Pops 2 bubbles instead of 1)
  * Laser (Shorter 'chain' but can fire up to 5 chains)
* Four upgrade foods [Includes new menue and Upgrade drops]
  * Apple (Pops all bubbles on screen down to smallest size)
  * Kale (+1 Resolve, not limited to 3)
  * Radish (Immune to next 2 Bubble hits)
  * Banana (Reduces Speed of all bubles to 0 for 3 seconds)
* Distractions (Different type of bubbles or targets that grapples can interact with)
  * Pointy Snail (If chain interacts with Pointy Snail, Pointy snail comes to Icon, and reduces Resolve)
  * Swooping Hawk (Quickly flies around popping bubbles but offering no points to the player)
  * Flying Owl (Flies through screen. Disperses chain like bubble, but offers no points
* Customizable Avatar as Character Icon [3 options]
* Customizable Avatar as Character Icon [Upload Image]
* User Log In
* Multiplayer Options [Renders other players, game consistent]
* Messaging Function (Contact other players)
* Music based on time of day.
