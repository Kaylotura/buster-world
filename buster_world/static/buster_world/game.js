 /**
 * Buster World: The Game.
 * This file uses Phaser 2.6.2 to create a bubble busting game to be rendered
 * over a google map.
 *
 * Its worth noting that 'use strict; doesn't seem to play nicely with phaser's
 * methods.
 */

//  //Silences Linter on Library Variables
// 'use strict';
// if (!window) {
//   var Phaser;
//   var preload;
//   var create;
//   var update;
//   var render;
//   var girlIcon;
//   var wideChainIcon;
//   var bubbleIcon;
//   var shieldIcon;
//   var x;
// }

// This Initiates the game, using the preload, create, update,
// and render functions.
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
var resolveString;
var startPoints;
var debugData;
var debugText;
var debugString;
var quitButton;
var score = 0;
var gameTimer = 1;
var chainCount = false;
var comboTracker = {'size': 0, 'combo': 0};


/**
 * A qucikly crafted initiate starting point of game function.
 *
 * Could be handled more elegantly
 */
function setStartPoints(position) {
  var xPointStart =  position.coords.longitude;
  var yPointStart =  position.coords.latitude;
  startPoints = {'x': xPointStart, 'y': yPointStart};
  return startPoints;
}

/**
 * A qucikly crafted initiate starting point of game function.
 *
 * Could be handled more elegantly
 */
function initiateStartPoint() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setStartPoints);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

initiateStartPoint();


/**
 * A Phaser.js specific function that contains all of the information that the
 * game will need to create aparent objects and effects.
 */
function create() {

  // Creates the Player
  player = game.add.sprite(game.width / 2, game.height / 2, 'player');
  // player = game.add.sprite(0, 0, 'player');
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

  //  The Score
  scoreString = 'Catharsis : ';
  scoreText = game.add.text(10, 10, scoreString + score, {font: '22px Ariel',
  fill: '#CC3300'});

  //  Player's Resolve
  resolve = game.add.group();
  resolveString = 'Resolve';
  var resolveText = game.add.text(game.world.width - 105, 10,
    resolveString, {font: '22px Ariel', fill: '#CC3300'});
  for (var i = 0; i < 3; i++) {
    var shield = resolve.create(game.world.width - 120 + 50 * i, 60, 'shield');
    shield.anchor.setTo(0.5, 0.5);
  }


  // Debug: Long/Lat & X/Y
  debugData = '';
  debugString = ' Lng/Lat & X/Y : ';
  debugText = game.add.text(10, 100, debugString + debugData,
    {font: '10px Ariel', fill: '#CC3300'});



// //  Player's Combo
//   comboString = 'Combo[Size/String] : ';
//   comboText = game.add.text(game.world.width -500, 50, comboString + comboTracker['size']+ comboTracker['combo'],
//     { font: '34px Ariel', fill: '#CC3300' });

/**
 * This function creates a single instance of a "ball," and individual object
 * in the Bubbles group. Each ball created is made within 50 and 400 pixils of
 * the player, has a random velocity between 0 and 60 pixels per frame in any
 * direction and is set to be between Large, Medium, and Small (but never Tiny)
 * The ball is also given a random Tint Color.
 */
  function createBall() {
    //  A bouncey ball sprite just to visually see what's going on.
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

  // Debug Quit Button
  quitButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

/**
 * A Phaser.js specific function that contains all of the information that the
 * game will process while its running, in order to update the game live.
 */
function update() {
  bubbles.setAll('body.collideWorldBounds', true);
  bubbles.setAll('body.bounce.x', 1);
  bubbles.setAll('body.bounce.y', 1);
  game.physics.arcade.collide(bubbles);
  game.physics.arcade.overlap(player, bubbles, bubbleHurtsPlayer, null, this);
  game.physics.arcade.overlap(bubbles, hookShot.bullets,
    chainPopsBubble, null, this);

  // Initiates player movement
  if (gameTimer % 2 === 0) {
    game.physics.arcade.moveToXY(player, player.x,
     player.y, 1);
  } else {
        moveToLocation();
  }

  /**
   * Sets the player's position to xLat and yLong, and then moves the player.
  */
  function movePlayer(position) {
    var intX =  18 * (800 / 360 * (180 + position.coords.longitude)) -
      18 * (800 / 360 * (180 + startPoints['x'])) + game.width / 2;
    var intY = 18 * (600 / 180 * (90 - position.coords.latitude)) -
      18 * (600 / 180 * (90 - startPoints['y'])) + game.height / 2;
    game.physics.arcade.moveToXY(player, intX, intY, 400);
    var debugData = String(position.coords.longitude) + '/' +
    String(position.coords.latitude) + '&' + String(intX) + String(intY);
    debugText.text = debugString + debugData;

    // game.physics.arcade.moveToXY(player, game.rnd.integerInRange(-200, 200),
    //  game.rnd.integerInRange(-200, 200), 400);

    // game.add.tween(player).to({x: intX, y: intY}, 4000,
    //    Phaser.Easing.Linear.None, true);
  }

  /**
   * Gets player's location and passes it to Move Player.
  */
  function moveToLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(movePlayer);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  gameTimer += 1;


 player.rotation = game.physics.arcade.angleToPointer(player);
      if (game.input.activePointer.isDown)
      {
          hookShot.fire();
      }

 /**
 * Manages sprite collision between the chain and any given bubble.
 */
  function chainPopsBubble(ball, chain) {

  // make children bubbles if parent bubble wasn't too small
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
    // chain.kill();
  }


  /**
   * Takes in a class as an argument and removes the invisble class from all
   * elements that have the given input class.
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
   * When the game is lost, or quit, this function is called. It removes the player icon, and displays the "Game Over"
   * text and uses jquery to unhide and populate the game-over form.
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

  //Debug Game Over Quit Button
  if (quitButton.isDown) {
    gameOver();
  }


 /**
  * Manages sprite collision between the chain and any given bubble.
  */
  function bubbleHurtsPlayer(player, ball) {

  //  When a bubble hits the player, one point of resolve is taken away, and the bubble is destroyed.
  // If the player has 0 resolve, they die!
    ball.kill();
    var firstShield = resolve.getFirstAlive();
    if (firstShield) {
      firstShield.kill();
    }
    if (chainCount === true) {
      hook.kill();
      chainCount = false;
    }

    // When the player loses all of their resolve
    if (resolve.countLiving() < 1) {
      gameOver();
    }
  }
}

/**
* Phaser Js Function, required to render the game despite having no arguments,
* or information passed in.
*/
function render() {
}
