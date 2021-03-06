
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = (Math.random() * (450 - 100) + 100);
    }

    // Update enemy position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Multiply any movement by the dt parameter to 
        // ensure the game runs at the same speed for all computers.
        if (this.x >= 505) {
            this.x = -100;
        }
        this.x += this.speed * dt;
    }

    // Draw enemy on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.x = 202; // Starting position
        this.y = 390; // Starting position
        this.score = 0; 
        this.sprite = 'images/char-boy.png';
        this.winner = false; 
    }

    // Update player position,
    // as long as it won't move off-board
    update() {
        if (this.keypress === 'left' && this.x >= 101) {
            this.x -= 101;
            this.validMove = true;
        } else if (this.keypress === 'right' && this.x <= 303) {
            this.x += 101;
            this.validMove = true;
        } else if (this.keypress === 'up' && this.y >= -24.89) {
            this.y -= 83;
            this.validMove = true;
        } else if (this.keypress === 'down' && this.y < 390) {
            this.y += 83;
            this.validMove = true;
        }

        this.keypress = null;

        // Check for enemy collision
        for (let enemy of allEnemies) {
            if (enemy.x >= (this.x - 25) && enemy.x <= (this.x + 25) &&
                enemy.y >= (this.y - 25) && enemy.y <= (this.y + 25)) {
                    this.x = 202;
                    this.y = 390;
                    this.score = 0;
                    document.querySelector('#playerScore').textContent = 0;
            }
        }

        // Track score
        if (this.validMove && !this.collision) {
            document.querySelector('#playerScore').textContent = ++this.score;
            this.validMove = false;
        }

        // Game win logic
        if (this.y <= 50) {
            document.querySelector('#winModal').style.display = 'block';
            this.winner = true;
        }
    }
    
    // Draw player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handle player input 
    handleInput(e) {
        if (!this.winner) {
            this.keypress = e;
        } else {
            this.keypress = null;
        }   
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-100, (83 * 0.7)),
    new Enemy(-100, (83 * 1.7)),
    new Enemy(-100, (83 * 2.7))
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
