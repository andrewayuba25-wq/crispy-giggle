// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;

let player = {
    x: 15,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0
};

let computer = {
    x: canvas.width - 15 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0,
    speed: 4
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    size: ballSize,
    speed: 5
};

// Game state
let gameRunning = true;
let gameOver = false;
let winningScore = 5;

// Input handling
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

let mouseY = canvas.height / 2;

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        keys[e.key] = false;
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

document.getElementById('resetBtn').addEventListener('click', resetGame);

// Draw functions
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenterLine() {
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    // Draw center line
    drawCenterLine();

    // Draw paddles
    drawRect(player.x, player.y, player.width, player.height, '#00ff00');
    drawRect(computer.x, computer.y, computer.width, computer.height, '#ff0000');

    // Draw ball
    drawCircle(ball.x, ball.y, ball.size, '#ffff00');
}

// Update functions
function updatePlayerPaddle() {
    if (keys['ArrowUp']) {
        player.y -= 7;
    }
    if (keys['ArrowDown']) {
        player.y += 7;
    }

    // Alternative: Use mouse position
    const mouseTrackingOffset = 30;
    if (Math.abs(mouseY - (player.y + player.height / 2)) > mouseTrackingOffset) {
        if (mouseY < player.y + player.height / 2) {
            player.y -= 6;
        } else {
            player.y += 6;
        }
    }

    // Boundary collision for player paddle
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function updateComputerPaddle() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;

    // Simple AI: track the ball
    if (computerCenter < ballCenter - 35) {
        computer.y += computer.speed;
    } else if (computerCenter > ballCenter + 35) {
        computer.y -= computer.speed;
    }

    // Boundary collision for computer paddle
    if (computer.y < 0) {
        computer.y = 0;
    }
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y - ball.size < 0) {
        ball.y = ball.size;
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.size > canvas.height) {
        ball.y = canvas.height - ball.size;
        ball.dy = -ball.dy;
    }

    // Player paddle collision
    if (
        ball.x - ball.size < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.x = player.x + player.width + ball.size;
        ball.dx = -ball.dx;
        
        // Add spin based on paddle position
        const collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint / (player.height / 2);
        ball.dy = collidePoint * 5;
    }

    // Computer paddle collision
    if (
        ball.x + ball.size > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.x = computer.x - ball.size;
        ball.dx = -ball.dx;
        
        // Add spin based on paddle position
        const collidePoint = ball.y - (computer.y + computer.height / 2);
        ball.dy = collidePoint * 5;
    }

    // Left side (player misses)
    if (ball.x - ball.size < 0) {
        computer.score++;
        document.getElementById('computerScore').textContent = computer.score;
        resetBall();
        checkGameOver();
    }

    // Right side (computer misses)
    if (ball.x + ball.size > canvas.width) {
        player.score++;
        document.getElementById('playerScore').textContent = player.score;
        resetBall();
        checkGameOver();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed * 2;
}

function checkGameOver() {
    if (player.score >= winningScore) {
        endGame('YOU WIN! 🎉');
        return;
    }
    if (computer.score >= winningScore) {
        endGame('GAME OVER! Computer wins.');
        return;
    }
}

function endGame(message) {
    gameOver = true;
    gameRunning = false;
    const messageElement = document.getElementById('gameOverMessage');
    messageElement.textContent = message;
    messageElement.className = 'game-over-message ' + (message.includes('WIN') ? 'win' : 'lose');
}

function resetGame() {
    player.score = 0;
    computer.score = 0;
    gameOver = false;
    gameRunning = true;
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('gameOverMessage').textContent = '';
    document.getElementById('gameOverMessage').className = 'game-over-message';
    resetBall();
}

function update() {
    if (!gameRunning) return;

    updatePlayerPaddle();
    updateComputerPaddle();
    updateBall();
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
resetBall();
gameLoop();
