 /**
 * Buster World: The Game.
 * This file uses Phaser 2.6.2 to create a bubble busting game to be rendered
 * over a google map.
 *
 * Its worth noting that 'use strict'; intereupts some of the Phaser functions.
 */


 //Silences Linter on Library Variables
'use strict';
if (!window) {
  var Phaser;
  var preload;
  var create;
  var update;
  var render;
  var girlIcon;
  var wideChainIcon;
  var bubbleIcon;
  var shieldIcon;
  var x;
}


/**
 * A function that tests for geolocation permission. If it cannot use the
 * browser's geolocation, it raises an alert. Otherwise it finds the user's
 * location and passes it to any given function.
 */
function runGeolocationFunction(secondFunction) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(secondFunction);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}


// This Initiates the Phaser Game Object, using the preload, create, update,
// and render functions listed below.
var game = new Phaser.Game(320, 480, Phaser.AUTO, 'game',
{preload: preload, create: create, update: update, render: render}, true);


/**
 * A Phaser.js specific function that contains all of the information that the
 * game will need to parse before it renders.
 */
function preload() {
  game.load.image('player', girlIcon);
  game.load.image('wideChain', wideChainIcon);
  game.load.image('bubble', bubbleIcon);
  game.load.image('shield', shieldIcon);
}


// The list of variables that the game will use
var player;
var hookShot;
var bubbles;
var ball;
var smallBall1;
var smallBall2;
var hook;
var scoreText;
var scoreString;
var resolve;
var resolveText;
var resolveString;
var startingPoint;
// var debugData;
// var debugText;
// var debugString;
var score = 0;
var gameTimer = 1;
var comboTracker = {'size': 0, 'combo': 0};


// > getStartingPoint({coods: {longitude: 3, lattide: 5}});
// {'x': 3, 'y':5}
/**
 * This function takes in a nested position object that contains logitudinal and
 * latitudal positions, and defines them as part of a new object that is used
 * to define where on the game-map the player should start, and is also used to
 * discover all movement the player makes.
 */
function getStartingPoint(position) {
  var xPointStart =  position.coords.longitude;
  var yPointStart =  position.coords.latitude;
  startingPoint = {'x': xPointStart, 'y': yPointStart};
  return startingPoint;
}

// This runs the function constructed above.
runGeolocationFunction(getStartingPoint);


/**
 * A Phaser specific function that contains all of the information that the
 * game will need to create aparent objects and effects.
 */
