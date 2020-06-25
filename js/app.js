// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x; // 0
    this.y = y; // columns are 57 , 140 , 223
    this.speed = speed; 
    this.height = 171;
    this.width = 101; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // % (canvas width) allows the enemy to be drawn and wrapped around the canvas, reappearing multiple times, by making the number higher than the actual canvas width gives a bit of a delay so that the enemy isnt drawn right away when it reaches to the other side of the screen
    this.x = (this.x + (this.speed * dt)) % 700;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() { 

    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 420;
    this.height = 171;
    this.width = 101;

    // canvas size
    // canvas.width = 505;
    // canvas.height = 606;
}

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    function onCollision () { // compare x and y of enemy to player
        if (enemy.x < player.x + player.width && 
            enemy.x + enemy.width  > player.x &&
            enemy.y < player.y + player.height && 
            enemy.y + enemy.height > player.y){
                player.y = 420;
                player.x = 0; 
                console.log("you got hit!")
            }
    }
    onCollision();
//! NOTE TO SELF , HAVE TO REDO SQUARES TO MAKE SURE IT PROPERLY LINES UP 
    function startNewStage (){
        if (player.y = 0 || player.x = 0){
            player.y = 420;
            player.x = 0;
            console.log("finished a level !")
        }
    };
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        if (this.x - 101 >= 0) {
            this.x -= 101;
        };
    } else if (direction == 'right') {
        if (this.x + 101 < 505) {
            this.x += 101;
        };
    } else if  (direction == 'up') {
        if (this.y - 101 >= 0) {
            this.y -= 101;
        };
    } else if (direction == 'down') {
        if (this.y + 101 < 505 ) {
            this.y += 101;
        };
    } 

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var enemyYLocation = [57, 140, 223];

allEnemies.x = 0;

allEnemies.y = enemyYLocation.forEach(function(locationAtY) {
    //get random number 
    function randomNum(min, max) {
        return Math.random() * (max - min) + min;
      };
      

      enemy = new Enemy(0, locationAtY, randomNum(80,400)); // x is set at 0, locationAtY is anything at enemyYLocation, speed at random number between 80 - 300
      
      allEnemies.push(enemy);
      
});

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

