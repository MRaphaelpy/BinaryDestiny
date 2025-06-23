function updateMenuHTML() {
  menu.innerHTML = `
    <h1 style="color: white;">Binary Destiny</h1>
    <p style="color: white; margin: 20px; text-align: center;">
      A Terra caiu. Só quem decifra binários pode reverter o destino e salvar a humanidade, converta seus códigos ou a humanidade será deletada!
    </p>
    <div class="input-container">
      <input type="text" id="player-name" placeholder="Digite seu nome" maxlength="15">
    </div>
    <div class="button-group">
      <button id="start-btn">Iniciar Jogo</button>
      <button id="leaderboard-btn">Ranking</button>
      <button id="instructions-btn">Instruções</button>
    </div>
  `;

  document.getElementById("start-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("player-name");
    if (nameInput.value.trim() === "") {
      alert("Por favor, digite seu nome para começar.");
    } else {
      playerName = nameInput.value.trim();
      startGame();
    }
  });

  document
    .getElementById("leaderboard-btn")
    .addEventListener("click", showLeaderboard);

  document
    .getElementById("instructions-btn")
    .addEventListener("click", showInstructions);
}

function showInstructions() {
  menu.innerHTML = `
    <h1 style="color: white;">Como Jogar</h1>
    <div class="instructions-container">
      <div class="instruction-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <p>Blocos com números binários cairão do topo da tela</p>
          <div class="instruction-img binary-block-example">1010</div>
        </div>
      </div>
      
      <div class="instruction-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <p>Converta os números binários para decimal e selecione a resposta correta</p>
          <div class="answer-buttons-example">
            <button class="answer-example">8</button>
            <button class="answer-example">10</button>
            <button class="answer-example">12</button>
            <button class="answer-example">14</button>
          </div>
        </div>
      </div>
      
      <div class="instruction-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <p>Cada acerto concede pontos! Cuidado com a linha vermelha no fundo, se um bloco tocar nela você perde um coração ❤️</p>
        </div>
      </div>
      
      <div class="instruction-step">
        <div class="step-number">4</div>
        <div class="step-content">
          <p>Fique atento aos poderes especiais que podem aparecer durante o jogo!</p>
          <div class="powerups-example">
            <span class="powerup-icon">❄️</span>
            <span class="powerup-icon">🛡️</span>
            <span class="powerup-icon">⭐</span>
            <span class="powerup-icon">❤️</span>
          </div>
        </div>
      </div>
      
      <div class="binary-conversion-example">
        <h3>Como Converter Binário para Decimal:</h3>
        <p>Cada posição do número binário representa uma potência de 2, começando da direita para a esquerda.</p>
        
        <div class="example-container">
          <div class="example-binary">
            <div class="binary-digit">1</div>
            <div class="binary-digit">1</div>
            <div class="binary-digit">0</div>
            <div class="binary-digit">1</div>
          </div>
          
          <div class="example-position">
            <div class="position-value">2³=8</div>
            <div class="position-value">2²=4</div>
            <div class="position-value">2¹=2</div>
            <div class="position-value">2⁰=1</div>
          </div>
          
          <div class="example-calculation">
            <div class="calc-value">1×8=8</div>
            <div class="calc-value">1×4=4</div>
            <div class="calc-value">0×2=0</div>
            <div class="calc-value">1×1=1</div>
          </div>
        </div>
        
        <div class="final-calculation">
          <p>Resultado: 8 + 4 + 0 + 1 = <span class="result">13</span></p>
        </div>
        
        <div class="more-examples">
          <h4>Exemplos Rápidos:</h4>
          <div class="examples-grid">
            <div class="quick-example">1001 = 9</div>
            <div class="quick-example">101 = 5</div>
            <div class="quick-example">1111 = 15</div>
            <div class="quick-example">10000 = 16</div>
          </div>
        </div>
      </div>
    </div>
    <button id="back-btn">Voltar</button>
  `;

  // Adicionar estilo específico para as instruções
  const instructionsStyle = document.createElement("style");
  instructionsStyle.id = "instructions-style";
  instructionsStyle.textContent = `
    .instructions-container {
      text-align: left;
      color: white;
      max-width: 700px;
      margin: 0 auto;
      padding: 10px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .instruction-step {
      display: flex;
      margin: 20px 0;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      transition: transform 0.2s;
    }
    
    .instruction-step:hover {
      transform: translateX(5px);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .step-number {
      background: #4a90e2;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    .step-content {
      flex-grow: 1;
    }
    
    .step-content p {
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    
    .binary-block-example {
      background: #333;
      color: #4a90e2;
      padding: 8px 15px;
      display: inline-block;
      border-radius: 5px;
      font-family: monospace;
      font-size: 18px;
      font-weight: bold;
      margin: 5px 0;
      border: 1px solid #4a90e2;
      box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
    }
    
    .answer-buttons-example {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .answer-example {
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 15px;
      cursor: default;
      font-size: 16px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .answer-example:hover {
      opacity: 1;
    }
    
    .powerups-example {
      display: flex;
      gap: 15px;
      margin-top: 10px;
    }
    
    .powerup-icon {
      font-size: 24px;
      background: rgba(255, 255, 255, 0.1);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    }
    
    .binary-conversion-example {
      background: rgba(74, 144, 226, 0.1);
      padding: 20px;
      border-radius: 10px;
      margin: 25px 0;
      border: 1px solid rgba(74, 144, 226, 0.3);
    }
    
    .binary-conversion-example h3 {
      text-align: center;
      margin-top: 0;
      color: #4a90e2;
    }
    
    .example-container {
      display: grid;
      grid-template-rows: auto auto auto;
      gap: 5px;
      margin: 15px 0;
      text-align: center;
    }
    
    .example-binary, .example-position, .example-calculation {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }
    
    .binary-digit, .position-value, .calc-value {
      padding: 5px;
      font-family: monospace;
      font-size: 18px;
      border-radius: 5px;
    }
    
    .binary-digit {
      background: #4a90e2;
      color: white;
      font-weight: bold;
    }
    
    .position-value {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .calc-value {
      background: rgba(255, 255, 255, 0.05);
    }
    
    .final-calculation {
      text-align: center;
      font-size: 18px;
      margin: 15px 0;
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 5px;
    }
    
    .result {
      font-size: 22px;
      color: #4a90e2;
      font-weight: bold;
    }
    
    .more-examples {
      margin-top: 15px;
      text-align: center;
    }
    
    .more-examples h4 {
      margin-top: 0;
      color: #4a90e2;
    }
    
    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    
    .quick-example {
      background: rgba(255, 255, 255, 0.1);
      padding: 8px;
      border-radius: 5px;
      font-family: monospace;
    }
    
    #back-btn {
      margin-top: 20px;
      background: #4a90e2;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    #back-btn:hover {
      background: #3a7bc8;
    }
    
    /* Responsividade para telas menores */
    @media (max-width: 600px) {
      .example-container {
        font-size: 14px;
      }
      
      .binary-digit, .position-value, .calc-value {
        font-size: 14px;
        padding: 3px;
      }
      
      .instruction-step {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .step-number {
        margin-bottom: 10px;
      }
    }
  `;

  // Remover estilo anterior se existir
  const oldStyle = document.getElementById("instructions-style");
  if (oldStyle) {
    oldStyle.remove();
  }

  document.head.appendChild(instructionsStyle);
  document.getElementById("back-btn").addEventListener("click", function () {
    // Remove o estilo específico ao voltar ao menu principal
    instructionsStyle.remove();
    updateMenuHTML();
  });
}

