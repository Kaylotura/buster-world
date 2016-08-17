# Proposal: Buster World

**Buster World** is a web application that allows players to take on the role of an enthusiastic explorer, seeking to pop the demoralizing bubbles that are tormenting the world.

Upon starting up Buster World the player sees a start screen, where they can press the start button to begin. Once they’ve begun, they will need to enter a unique name of 1 - 20 characters which will be used to record their score. Their screen will then render a map in real time based on their GPS location, with a Buster Character icon centered at their location.  They may spin the character icon to point in different directions by implementing commands from a control pad-button displayed. They can also fire grapples at nearby bubbles in attempt to pop them. There will be several large bouncing bubbles that display on screen that will bounce around the character’s local area. Buildings will be hard objects that the character will be able to fire grapples to create a line of chain between themself and the bubble. The chain pops bubbles into smaller faster bubbles, but is disrupted by bubbles and buildings. There will also be randomly generated food items and grapple power-ups that will aid the player in racking up a high score.


Ideally I’m seeking to recreate [Buster Bros](https://www.youtube.com/watch?v=ulfIohdFv08) as a location-based augmented reality game, in the same vein as Ingress and Pokemon Go.

## Specific Functionality

### Start Page
The start page will have a button that will link to the name page which leads to the game page, and will list the top 5 scores in a vertical list underneath the start button.

### Name Page
When the start button (link) is pressed, the Name Page will appear, with a field to enter any given name. The name is used to track the player as a unique individual and to record their score for the Start Page and the Score Page. Once a Name is entered, and the go button is pushed, the player is linked to the Game page.

### Game Page
Here the player sees the map, bubbles, and icon. The uses this screen to play the game. In the center of the screen is their icon from which they may tap to fire their grapple hooks. On the page there will be a Menu button, a display of their current Grapple, two turn buttons, and a life meter in the top right corner. The menu button links to the Scores Menu.

<!-- ### Grapple Menu (Future Project)
Here the player has four buttons to change their grapple based on what they've picked up. If they've picked up nothing, they'll only have the standard grapple option. Each displayed grapple (Standard, Twin, Hook, Laser) is a link back to the Game Page, where the player will proceed to use that device. There will also be a Game Button that leads back to the Game Page without using a Grapple, a Food Button that links to the Food Menu, and a Scores button that leads to the Score Menu. -->

<!-- ### Food Menu (Future Project)
Here the player has four buttons to eat various foods that they've picked up. If they've picked up nothing, there will be no food displayed. Each food button (Kale, Radish, Apple, Banana) is a link back to the Game Page where the player gains the benefit of the food for a limited duration. There will also be a Game Button that links back to the Game Page without using a Food, a Grapple Button that links to the Grapple Menu and a Scores Button that links to the Scores Menu. -->

### Scores Menu
Here the player can scroll through all the scores logged in the game for the past 7 days. They will be listed vertically starting with the highest score first and descending order from there. By each score will be the player's name (as entered in the Name page) who earned that particular score. At the top of the page there will be a Game Button that links back to the Game Page.


### Game Over Page
A brief page displaying that the game is over, and showing the player's score before they are lead back to the Start page.

## Data Model

### Character
Each character is another instance of playing the game, the character has many properties
* Unique ID
* Resolve (A number between 0 and 3. Starting at 3, each time struck by a bubble, the character reduces their resolve by 1. At 0 the game is over)
* Name (A string of 1-20 characters that represents the character in the Scores Menu and Start Page)
* Score (An int representing how well the player is doing)
* Avatar (An image that is rendered on the World screen)
* Hit Box (A set of coordinates that if a bubble shares, damages character's resolve by 1)
* Location (Coordinates representing where to render the Icon on the World)
* Facing (The direction a character is facing, which is which direction to launch grapple)
* Inventory (A track of what upgrades a character has access to)
  *

### World
The visual background and setting of the game.
* Map (The map is a rendering of the local around the players location using a library similar to OpenLayers)
* Building Icons
* Bubble Icons
* Character Icons

### Buildings
Buildings are structures that Bubbles and Chains relate to. They will be based on buildings in real life. Buildings don't have there own avatars, as they should be rendered by the world object.
  * Location (Coordinates representing where to render the object in the game)
  * Strike Box (Defines the full space of the building)

### Bubbles
Large round bubbles that bounce around the world setting and lower the player's resolve on contact.
* Avatar (An image representing the bubble to be rendered on World screen)
* Location (Coordinates representing where to render the object in the game)
* Hit Points (Ranges from 5 to 0. Each strike of a chain reduces this by one and reduces the size of the bubble, but spawns an identical bubble, and increases the speed of both bubbles.)
* Strike Box (Defines the full space of the Bubble, if the bubble's strike box interacts with the player' Hit Box the player loses a resolve, and the bubble bounces away. If the bubble's strike box interacts with a building's strike box the bubble bounces away. If a bubble's strike box interacts with another bubble's strike box both bubbles bounce away. This is based on Hit Points)
* Speed (How quickly the bubble moves across the screen, based on Hit Points)
* Value (How much the bubble is worth if poped)

### Chain
A long trailing chain launched from the character that pops bubbles and sticks to buildings.
* Location (Coordinates representing where to render the object in the game)
* Avatar (An image representing the chain to be rendered on World screen)
* Length (How long the chain is)
* Strike Box (Defines the full space of the chain. If the chain's strike box interacts with a bubble's strike box it pops the bubble, spawning two smaller faster bubbles and increases the character's score. This also removes the chain from play. If the chain's Strike Box interacts with a Building's strike box, the chain will latch on to that, and exist for 3 seconds, or until a bubble interacts with the chain.)

## Technical Components




##Future Goals
Customizable Avatar as Character Icon
Multiplayer Options
Four upgrade grapples (Standard, Double, Hook, Laser)
Four upgrade foods (Apple [Dynamite], Kale [+1 Resolve], Radish [Shield], Banana [Time Stop])
Add Distractions to game such as Pointy Snail, Swooping Hawk, Flying Owl.
Messaging Function
Music (Midi Music)
Sound Effects
