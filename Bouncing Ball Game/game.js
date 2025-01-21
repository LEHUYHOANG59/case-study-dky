// Lấy các phần tử HTML
const gameBoard = document.getElementById("game-board");
const ballElement = document.querySelector(".ball");
const barElement = document.querySelector(".bar");
const gameOverElement = document.querySelector(".game-over");

// Cấu hình game
const gameWidth = 800;
const gameHeight = 600;

// Đối tượng Ball
const Ball = {
    x: 400,
    y: 300,
    dx: 4, // Tốc độ di chuyển theo X
    dy: 4, // Tốc độ di chuyển theo Y
    radius: 10,
    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Kiểm tra va chạm biên
        if (this.x <= 0 || this.x >= gameWidth - this.radius * 2) {
            this.dx *= -1; // Đổi hướng
        }
        if (this.y <= 0) {
            this.dy *= -1; // Đổi hướng
        }

        // Kiểm tra va chạm thanh Bar
        if (
            this.y >= Bar.y - this.radius * 2 &&
            this.x + this.radius >= Bar.x &&
            this.x <= Bar.x + Bar.width
        ) {
            this.dy *= -1; // Đổi hướng lên trên
            this.dx += Bar.dx * 0.1; // Thay đổi góc theo tốc độ thanh Bar
        }

        // Kiểm tra kết thúc trò chơi
        if (this.y >= gameHeight - this.radius * 2) {
            gameOver();
        }

        // Cập nhật vị trí bóng
        ballElement.style.left = `${this.x}px`;
        ballElement.style.top = `${this.y}px`;
    }
};

// Đối tượng Bar
const Bar = {
    x: 340,
    y: 580,
    width: 120,
    dx: 0, // Tốc độ di chuyển
    moveLeft() {
        this.dx = -6;
    },
    moveRight() {
        this.dx = 6;
    },
    stop() {
        this.dx = 0;
    },
    move() {
        this.x += this.dx;
        if (this.x < 0) this.x = 0; // Không ra khỏi biên trái
        if (this.x > gameWidth - this.width) this.x = gameWidth - this.width; // Không ra khỏi biên phải
        barElement.style.left = `${this.x}px`;
    }
};

// Khởi tạo game
function initGame() {
    Ball.x = 400;
    Ball.y = 300;
    Ball.dx = 4;
    Ball.dy = 4;
    Bar.x = 340;
    Bar.y = 580;
    Bar.dx = 0;
    gameOverElement.style.display = "none";
    update();
}

// Kết thúc game
function gameOver() {
    gameOverElement.style.display = "block";
    cancelAnimationFrame(animationId);
}

// Cập nhật game
let animationId;
function update() {
    Ball.move();
    Bar.move();
    animationId = requestAnimationFrame(update);
}

// Xử lý sự kiện bàn phím
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        Bar.moveLeft();
    } else if (e.key === "ArrowRight") {
        Bar.moveRight();
    }
});

document.addEventListener("keyup", () => {
    Bar.stop();
});

// Khởi động lại game
function restartGame() {
    initGame();
}

// Bắt đầu game
initGame();
