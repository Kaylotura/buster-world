/** This handles the creation of the game aspect of the game.
 *
 * The use of 'use strict'; seems to break phaser.js, so for the time being I will not be using it.
 *
 * Commonly recommended syntax with phaser.js is to split a game into multiple js files. I need to do this.
 *
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload,
  create: create, update: update, render: render }, true);

/** Preloads several of the images and varaibles to be used with the Phaser
* script
*/
function preload() {
  game.load.image('chain', chain_icon);
  game.load.image('orb', orb_icon);
  game.load.image('hero', girl_icon);
  game.load.image('bubble', bubble_icon);
  game.load.image('shield', shield_icon);
}

var player;
var bubbles;
var chains;
var launchTime = 0;
var cursors;
var hookshotButton;
var quitButton;
var score = 0;
// var gameTime = 0;
var scoreString = '';
var scoreText;
var resolve;
var enemyOrb;
var orbTimer = 0;
var stateText;
var remainingBubbles = [];

/** Uses several of Phaser's methods to create objects in the game.
*/
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  The chain group
  chains = game.add.group();
  chains.enableBody = true;
  chains.physicsBodyType = Phaser.Physics.ARCADE;
  chains.createMultiple(1, 'chain');
  chains.setAll('anchor.x', 0.5);
  chains.setAll('anchor.y', 1);
  chains.setAll('outOfBoundsKill', true);
  chains.setAll('checkWorldBounds', true);

  // The enemy's orbs
  enemyOrbs = game.add.group();
  enemyOrbs.enableBody = true;
  enemyOrbs.physicsBodyType = Phaser.Physics.ARCADE;
  enemyOrbs.createMultiple(30, 'orb');
  enemyOrbs.setAll('anchor.x', 0.5);
  enemyOrbs.setAll('anchor.y', 1);
  enemyOrbs.setAll('outOfBoundsKill', true);
  enemyOrbs.setAll('checkWorldBounds', true);

  //  The hero!
  player = game.add.sprite(400, 500, 'hero');
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  //  The baddies!
  bubbles = game.add.group();
  bubbles.enableBody = true;
  bubbles.physicsBodyType = Phaser.Physics.ARCADE;
  createBubbles();

  //  The score
  scoreString = 'Score : ';
  scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

  //  Resolve
  resolve = game.add.group();
  game.add.text(game.world.width - 130, 10, 'Resolve : ', { font: '34px Arial', fill: '#fff' });

  //  Text
  stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;

  for (var i = 0; i < 3; i++) {
    var hero = resolve.create(game.world.width - 100 + 30 * i, 60, 'shield');
    hero.anchor.setTo(0.5, 0.5);
  }

  //  And some controls to play the game with
  cursors = game.input.keyboard.createCursorKeys();
  hookshotButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // Quit Button is just for Debugging Purposes
  quitButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
}


/**
  * Handles the Creation of Bubbles
  */
function createBubbles() {
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 10; x++) {
      var bubble = bubbles.create(x * 48, y * 50, 'bubble');
      bubble.anchor.setTo(0.5, 0.5);
      bubble.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
      bubble.play('fly');
      bubble.body.moves = false;
    }
  }

  bubbles.x = 100;
  bubbles.y = 50;

  // All this does is basically start the bubbles moving. Notice we're moving
  // the Group they belong to, rather than the bubbles directly.
  var tween = game.add.tween(bubbles).to( { x: 200 }, 2000,
    Phaser.Easing.Linear.None, true, 0, 1000, true);
}

function setupBubble(bubble) {
  /**
  * Sets up the Bubbles
  */
  bubble.anchor.x = 0.5;
  bubble.anchor.y = 0.5;
}

/**
  * Updates the game
  */
function update() {
  if (player.alive) {

    //  Reset the player's velocity, then check for movement keys
    player.body.velocity.setTo(0, 0);
    if (cursors.left.isDown) {
      player.body.velocity.x = -200;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 200;
    }

    //  Launching Hookshot?
    if (hookshotButton.isDown) {
      launchChain();
    }

    //  Quiting?
    if (quitButton.isDown) {
      gameOver();
    }

    if (game.time.now > orbTimer) {
      enemyFires();
    }

    //  Run collision
    game.physics.arcade.overlap(chains, bubbles, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyOrbs, player, enemyHitsPlayer, null, this);

    // Keep Time
    game.debug.text('Time: ' + this.game.time.totalElapsedSeconds(), 10, 60);
  }

}

/**
 * Renders the Phaser JS scripts.
 */
function render() {
}

/**
 * Manages sprite collision.
 */
function collisionHandler(bullet, bubble) {

  //  When a chain hits an bubble we kill them both
  bullet.kill();
  bubble.kill();

  //  Increase the score
  score += 20;
  scoreText.text = scoreString + score;

  if (bubbles.countLiving() === 0) {
    score += 1000;
    scoreText.text = scoreString + score;

    enemyOrbs.callAll('kill',this);
    stateText.text = 'You Won, \n Click to restart';
    stateText.visible = true;

    //the "click to restart" handler
    game.input.onTap.addOnce(restart,this);
  }
}


/**
 * Manages event if player is hit.
 */
function enemyHitsPlayer(player,bullet) {

  bullet.kill();
  live = resolve.getFirstAlive();
  if (live) {
      live.kill();
  }

    // When the player loses all of their resolve
  if (resolve.countLiving() < 1) {
    gameOver();
  }

}

/**
 * Manages enemy attacks.
 */
function enemyFires() {

  //  Grab the first orb we can from the pool
  enemyOrb = enemyOrbs.getFirstExists(false);
  remainingBubbles.length = 0;
  bubbles.forEachAlive(function(bubble) {
      // put every living enemy in an array
    remainingBubbles.push(bubble);
  });

  if (enemyOrb && remainingBubbles.length > 0) {
    var random = game.rnd.integerInRange(0, remainingBubbles.length - 1);
    // randomly select one of them
    var shooter = remainingBubbles[random];
    // And fire the orb from this enemy
    enemyOrb.reset(shooter.body.x, shooter.body.y);
    game.physics.arcade.moveToObject(enemyOrb,player,120);
    orbTimer = game.time.now + 2000;
  }

}

/**
 * Manages hook shooting.
 */
function launchChain() {
  //  To avoid them being allowed to fire too fast we set a time limit
  if (game.time.now > launchTime) {
    //  Grab the first bullet we can from the pool
    bullet = chains.getFirstExists(false);
    if (bullet) {
        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        launchTime = game.time.now + 200;
    }
  }

}

/**
 * Resets weapon.
 */
function resetBullet(bullet) {
  //  Called if the bullet goes out of the screen
  bullet.kill();
}

/**
 * Restarts the game
 */
function restart() {
  //  A new level starts
  //resets the life count
  resolve.callAll('revive');
  //  And brings the bubbles back from the dead :)
  bubbles.removeAll();
  createBubbles();
  //revives the player
  player.revive();
  //hides the text
  stateText.visible = false;
}


/**
 * When the game is lost, or quit, this function is called. It removes the player icon, and displays the "Game Over"
 * text and uses jquery to unhide and populate the game-over form.
 */
function gameOver() {
  var time = getPrettyTime();
  player.kill();
  enemyOrbs.callAll('kill');
  stateText.text = 'GAME OVER';
  stateText.visible = true;
  unhideField('.game_over');
  $('#player_score').val(score);
  $('#player_time').val(time);
}


/**
 * Takes in a class as an argument and removes the invisble class from all elements that have the given input class.
 */
function unhideField(inputclass) {
  $(inputclass).removeClass('invisible');
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
