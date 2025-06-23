// Adicionando verificação para garantir que a dificuldade seja definida corretamente
function setDifficulty(difficultyLevel) {
  // Verificar se a dificuldade existe nas configurações
  if (difficultySettings[difficultyLevel]) {
    currentDifficulty = difficultySettings[difficultyLevel];
    console.log(`Dificuldade definida para: ${currentDifficulty.name}`);
    return true;
  } else {
    console.error(
      `Dificuldade '${difficultyLevel}' não encontrada nas configurações`
    );
    // Usar dificuldade padrão se a selecionada não existir
    currentDifficulty = difficultySettings.easy;
    console.log(`Usando dificuldade padrão: ${currentDifficulty.name}`);
    return false;
  }
}

// Modificar o listener de clique para os cards de dificuldade
function showDifficultyScreen() {
  menu.innerHTML = `
    <h1 style="color: white;">Selecione a Dificuldade</h1>
    <div class="difficulty-container">
      <div class="difficulty-card" data-difficulty="easy">
        <h2>Fácil</h2>
        <p>4 dígitos binários</p>
        <p>Velocidade: Normal</p>
        <p>Pontuação: x1</p>
      </div>
      <div class="difficulty-card" data-difficulty="medium">
        <h2>Médio</h2>
        <p>5 dígitos binários</p>
        <p>Velocidade: +50%</p>
        <p>Pontuação: x2</p>
      </div>
      <div class="difficulty-card" data-difficulty="hard">
        <h2>Difícil</h2>
        <p>6 dígitos binários</p>
        <p>Velocidade: +100%</p>
        <p>Pontuação: x3</p>
      </div>
      <div class="difficulty-card" data-difficulty="insane">
        <h2>Mestrado/Doutorado</h2>
        <p>9 dígitos binários</p>
        <p>Velocidade: +150%</p>
        <p>Pontuação: x5</p>
      </div>
    </div>
    <button id="back-btn">Voltar</button>
  `;

  // Adicionar evento de clique aos cards de dificuldade
  const difficultyCards = document.querySelectorAll(".difficulty-card");
  difficultyCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remover a classe selected de todos os cards primeiro
      difficultyCards.forEach((c) => c.classList.remove("selected"));

      // Adicionar a classe selected apenas ao card clicado
      this.classList.add("selected");

      const selectedDifficulty = this.dataset.difficulty;
      console.log(`Dificuldade selecionada: ${selectedDifficulty}`);

      // Definir a dificuldade e iniciar o jogo com um pequeno atraso
      // para dar feedback visual ao usuário
      setTimeout(() => {
        if (setDifficulty(selectedDifficulty)) {
          console.log("Iniciando jogo...");
          startGame();
        } else {
          alert("Erro ao selecionar dificuldade. Usando configuração padrão.");
          startGame();
        }
      }, 300); // Pequeno delay para feedback visual
    });

    // Adicionar efeito hover apenas para mouse enter/leave
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("selected")) {
        this.classList.add("hover");
      }
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });

  document.getElementById("back-btn").addEventListener("click", updateMenuHTML);
}

