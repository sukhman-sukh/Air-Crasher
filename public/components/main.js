const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
gameOver = false
let lastTime = 0;
var game = []
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20
tileWidth = (window.innerWidth - 20) / 20
tileHeight = (window.innerHeight - 20) / 20


win = false
var tilesFilled = 0
var keys = [0, 0, 0, 0]
//        u , d ,l, r
var addDot = [{ x: 0, y: 0 }]

//  game[row][column]
game = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

for (i = 1; i < 19; i++) {
    for (let j = 1; j < 19; j++) {
        x = Math.floor(Math.random() + 0.15)
        game[i][j] = x
    }
}

const tiles = []



class Ground {
    constructor({ position }) {
        this.position = position
        this.width = innerWidth / 20
        this.height = innerHeight / 20
    }
    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Players Dots
class Dots {
    constructor({ position, color }) {
        this.position = position
        this.radius = 8
        this.color = color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath();
    }
}
// Enemy Ball
class enemyBall {
        constructor({ position, velocity, color }) {
        this.position = position
        this.velocity = velocity
        this.radius = 25
        this.color = color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


// Game Ball
class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 25
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// Placing tiles according to game[][] array
game.forEach((row, i) => {

    row.forEach((symbol, j) => {
        switch (symbol) {
            case 1:
                tiles.push(
                    new Ground({
                        position: {
                            x: tileWidth * j,
                            y: tileHeight * i,
                            ith: i,
                            jth: j,


                        }
                    })
                )
                break

        }
    })
})

let ball_x = Math.floor(Math.random() * 20)
let ball_y = Math.floor(Math.random() * 20)
while (game[ball_y][ball_x] != 0) {
    ball_x = Math.floor(Math.random() * 20)
    ball_y = Math.floor(Math.random() * 20)
}


// instance of enemy balls
var enemyBall1 = new enemyBall({
    position: {
        x: ball_y * tileWidth + tileWidth / 2,
        y: ball_x * tileHeight + tileHeight / 2,
        xth: ball_x,
        yth: ball_y,
        xinit: ball_x * tileWidth + tileWidth / 2,
        yinit: ball_y * tileHeight + tileHeight / 2,
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red'
});


ball_x = Math.floor(Math.random() * 20)
ball_y = Math.floor(Math.random() * 20)
while (game[ball_y][ball_x] != 0) {
    ball_x = Math.floor(Math.random() * 20)
    ball_y = Math.floor(Math.random() * 20)
}

// instance of enemy balls
var enemyBall2 = new enemyBall({
    position: {
        x: ball_x * tileWidth + tileWidth / 2,
        y: ball_y * tileHeight + tileHeight / 2,
        xth: ball_x,
        yth: ball_y,
        xinit: ball_x * tileWidth + tileWidth / 2,
        yinit: ball_y * tileHeight + tileHeight / 2,
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "green"
});




// instance of game ball :- player class
var player = new Player({
    position: {
        x: tileWidth / 2,
        y: tileHeight / 2,
        pos: {
            xinit: tileWidth / 2,
            yinit: tileHeight / 2
        }
    },
    velocity: {
        x: 0,
        y: 0
    }
});


player.draw();
enemyBall1.draw();
enemyBallVelocity(enemyBall1)
enemyBall2.draw();
enemyBallVelocity(enemyBall2)

updateGround();

function updateGround() {
    tilesFilled = 0;
    game.forEach((row, i) => {

        row.forEach((symbol, j) => {
            switch (symbol) {
                case 1:
                    tile = new Ground({
                        position: {
                            x: tileWidth * j,
                            y: tileHeight * i,
                            ith: i,
                            jth: j,


                        }
                    })

                    tiles.push(tile)

                    checkOutBoundsEnemyBall(tile);
                    tilesFilled++;
                    if (game[tile.position.ith][tile.position.jth] == 0) {
                    }
                    else {
                        tile.draw();
                    }
                    break

            }
        })
    })
    checkOutBoundsBallS();

}

// game logics
function enemyBallVelocity(enemyBall){
    sign = Math.floor(Math.random() * 4)

    vx1 = Math.floor(Math.random() * 3) + 1
    vy1 = Math.floor(Math.random() * 3) + 1
    if (sign == 0) { vx1 = vx1 * (-1); vy1 = vy1 * (-1) }
    else if (sign == 1) { vx1 = vx1 * (-1); }
    else if (sign == 2) { vy1 = vy1 * (-1) }

    enemyBall.velocity.x = vx1;
    enemyBall.velocity.y = vy1;
}

enemyBallVelocity(enemyBall1)
enemyBallVelocity(enemyBall2)

var addTile = []
let tilepos = { x: 0, y: 0 }
// add tiles to ground
addTile.push(tilepos);
addTile.push(tilepos);
function addTiles() {



    drawTile();


    if (checkTile(player)) {
        tilepos = { x: player.position.x, y: player.position.y }

        addTile.pop();
        addTile.push(tilepos);

       
    }


    else {

        tilepos = { x: player.position.x, y: player.position.y }
        tilePrev = addTile.pop();
        tilePrev2 = addTile.pop()

        if ((tilepos.x - tilePrev.x == 0 && tilePrev.x - tilePrev2.x == 0) || (tilepos.y - tilePrev.y == 0 && tilePrev.y - tilePrev2.y == 0)) {
            addTile.push(tilePrev2)
            addTile.push(tilepos)
        }
        else {
            addTile.push(tilePrev2)
            addTile.push(tilePrev)
            addTile.push(tilepos)

        }
      }




}

// ADD TILES TO THE GAME
function drawTile() {
    addDot.forEach(tiled => {
        let dot = new Dots({ position: tiled, color: 'white' });
        dot.draw();

    })

    if (!checkTile(player)) {
        let tiled = { x: player.position.x, y: player.position.y }
        addDot.push(tiled);
    }
    if (checkTile(player) && addTile.length > 2) {
        addTile.forEach(tilepos => {
            tileFinal = addTile.pop();
            tileInit = addTile.pop();
            addTile.push(tileInit);
            // addTile.push(tileFinal);

            rowF = Math.floor(tileFinal.y / tileHeight)
            columnF = Math.floor(tileFinal.x / tileWidth)
            rowI = Math.floor(tileInit.y / tileHeight)
            columnI = Math.floor(tileInit.x / tileWidth)

            checkConnection(rowF, columnF, rowI, columnI)
            if (rowF - rowI == 0) {
                for (i = Math.min(columnF, columnI); i <= Math.max(columnF, columnI); i++) {

                    game[rowF][i] = 1
                }
            }
            if (columnF - columnI == 0) {
                for (i = Math.min(rowF, rowI); i <= Math.max(rowF, rowI); i++) {
                    game[i][columnF] = 1
                    // dot.draw();
                }
            }
        })

        addTile = []
        let tilep = { x: 0, y: 0 }
        // add tiles to ground
        addTile.push(tilep);
        addTile.push(tilep);
        addDot = []

        let tiled = { x: 0, y: 0 }

        addDot.push(tiled);
    }
}
//  checking connection between tiles
function checkConnection(rowF, columnF, rowI, columnI) {
    c=0;
    if (rowF - rowI == 0) {
        for (i = 0; i < 20; i++) {
            if (game[rowF][i] == 1) { c++; }
        }
        c = c + (Math.abs(columnF - columnI))
    }
    
    if (c >= 20) {
        disFromX = rowF * tileHeight;
        if ((enemyBall1.position.y >= disFromX && enemyBall2.position.y >= disFromX)) {
            for (i = 0; i < rowF; i++) {
                for (j = 0; j < 20; j++) {
                    game[i][j] = 1
                }
            }
        }
        if ((enemyBall1.position.y < disFromX && enemyBall2.position.y < disFromX)) {
            for (i = 19; i >= rowF; i--) {
                for (j = 19; j >= 0; j--) {
                    game[i][j] = 1
                }
            }
        }
    }
    if (columnF - columnI == 0) {
        for (i = 0; i < 20; i++) {
            if (game[i][columnI] == 1) { c++; }
        }
        c = c + (Math.abs(rowF - rowI))
    }
        if (c >= 20) {
        disFromY = columnF * tileWidth;
        if ((enemyBall1.position.x >= disFromY && enemyBall2.position.x >= disFromY)) {
            for (i = 0; i < columnF; i++) {
                for (j = 0; j < 20; j++) {
                    game[j][i] = 1
                }
            }
        }
        if ((enemyBall1.position.x < disFromY && enemyBall2.position.x < disFromY)) {
            for (i = 19; i >= columnF; i--) {
                for (j = 19; j >= 0; j--) {
                    game[j][i] = 1
                }
            }
        }
    }
    
}


//CHCEK IF A BALL IS ON TILE OR NOT
function checkTile(ball) {
    if (game[Math.floor(ball.position.y / tileHeight)][Math.floor(ball.position.x / tileWidth)] == 1) {
        return true;
    }
    else {
        return false;
    }
}



// Rebound enemy balls logic

function ReboundEnemy(enemyBall) {
    tx = Math.abs((enemyBall.position.x - enemyBall.position.xinit) / (enemyBall.velocity.x))
    ty = Math.abs((enemyBall.position.y - enemyBall.position.yinit) / (enemyBall.velocity.y))

  
    enemyBall.position.yinit = enemyBall.position.y
    enemyBall.position.xinit = enemyBall.position.x
    if (tx > ty) {
        i
        enemyBall.velocity.x *= (-1);
    }
    if (tx < ty) {
        enemyBall.velocity.y *= (-1);
    }
    if (tx = ty) {
        enemyBall.velocity.x *= (-1);
        enemyBall.velocity.y *= (-1);
    }

    if (enemyBall.position.x - enemyBall.radius <= 2) {
        enemyBall.velocity.x *= -1;
    }
    if (enemyBall.position.x + enemyBall.radius >= innerWidth - 22) {
        enemyBall.velocity.x *= -1;

    }
    if (enemyBall.position.y + enemyBall.radius >= innerHeight - 22) {
        enemyBall.velocity.y *= -1;
    }
    if (enemyBall.position.y - enemyBall.radius <= 2) {
        enemyBall.velocity.y *= -1;
    }
}
// FOR ALL BALLS TO BE INSIDE CANVAS
function checkOutBoundsBallS() {

    // FOR GAME BALL
    if (player.position.x - player.radius <= 2 && keys[2] == 1) {
        player.velocity.x = 0
    }
    if (player.position.x + player.radius >= innerWidth - 22 && keys[3] == 1) {
        player.velocity.x = 0

    }
    if (player.position.y + player.radius >= innerHeight - 22 && keys[1] == 1) {
        player.velocity.y = 0
    }
    if (player.position.y - player.radius <= 2 && keys[0] == 1) {
        player.velocity.y = 0
    }

    // FOR ENEMYBALL1
    if (enemyBall1.position.x - enemyBall1.radius <= 2) {
        enemyBall1.velocity.x *= -1;
    }
    if (enemyBall1.position.x + enemyBall1.radius >= innerWidth - 22) {
        enemyBall1.velocity.x *= -1;

    }
    if (enemyBall1.position.y + enemyBall1.radius >= innerHeight - 22) {
        enemyBall1.velocity.y *= -1;
    }
    if (enemyBall1.position.y - enemyBall1.radius <= 2) {
        enemyBall1.velocity.y *= -1;
    }

    // FOR ENEMY BALL 2
    if (enemyBall2.position.x - enemyBall2.radius <= 2) {
        enemyBall2.velocity.x *= -1;
    }
    if (enemyBall2.position.x + enemyBall2.radius >= innerWidth - 22) {
        enemyBall2.velocity.x *= -1;

    }
    if (enemyBall2.position.y + enemyBall2.radius >= innerHeight - 22) {
        
        enemyBall2.velocity.y *= -1;
    }
    if (enemyBall2.position.y - enemyBall2.radius <= 2) {
        enemyBall2.velocity.y *= -1;
    }
}

function checkOutBoundsEnemyBall(tile) {
    if (((enemyBall1.position.x - enemyBall1.radius <= tile.position.x + tileWidth / 2
        && enemyBall1.position.x - enemyBall1.radius >= tile.position.x - tileWidth / 2)
        || (enemyBall1.position.x + enemyBall1.radius <= tile.position.x + tileWidth / 2
            && enemyBall1.position.x + enemyBall1.radius >= tile.position.x - tileWidth / 2))
        && ((enemyBall1.position.y - enemyBall1.radius <= tile.position.y + tileHeight / 2
            && enemyBall1.position.y - enemyBall1.radius >= tile.position.y - tileHeight / 2)
            || (enemyBall1.position.y + enemyBall1.radius <= tile.position.y + tileHeight / 2
                && enemyBall1.position.y + enemyBall1.radius >= tile.position.y - tileHeight / 2))
        && game[tile.position.ith][tile.position.jth] != 0) {
        game[tile.position.ith][tile.position.jth] = 0;
        ReboundEnemy(enemyBall1)
       
    }
    else if (((enemyBall2.position.x - enemyBall2.radius <= tile.position.x + tileWidth / 2
        && enemyBall2.position.x - enemyBall2.radius >= tile.position.x - tileWidth / 2)
        || (enemyBall2.position.x + enemyBall2.radius <= tile.position.x + tileWidth / 2
            && enemyBall2.position.x + enemyBall2.radius >= tile.position.x - tileWidth / 2))
        && ((enemyBall2.position.y - enemyBall2.radius <= tile.position.y + tileHeight / 2
            && enemyBall2.position.y - enemyBall2.radius >= tile.position.y - tileHeight / 2)
            || (enemyBall2.position.y + enemyBall2.radius <= tile.position.y + tileHeight / 2
                && enemyBall2.position.y + enemyBall2.radius >= tile.position.y - tileHeight / 2))
        && game[tile.position.ith][tile.position.jth] != 0) {
        game[tile.position.ith][tile.position.jth] = 0;
        ReboundEnemy(enemyBall2)
       
    }

}
// Event Listners
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowDown':
            keys[1] = 1
            player.velocity.x = 0
            player.velocity.y = 10
            break;
        case 'ArrowUp':
            keys[0] = 1
            player.velocity.x = 0
            player.velocity.y = -10
            break;
        case 'ArrowLeft':
            keys[2] = 1
            player.velocity.y = 0
            player.velocity.x = -10
            break;
        case 'ArrowRight':
            keys[3] = 1
            player.velocity.y = 0
            player.velocity.x = 10
            break;
    }
}
)
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowDown':
            keys[1] = 0
            player.velocity.y = 0
            break;
        case 'ArrowUp':
            keys[0] = 0
            player.velocity.y = 0
            break;
        case 'ArrowLeft':
            keys[2] = 0
            player.velocity.x = 0
            break;
        case 'ArrowRight':
            keys[3] = 0
            player.velocity.x = 0
            break;
    }
}
)
function checkLose() {
    if (((enemyBall1.position.x - 25 <= player.position.x && enemyBall1.position.x + 25 >= player.position.x) && (enemyBall1.position.y - 25 <= player.position.y && enemyBall1.position.y + 25 >= player.position.y)) || ((enemyBall2.position.x - 25 <= player.position.x && enemyBall2.position.x + 25 >= player.position.x) && (enemyBall2.position.y - 25 <= player.position.y && enemyBall2.position.y + 25 >= player.position.y))) {
        gameOver = true;
    }
    addDot.forEach(dot => {
        if (((enemyBall1.position.x - 25 <= dot.x && enemyBall1.position.x + 25 >= dot.x) && (enemyBall1.position.y - 25 <= dot.y && enemyBall1.position.y + 25 >= dot.y)) || ((enemyBall2.position.x - 25 <= dot.x && enemyBall2.position.x + 25 >= dot.x) && (enemyBall2.position.y - 25 <= dot.y && enemyBall2.position.y + 25 >= dot.y))) {
            dot.color = 'red';
            gameOver = true;
        }
    })
}


function checkStatus() {
    if (gameOver == true && win == false) {

        for (i = 0; i < 100000000; i++) {

        }
        window.location.href = '../screens/lose.html';
    }
    if (gameOver == true && win == true) {

        for (i = 0; i < 100000000; i++) {

        }
        window.location.href = '../screens/win.html';

    }
}
function checkWin() {
    if (tilesFilled >= 370) {
        gameOver = true
        win = true
    }
}


// Main Function
function main(ctime) {
    window.requestAnimationFrame(main);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    updateGround();

    player.update();

    enemyBall2.update();
    enemyBall1.update();
    checkWin()
    checkLose();
    checkStatus();
    addTiles();

    lastTime = ctime;

}
// init();
window.requestAnimationFrame(main);
