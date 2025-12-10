// ===============================
// Reveal Page Script (script.jss)
// ===============================

// Run everything when reveal page loads
window.onload = () => {
    startConfetti();
    startSlideshow();

    const bgm = document.getElementById("bgm");
    if (bgm) {
        bgm.volume = 0.15;
        // Try to play audio, catch autoplay block
        bgm.play().catch(err => {
            console.log("Playback prevented by browser:", err);
        });
    }
};

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