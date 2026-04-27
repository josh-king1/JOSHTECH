const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize",()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

/* Floating Medical Plus Icons */
class Plus {
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*10 + 8;
        this.speed = Math.random()*0.5 + 0.2;
        this.opacity = Math.random()*0.5 + 0.2;
    }

    update(){
        this.y -= this.speed;

        if(this.y < -20){
            this.y = canvas.height + 20;
            this.x = Math.random()*canvas.width;
        }
    }

    draw(){
        ctx.strokeStyle = `rgba(0,123,255,${this.opacity})`;
        ctx.lineWidth = 2;

        // vertical line
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.stroke();

        // horizontal line
        ctx.beginPath();
        ctx.moveTo(this.x - this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.stroke();
    }
}

let pluses = [];

for(let i=0;i<40;i++){
    pluses.push(new Plus());
}

/* Light Grid */
function drawGrid(){
    ctx.strokeStyle = "rgba(0,0,0,0.03)";
    ctx.lineWidth = 1;

    let gap = 50;

    for(let x=0;x<canvas.width;x+=gap){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    for(let y=0;y<canvas.height;y+=gap){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

/* Animation */
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    pluses.forEach(p=>{
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();