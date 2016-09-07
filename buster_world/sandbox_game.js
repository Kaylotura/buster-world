/**
 * Generated from the Phaser Sandbox
 *
 * http://phaser.io/sandbox/sikOMpLu
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';


    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');
    game.load.image('ball', 'sprites/pangball.png');

}





var player;
var platforms;
var cursors;
var jumpButton;
var image;

function create() {

    player = game.add.sprite(100, 200, 'player');
    ball = game.add.sprite(300, 300, 'ball')



    game.physics.arcade.enable([player, ball]);

    player.body.collideWorldBounds = true


    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    ball.body.velocity.setTo(200, 200);
    ball.body.collideWorldBounds = true;
    
    
    ball.body.bounce.setTo(1, 1);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

   if (cursors.up.isDown)
    {
        player.body.velocity.y = -300;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y =  300;
    }
    else if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
    }
    else
    {
        player.body.velocity.setTo(0, 0);
    }

    game.physics.arcade.collide(player, ball);
    game.physics.arcade.collide(platforms, ball);
}

function render () {

}
