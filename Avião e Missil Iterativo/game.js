// Defina variáveis globais
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const toggleSoundButton = document.getElementById('toggleSound');
let soundEnabled = true;

// Carregue sons
const explosionSound = new Audio('explosion.mp3');
const missileSound = new Audio('missile.mp3');

// Defina as posições iniciais do avião e do míssil
let planeX = canvas.width / 2;
let planeY = canvas.height / 2;
let missileX = canvas.width / 2;
let missileY = canvas.height / 2;

// Função para desenhar o avião
function drawPlane() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(planeX - 10, planeY - 10, 20, 20);
}

// Função para desenhar o míssil
function drawMissile() {
    ctx.fillStyle = 'red';
    ctx.fillRect(missileX - 5, missileY - 5, 10, 10);
}

// Função para atualizar a posição do míssil em direção ao avião
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

// Função para verificar se o míssil atingiu o avião
function checkCollision() {
    const dx = planeX - missileX;
    const dy = planeY - missileY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
        // O míssil atingiu o avião, então mostre a explosão
        explosionX = planeX;
        explosionY = planeY;
        missileX = canvas.width / 2;
        missileY = canvas.height / 2;

        // Reproduza o som de explosão
        if (soundEnabled) {
            explosionSound.play();
        }
    }
}

// Função para lidar com o disparo do míssil
function fireMissile() {
    // Defina a posição inicial do míssil como a posição atual do avião
    missileX = planeX;
    missileY = planeY;

    // Reproduza o som do míssil
    if (soundEnabled) {
        missileSound.play();
    }
}

// Função para lidar com o som ligado/desligado
function toggleSound() {
    soundEnabled = !soundEnabled;
    toggleSoundButton.textContent = soundEnabled ? 'Mute Sound' : 'Unmute Sound';
}

// Adicione um ouvinte de evento para acompanhar o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    planeX = e.clientX - canvas.getBoundingClientRect().left;
    planeY = e.clientY - canvas.getBoundingClientRect().top;
});

// Adicione um ouvinte de evento para disparar o míssil com o clique direito
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    fireMissile();
});

// Adicione um ouvinte de evento para alternar o som
toggleSoundButton.addEventListener('click', toggleSound);

// Função principal de animação
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

// Inicie a animação
animate();