// Atualizar a função startGame para garantir que ela seja chamada corretamente
function startGame() {
  if (!currentDifficulty) {
    console.warn("Nenhuma dificuldade selecionada, usando padrão");
    setDifficulty("easy");
  }

  console.log(`Iniciando jogo com dificuldade: ${currentDifficulty.name}`);

  blocks = [];
  score = 0;
  speed = currentDifficulty.speed;
  hearts = 3;
  streak = 0;
  gameActive = true;
  gamePaused = false;
  powerups = [];

  // Remover tela de dificuldade se estiver presente
  const diffScreen = document.querySelector(".difficulty-screen");
  if (diffScreen) diffScreen.remove();

  menu.style.display = "none";

  // Verificar se o scoreDisplay existe antes de tentar acessá-lo
  if (scoreDisplay) {
    scoreDisplay.textContent = `Pontuação: ${score}`;
  } else {
    console.warn("scoreDisplay não encontrado");
    // Criar elemento de pontuação se não existir
    scoreDisplay = document.createElement("div");
    scoreDisplay.id = "score";
    scoreDisplay.textContent = `Pontuação: ${score}`;
    document.getElementById("game-container").appendChild(scoreDisplay);
  }

  if (!document.getElementById("hearts-container")) {
    createHeartsDisplay();
  } else {
    document.getElementById("hearts-container").innerHTML = updateHeartsHTML();
  }

  // Adicionar indicador de dificuldade
  addDifficultyIndicator();

  // Garantir que o canvas e o evento de clique estejam configurados
  if (canvas) {
    canvas.addEventListener("click", checkPowerupClick);
  } else {
    console.error("Canvas não encontrado!");
    return; // Impede a continuação se o canvas não existir
  }

  playBackgroundMusic();

  // Iniciar a geração de blocos com base na taxa da dificuldade
  if (blockSpawnInterval) {
    clearInterval(blockSpawnInterval);
  }

  createBlock(); // Criar o primeiro bloco imediatamente
  blockSpawnInterval = setInterval(
    createBlock,
    currentDifficulty.blockSpawnRate
  );

  updateAnswerButtons();
  update();
}

// Garantir que a função addDifficultyIndicator exista e funcione corretamente
function addDifficultyIndicator() {
  let gameInfo = document.querySelector(".game-info");
  if (!gameInfo) {
    gameInfo = document.createElement("div");
    gameInfo.className = "game-info";
    document.body.appendChild(gameInfo);
  }

  // Verificar se já existe um indicador de dificuldade e removê-lo
  const existingIndicator = document.querySelector(".difficulty-indicator");
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // Criar um novo indicador
  const diffIndicator = document.createElement("div");
  diffIndicator.className = "difficulty-indicator";
  diffIndicator.textContent = `Nível: ${
    currentDifficulty ? currentDifficulty.name : "Fácil"
  }`;
  gameInfo.appendChild(diffIndicator);

  console.log(
    "Indicador de dificuldade adicionado:",
    diffIndicator.textContent
  );
}

// Adicionar CSS atualizado para feedback visual melhor
const updatedStyle = document.createElement("style");
updatedStyle.textContent = `
  .difficulty-card {
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid #4a90e2;
    border-radius: 10px;
    padding: 15px;
    color: white;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .difficulty-card:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(74, 144, 226, 0);
    transition: background 0.3s ease;
    z-index: 0;
  }
  
  .difficulty-card.hover:before {
    background: rgba(74, 144, 226, 0.1);
  }
  
  .difficulty-card.selected:before {
    background: rgba(74, 144, 226, 0.3);
  }
  
  .difficulty-card.selected {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.8);
  }
  
  .difficulty-card h2, .difficulty-card p {
    position: relative;
    z-index: 1;
  }
  
  /* Outras regras de estilo para o indicador de dificuldade */
  .difficulty-indicator {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: rgba(74, 144, 226, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 100;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  /* Ajuste para os cartões de dificuldade especial */
  .difficulty-card[data-difficulty="insane"] {
    border-color: #e24a4a;
  }
  
  .difficulty-card[data-difficulty="insane"] h2 {
    color: #e24a4a;
  }
  
  .difficulty-card[data-difficulty="insane"]:before {
    background: rgba(226, 74, 74, 0);
  }
  
  .difficulty-card[data-difficulty="insane"].hover:before {
    background: rgba(226, 74, 74, 0.1);
  }
  
  .difficulty-card[data-difficulty="insane"].selected:before {
    background: rgba(226, 74, 74, 0.3);
  }
  
  .difficulty-card[data-difficulty="insane"].selected {
    box-shadow: 0 0 20px rgba(226, 74, 74, 0.8);
  }
`;

// Adicionar ao documento apenas se ainda não existir
if (!document.querySelector('style[data-id="updated-difficulty-styles"]')) {
  updatedStyle.setAttribute("data-id", "updated-difficulty-styles");
  document.head.appendChild(updatedStyle);
}
