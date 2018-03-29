
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update enemy position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    // Draw enemy on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Vertical movement: .7
// Horisontal movement: 
class Player {
    constructor() {
        this.x = 202;
        this.y = 390;
        this.score = 0;
        this.sprite = 'images/char-boy.png';
    }

    // Update player position
    update() {

        
        if (this.keypress === 'left' && this.x >= 101) {
            this.x -= 101;
        } else if (this.keypress === 'right' && this.x <= 303) {
            this.x += 101;
        } else if (this.keypress === 'up' && this.y >= -24.89) {
            this.y -= 83;
        } else if (this.keypress === 'down' && this.y <= 390) {
            this.y += 83;
        }

        this.keypress = null;
    
    }

    // Draw player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handle player input 
    handleInput(e) {
        this.keypress = e;
    }

    checkCollisions() {
        
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(0, (83 * 0.7)),
    new Enemy(0, (83 * 1.7)),
    new Enemy(0, (83 * 2.7))
];

// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
