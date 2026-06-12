const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

/* Stars */

const stars = [];

for(let i = 0; i < 250; i++){

    stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        size:Math.random()*2,
        opacity:Math.random()
    });
}

/* Hearts */

const hearts = [];

for(let i = 0; i < 25; i++){

    hearts.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        size:Math.random()*20+10,
        speed:Math.random()*0.5+0.2
    });
}

/* Shooting Stars */

let meteors = [];

function createMeteor(){

    meteors.push({
        x:Math.random()*canvas.width,
        y:-50,
        speed:8,
        length:150
    });
}

setInterval(createMeteor,2500);

/* Heart Shape */

function drawHeart(x,y,size){

    ctx.save();

    ctx.translate(x,y);

    ctx.scale(size/30,size/30);

    ctx.beginPath();

    ctx.moveTo(0,0);

    ctx.bezierCurveTo(
        -15,-15,
        -30,10,
        0,30
    );

    ctx.bezierCurveTo(
        30,10,
        15,-15,
        0,0
    );

    ctx.fillStyle="rgba(255,108,171,.6)";
    ctx.shadowColor="#ff6cab";
    ctx.shadowBlur=20;

    ctx.fill();

    ctx.restore();
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    /* Stars */

    stars.forEach(star=>{

        star.opacity += (Math.random()-0.5)*0.02;

        if(star.opacity<0.1)
            star.opacity=0.1;

        if(star.opacity>1)
            star.opacity=1;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI*2
        );

        ctx.fillStyle=
        `rgba(255,255,255,${star.opacity})`;

        ctx.fill();
    });

    /* Hearts */

    hearts.forEach(h=>{

        h.y -= h.speed;

        if(h.y < -50){

            h.y = canvas.height + 50;
            h.x = Math.random()*canvas.width;
        }

        drawHeart(
            h.x,
            h.y,
            h.size
        );
    });

    /* Meteors */

    meteors.forEach((m,index)=>{

        ctx.beginPath();

        ctx.moveTo(m.x,m.y);

        ctx.lineTo(
            m.x-m.length,
            m.y-m.length
        );

        ctx.strokeStyle=
        "rgba(255,255,255,.8)";

        ctx.lineWidth=2;

        ctx.stroke();

        m.x += m.speed;
        m.y += m.speed;

        if(m.y > canvas.height){

            meteors.splice(index,1);
        }
    });

    requestAnimationFrame(animate);
}

animate();