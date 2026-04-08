const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];
let mouse = { x: 0, y: 0 };

/* Resize */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Mouse movement */
window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

/* Star Class */
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.2;
    }

    update() {
        this.y += this.speed;

        // reset
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* Shooting Star */
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.5;
        this.waitTime = Date.now() + Math.random() * 3000 + 500;
        this.active = false;
    }

    update() {
        if (this.active) {
            this.x -= this.speed;
            this.y += this.speed;

            if (this.y > canvas.height) {
                this.reset();
            }
        } else {
            if (Date.now() > this.waitTime) {
                this.active = true;
            }
        }
    }

    draw() {
        if (this.active) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = this.size;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.len, this.y - this.len);
            ctx.stroke();
        }
    }
}

/* Init */
function init() {
    stars = [];
    shootingStars = [];

    for (let i = 0; i < 200; i++) {
        stars.push(new Star());
    }

    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }
}

/* Nebula Glow */
function drawNebula() {
    let gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 50,
        mouse.x, mouse.y, 300
    );

    gradient.addColorStop(0, "rgba(0, 150, 255, 0.2)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* Animate */
function animate() {
    ctx.fillStyle = "rgba(0,0,20,0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNebula();

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    shootingStars.forEach(s => {
        s.update();
        s.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();