function showLeaderboard() {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  let leaderboardHTML = `
    <h1 style="color: white;">Ranking</h1>
    <div class="leaderboard-container">
      <table class="leaderboard-table">
        <tr>
          <th>Posição</th>
          <th>Nome</th>
          <th>Pontuação</th>
        </tr>
  `;

  if (sortedLeaderboard.length === 0) {
    leaderboardHTML += `
      <tr>
        <td colspan="3" class="no-data">Nenhuma pontuação registrada ainda</td>
      </tr>
    `;
  } else {
    sortedLeaderboard.forEach((player, index) => {
      const rowClass = index < 3 ? `top-${index + 1}` : "";
      leaderboardHTML += `
        <tr class="${rowClass}">
          <td>${index + 1}</td>
          <td>${player.name}</td>
          <td>${player.score}</td>
        </tr>
      `;
    });
  }

  leaderboardHTML += `
      </table>
    </div>
    <button id="back-btn">Voltar</button>
  `;

  menu.innerHTML = leaderboardHTML;
  document.getElementById("back-btn").addEventListener("click", updateMenuHTML);
}

function createHeartsDisplay() {
  const heartsContainer = document.createElement("div");
  heartsContainer.id = "hearts-container";
  heartsContainer.innerHTML = updateHeartsHTML();
  document.getElementById("game-container").appendChild(heartsContainer);
}

function updateHeartsHTML() {
  let heartsHTML = "";
  for (let i = 0; i < 3; i++) {
    if (i < hearts) {
      heartsHTML += '<span class="heart">❤️</span>';
    } else {
      heartsHTML += '<span class="heart empty">🖤</span>';
    }
  }
  return heartsHTML;
}

function updateAnswerButtons() {
  if (!gameActive) return;

  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";

  let answers = [currentCorrectAnswer];

  while (answers.length < 4) {
    const wrongAnswer = Math.floor(Math.random() * 16);
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer);
    }
  }

  answers = shuffleArray(answers);

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswerButton(answer));
    answerButtons.appendChild(button);
  });
}
