/**
 * Buster World: The Game.
 * This file uses Phaser 2.6.2 to create a bubble busting game to be rendered
 * over a google map.
 *
 * Eventually, the idea will be to use Google Map API data to render portions
 * of the game, so that the game and the map relate to one another.
 *
 * Its worth noting that 'use strict; doesn't seem to play nicely with phaser's
 * methods.
 */

 var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload,
   create: create, update: update, render: render }, true);

/**
 * A Phaser.js specific function that contains all of the information that the
 * game will need to parse before it renders.
 */
function preload() {
  game.load.image('player', girl_icon);
  game.load.image('chain', chain_icon);
  game.load.image('bubble', bubble_icon);
  game.load.image('shield', shield_icon);
}

var player;
var cursors;
var chains;
var bubbles;
var ball;
var hook;
var chainCount = false;
var chainGrow
var score = 0;
var resolve = 3;

/**
 * A Phaser.js specific function that contains all of the information that the
 * game will need to create aparent objects and effects.
 */
function create() {

  // Creates the Player!
  player = game.add.sprite(400, 300, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  // Creates a Bubbles Group
  bubbles = game.add.physicsGroup(Phaser.Physics.ARCADE);

  // Creats a Chains Group
  chains = game.add.physicsGroup(Phaser.Physics.ARCADE);

  // The Game's Controls
  cursors = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR
  );

  //  The score
  scoreString = 'Catharsis : ';
  scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Ariel', fill: '#CC3300' });

  //  Player's Resolve
  resolveString = 'Resolve : ';
  resolveText = game.add.text(game.world.width - 200, 10, resolveString + resolve, { font: '34px Ariel', fill: '#CC3300' });


  // Creates a Game-Time Event that Creates Bubbles!
  game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createBall, this);

  /**
   * Populates the game screen with bubbles.
   */
  function createBall() {
    //  A bouncey ball sprite just to visually see what's going on.
    ball = bubbles.create(game.world.randomX, game.world.randomY, 'bubble');
    ball.body.velocity.set(game.rnd.integerInRange(-200, 200),
    game.rnd.integerInRange(-200, 200));
  }
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
  game.physics.arcade.overlap(bubbles, chains, chainPopsBubble, null, this);
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  /**
  * Removes the chain sprite after it's reached the zennith of its animation.
  */
  function killChain() {
    hook.kill();
    chainCount = false;
  }

  /**
   * Handles the Chain Launching action.
   */
  function launchHook() {
    if (chainCount == false) {
      hook = chains.create(player.x, player.y, 'chain');
      hook.body.immovable = true;
      game.physics.arcade.enable(hook);
      chainGrow = game.add.tween(hook.scale).to({x: 1, y: -20} , 2000,
         Phaser.Easing.Linear.None, true);
      chainGrow.onComplete.add(killChain, this);
      chainCount = true;
    }
  }

  //Game Controls for Left/Right
  if (cursors.left.isDown) {
    player.body.velocity.x = -250;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 250;
  }

  //Game Controls for Up/Down
  if (cursors.up.isDown) {
    player.body.velocity.y = -250;
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 250;
  }

  //Game Spacebar
  if (fireButton.isDown) {
    launchHook();
  }


 /**
 * Manages sprite collision between the chain and any given bubble.
 */
  function chainPopsBubble(chain, ball) {

  //  When a chain hits an bubble we kill them both
  chain.kill();
  chainCount = false;
  ball.kill();

  //  Increase the score
  score += 20;
  scoreText.text = scoreString + score;
   }


 /**
  * Manages sprite collision between the chain and any given bubble.
  */
  function bubbleHurtsPlayer (player, ball) {

  //  When a bubble hits the player, one point of resolve is taken away, and the bubble is destroyed.
  // If the player has 0 resolve, they die!
  ball.kill();
  resolve -= 1;
  resolveText.text = resolveString + resolve;
  if (chainCount === true) {
    hook.kill();
    chainCount = false;
    }
  //  Decreases the score
  score -= 50;
  scoreText.text = scoreString + score;
  if (resolve === 0) {
  player.kill()
  }

  }



}


/**
 * Phaser Js Function, not needed yet, but prepared.
 */
function render() {
}
