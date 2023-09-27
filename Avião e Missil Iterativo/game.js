const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const toggleSoundButton = document.getElementById('toggleSound');
let soundEnabled = true;

const explosionSound = new Audio('explosion.mp3');
const missileSound = new Audio('missile.mp3');

const planeImage = new Image();
planeImage.src = 'plane.png';
const missileImage = new Image();
missileImage.src = 'missile.png';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let planeX = canvas.width / 2 - planeImage.width / 2;
let planeY = canvas.height / 2 - planeImage.height / 2;
let missileX = canvas.width / 2 - missileImage.width / 2;
let missileY = canvas.height / 2 - missileImage.height / 2;
let explosionX = -100;
let explosionY = -100;
let explosionFrame = 0;

function drawPlane() {
    ctx.drawImage(planeImage, planeX, planeY);
}

function drawMissile() {
    ctx.drawImage(missileImage, missileX, missileY);
}

function updateMissile() {
    const dx = planeX - missileX;
    const dy = planeY - missileY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 2;

    if (distance > 0) {
        missileX += (dx / distance) * speed;
        missileY += (dy / distance) * speed;
    }
}

function checkCollision() {
    const dx = planeX - missileX;
    const dy = planeY - missileY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
        explosionX = planeX;
        explosionY = planeY;
        missileX = canvas.width / 2 - missileImage.width / 2;
        missileY = canvas.height / 2 - missileImage.height / 2;

        if (soundEnabled) {
            explosionSound.play();
        }
    }
}

function fireMissile() {
    missileX = planeX;
    missileY = planeY;

    if (soundEnabled) {
        missileSound.play();
    }
}

function drawExplosion() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(explosionX, explosionY, explosionFrame, 0, Math.PI * 2);
    ctx.fill();
}

function updateExplosion() {
    if (explosionFrame < 40) {
        explosionFrame += 1;
    } else {
        explosionX = -100;
        explosionY = -100;
        explosionFrame = 0;
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    toggleSoundButton.textContent = soundEnabled ? 'Mute Sound' : 'Unmute Sound';
}

canvas.addEventListener('mousemove', (e) => {
    planeX = e.clientX - canvas.getBoundingClientRect().left - planeImage.width / 2;
    planeY = e.clientY - canvas.getBoundingClientRect().top - planeImage.height / 2;
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.button === 2) {
        fireMissile();
    }
});

toggleSoundButton.addEventListener('click', toggleSound);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlane();
    drawMissile();
    updateMissile();
    checkCollision();
    drawExplosion();
    updateExplosion();

    requestAnimationFrame(animate);
}

animate();