function create() {

  // Creates the Player
  player = game.add.sprite(game.width / 2, game.height / 2, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.anchor.set(0.5);
  player.rotation = game.physics.arcade.angleToPointer(player);

  // Creates a Bubbles Group
  bubbles = game.add.physicsGroup(Phaser.Physics.ARCADE);

  // Creates a Hookshot "weapon"
  hookShot = game.add.weapon(1, 'wideChain');
  hookShot.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  hookShot.bulletSpeed = 400;
  hookShot.fireRate = 100;
  hookShot.trackSprite(player, 0, 0, true);

  //  Creates the Score and the Score Keeping Text
  scoreString = 'Catharsis : ';
  scoreText = game.add.text(10, 10, scoreString + score, {font: '22px Ariel',
  fill: '#CC3300'});

  // Creates the Resolve, the Resolve Keeping Text, and the little shields
  resolve = game.add.group();
  resolveString = 'Resolve';
  resolveText = game.add.text(game.world.width - 105, 10,
    resolveString, {font: '22px Ariel', fill: '#CC3300'});
  for (var i = 0; i < 3; i++) {
    var shield = resolve.create(game.world.width - 120 + 50 * i, 60, 'shield');
    shield.anchor.setTo(0.5, 0.5);
  }

  // // Creates a Debug String to see Long/Lat/X/Y
  // debugData = '';
  // debugString = ' Lng/Lat & X/Y : ';
  // debugText = game.add.text(10, 100, debugString + debugData,
  //   {font: '10px Ariel', fill: '#CC3300'});


// // Creates Player's Combo and their Combo String.
//   comboString = 'Combo[Size/String] : ';
//   comboText = game.add.text(game.world.width -500, 50, comboString + comboTracker['size']+ comboTracker['combo'],
//    { font: '34px Ariel', fill: '#CC3300' });


/**
 * This function creates a single instance of a "ball," and individual object
 * in the Bubbles group. Each ball created is made within 50 and 400 pixils of
 * the player, has a random velocity between 0 and 60 pixels per frame in any
 * direction and is set to be between Large, Medium, and Small (but never Tiny)
 * The ball is also given a random Tint Color.
 */
  function createBall() {
    ball = bubbles.create(
      player.x + game.rnd.integerInRange(50, 400),
      player.y + game.rnd.integerInRange(50, 400),
      'bubble'
    );
    ball.body.velocity.set(game.rnd.integerInRange(-60, 60),
      game.rnd.integerInRange(-60, 60));
    ball.scale.setTo(game.rnd.pick([2, 2, 2, 2, 1, 1, 1, 0.5, 0.5]));
    ball.tint = Math.random() * 0xffffff;
  }


  // Creates a Game-Time Event that Creates Bubbles!
  game.time.events.repeat(Phaser.Timer.SECOND * 5, 1000, createBall, this);

}

/**
 * A Phaser specific function that contains all of the information that the
 * game will process while its running, in order to update the game. The update
 * function runs on every frame that the game displays (roughly 60/second).
 */
function update() {


  /**
   * Takes in an html field class as an argument and removes the invisble class
   * from all elements that have the given input class.
   */
  function unhideField(inputclass) {
    $(inputclass).removeClass('invisible');
  }


  /**
   * Takes in a field id as an argument and removes the invisble class from all
   * elements that have the given input class.
   */
  function hideField(inputid) {
    $(inputid).addClass('invisible');
  }


  /**
   * Returns the game time in 100th of seconds.
   */
  function getPrettyTime() {
    var time = this.game.time.totalElapsedSeconds();
    var workingTime = time * 10;
    var stillWorkingTime = Math.floor(workingTime);
    var prettyTime = stillWorkingTime / 10;
    return prettyTime;
  }


 /**
  * When a player runs out of resolve and takes a hit from a bubble, they lose
  * the game, which pulls up the game over form/field.
  */
  function gameOver() {
    var time = getPrettyTime();
    player.kill();
    bubbles.callAll('kill');
    $('#player_score').val(score);
    $('#player_time').val(time);
    hideField('#map');
    hideField('#game');
    unhideField('.game_over');
  }


/**
  * This function takes in a player sprite and ball sprite that have overlapped
  * as a pair of arguments. The ball is popped, and the player loses one of
  * their resolve shields.
  */
  function bubbleHurtsPlayer(player, ball) {
    ball.kill();
    // hookShot.bullets.kill();
    var firstShield = resolve.getFirstAlive();
    if (firstShield) {
      firstShield.kill();
    }
  }


 /**
  * This function takes in a nested position object that contains logitudinal
  * and latitudal positions, and uses a simple algorthym to calculate it's
  * x and y corrdinates on the game-map. To complicate things, the game map
  * isn't centered on 0,0, but rather so the game's center x value and center y
  * value is taken into account. once the new position is calculated, the player
  * sprite moves towards it at 400 pixels/second.
  */
  function movePlayer(position) {
    var intX =  18 * (800 / 360 * (180 + position.coords.longitude)) -
      18 * (800 / 360 * (180 + startingPoint['x'])) + game.width / 2;
    var intY = 18 * (600 / 180 * (90 - position.coords.latitude)) -
      18 * (600 / 180 * (90 - startingPoint['y'])) + game.height / 2;
    game.physics.arcade.moveToXY(player, intX, intY, 400);

    // // Updates Debug String with current position/XY relationship
    // var debugData = String(position.coords.longitude) + '/' +
    // String(position.coords.latitude) + '&' + String(intX) + String(intY);
    // debugText.text = debugString + debugData;

    // // A Debug Test to see if the player will move at all.
    // game.physics.arcade.moveToXY(player, game.rnd.integerInRange(-200, 200),
    //   game.rnd.integerInRange(-200, 200), 400);
  }


 /**
 * Takes in a ball and a chain as a pair of arguments from a chain and ball that
 * have overlapped. The ball and chain are destroyed. If the ball's scale is
 * greater than 1/4, two new balls are created at half the previous ball's
 * scale, but 150% of its velocity in opposite directions. The player's score
 * then increases relative to their current combo and the scale of the ball
 * popped.
 */
  function chainPopsBubble(ball, chain) {
    if (ball.scale.x > .25) {
      smallBall1 = bubbles.create(ball.world.x, ball.world.y, 'bubble');
      smallBall1.scale.setTo(ball.scale.x / 2, ball.scale.y / 2);
      smallBall1.body.velocity.set(ball.body.velocity.x * 1.5,
        ball.body.velocity.y * -1.5);
      smallBall1.tint = ball.tint;
      smallBall2 = bubbles.create(ball.world.x, ball.world.y, 'bubble');
      smallBall2.scale.setTo(ball.scale.x / 2, ball.scale.y / 2);
      smallBall2.body.velocity.set(ball.body.velocity.x * -1.5,
        ball.body.velocity.y * 1.5);
      smallBall1.tint = ball.tint;
    }

    // Track Combo
    if (ball.scale.x === comboTracker['size']) {
      if (comboTracker['combo'] < 4) {
        comboTracker['combo'] += 1;
      }
    } else {
      comboTracker['combo'] = 1;
      comboTracker['size'] = ball.scale.x;
    }
  // comboText.text = comboString + comboTracker['size'] + '||' + comboTracker['combo'];


    // Increase the Score
    score += 1 / ball.scale.x * comboTracker['combo'] * 100;
    scoreText.text = scoreString + score;
    ball.kill();
    //chain.kill();
  }


  // Controlls for Game
  player.rotation = game.physics.arcade.angleToPointer(player);
  if (game.input.activePointer.isDown) {
    hookShot.fire();
  }


  // On even frames the player moves towards their geolocational XY point (
  // as defined by moveToLocation), and on the odd frames the player moves to
  // their own position.
  // This is because Phaser has no animation that can be stopped, and restarted
  // in thier Update Function.
  if (gameTimer % 2 === 0) {
    game.physics.arcade.moveToXY(player, player.x,
     player.y, 1);
  } else {
    runGeolocationFunction(movePlayer);
  }


  // Counts the fames that have passed
  gameTimer += 1;


  //Defines the game physics of bubbles and their bouncing
  bubbles.setAll('body.collideWorldBounds', true);
  bubbles.setAll('body.bounce.x', 1);
  bubbles.setAll('body.bounce.y', 1);
  game.physics.arcade.collide(bubbles);


  // What happens when the player, bubbles, or the chain interact/collide.
  game.physics.arcade.overlap(player, bubbles, bubbleHurtsPlayer, null, this);
  game.physics.arcade.overlap(bubbles, hookShot.bullets,
    chainPopsBubble, null, this);


  // When the player loses all of their resolve,  Game Over
  if (resolve.countLiving() < 1) {
    gameOver();
  }

}

/**
* Phaser Js Function, required to render the game despite having no arguments,
* or information passed in.
*/
function render() {
}
