// ===============================
// Reveal Page Script (script.jss)
// ===============================

// Run everything as soon as DOM is ready (faster than window.onload)
document.addEventListener("DOMContentLoaded", () => {
    startConfetti();
    startSlideshow();

    const bgm = document.getElementById("bgm");
    if (bgm) {
        fadeInMusic(bgm); // start music with quick fade-in
    }
});

// -------------------------------
// Fade-in Music
// -------------------------------
function fadeInMusic(audio) {
    audio.volume = 0;
    audio.play().catch(err => {
        console.log("Playback prevented by browser:", err);
    });

    let v = 0;
    const fade = setInterval(() => {
        v += 0.05; // increase volume quickly
        audio.volume = Math.min(v, 0.15); // cap at 0.15
        if (v >= 0.15) clearInterval(fade);
    }, 100); // every 100ms
}

// -------------------------------
// Slideshow
// -------------------------------
let pics = ["trixie1.jpg", "trixie2.jpg", "trixie3.jpg", "trixie4.jpg"];
let i = 0;

function startSlideshow() {
    const slide = document.getElementById("slide");
    if (!slide) return;

    setInterval(() => {
        i = (i + 1) % pics.length;
        slide.classList.add("fade-out");
        setTimeout(() => {
            slide.src = pics[i];
            slide.classList.remove("fade-out");
            slide.classList.add("fade-in");
        }, 500);
    }, 2500);
}

// -------------------------------
// Confetti
// -------------------------------
function startConfetti() {
    const canvas = document.getElementById("confetti");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let conf = [];
    for (let i = 0; i < 150; i++) {
        conf.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 4 + Math.random() * 4,
            d: Math.random() * 1,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        conf.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();
        });
        update();
    }

    function update() {
        conf.forEach(c => {
            c.y += c.d + 1;
            if (c.y > canvas.height) {
                c.y = 0;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    setInterval(draw, 20);
}
