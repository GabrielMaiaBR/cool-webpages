// Defina variáveis globais
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const toggleSoundButton = document.getElementById('toggleSound');
let soundEnabled = true;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Carregue sons
const explosionSound = new Audio('explosion.mp3');
const missileSound = new Audio('missile.mp3');

// Carregue as imagens
const planeImage = document.getElementById('planeImage');
const missileImage = document.getElementById('missileImage');

// Defina as posições iniciais do avião e do míssil
// (use o centro das imagens)
let planeX = canvas.width / 2 - planeImage.width / 2;
let planeY = canvas.height / 2 - planeImage.height / 2;
let missileX = canvas.width / 2 - missileImage.width / 2;
let missileY = canvas.height / 2 - missileImage.height / 2;
let explosionX = -100; // Inicialmente fora da tela
let explosionY = -100; // Inicialmente fora da tela
let explosionFrame = 0;

// Função para desenhar o avião
function drawPlane() {
    ctx.drawImage(planeImage, planeX, planeY);
}

// Função para desenhar o míssil
function drawMissile() {
    ctx.drawImage(missileImage, missileX, missileY);
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
        missileX = canvas.width / 2 - missileImage.width / 2;
        missileY = canvas.height / 2 - missileImage.height / 2;

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

// Função para desenhar a explosão
function drawExplosion() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(explosionX, explosionY, explosionFrame, 0, Math.PI * 2);
    ctx.fill();
}

// Função para atualizar a animação da explosão
function updateExplosion() {
    if (explosionFrame < 40) {
        explosionFrame += 1;
    } else {
        explosionX = -100;
        explosionY = -100;
        explosionFrame = 0;
    }
}

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

// Adicione um ouvinte de evento para acompanhar o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    planeX = e.clientX - canvas.getBoundingClientRect().left - planeImage.width / 2;
    planeY = e.clientY - canvas.getBoundingClientRect().top - planeImage.height / 2;
});

// Adicione um ouvinte de evento para disparar o míssil com o clique direito
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Impede o menu de contexto padrão
    if (e.button === 2) { // Verifica se o botão direito do mouse foi clicado (código 2)
        fireMissile();
    }
});

// Adicione um ouvinte de evento para alternar o som
toggleSoundButton.addEventListener('click', toggleSound);

// Função principal de inicialização
function init() {
    // Inicie a animação
    animate();
}

// Carregue as imagens antes de iniciar o jogo
planeImage.onload = function () {
    missileImage.onload = function () {
        init();
    };
};
