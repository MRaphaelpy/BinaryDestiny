let isShieldActive = false;
function startGame() {
  blocks = [];
  score = 0;
  speed = 1;
  hearts = 3;
  streak = 0;
  gameActive = true;
  gamePaused = false;
  powerups = [];

  menu.style.display = "none";
  scoreDisplay.textContent = `Pontuação: ${score}`;

  if (!document.getElementById("hearts-container")) {
    createHeartsDisplay();
  } else {
    document.getElementById("hearts-container").innerHTML = updateHeartsHTML();
  }

  canvas.addEventListener("click", checkPowerupClick);
  playBackgroundMusic();
  createBlock();
  updateAnswerButtons();
  update();
}

function checkShieldActive() {
  const shield = powerups.find((p) => p.active && p.type === "shield");
  return !!shield;
}

function gameOver() {
  gameActive = false;
  gameOverMusic();
  leaderboard.push({
    name: playerName,
    score: score,
  });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  localStorage.setItem("Rafa", JSON.stringify(leaderboard));

  menu.style.display = "flex";
  menu.innerHTML = `
    <h1 style="color: white;">Game Over!</h1>
    <p style="color: white; font-size: 24px;">${playerName}, sua pontuação: ${score}</p>
    <div class="button-group">
      <button id="restart-btn">Jogar Novamente</button>
      <button id="leaderboard-btn">Ver Ranking</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    updateMenuHTML();
    document.getElementById("player-name").value = playerName;
  });
  document
    .getElementById("leaderboard-btn")
    .addEventListener("click", showLeaderboard);

  canvas.removeEventListener("click", checkPowerupClick);
}

function activateShield(duration) {
  isShieldActive = true;
  console.log("Escudo ativado por", duration, "ms");

  canvas.classList.add("shield-active");

  setTimeout(() => {
    isShieldActive = false;
    canvas.classList.remove("shield-active");
    console.log("Escudo desativado");
  }, duration);
}

function update() {
  if (!gameActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(0, canvas.height - 10, canvas.width, 5);

  if (!gamePaused) {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      block.y += speed;

      if (block.y + block.height >= canvas.height - 10) {
        if (isShieldActive) {
          blocks.shift();
          createBlock();
          showShieldBlockAnimation();
          continue;
        }

        hearts--;
        document.getElementById("hearts-container").innerHTML =
          updateHeartsHTML();

        if (hearts <= 0) {
          gameOver();
          return;
        } else {
          blocks.shift();
          createBlock();
          showHeartLossAnimation();
          continue;
        }
      }

      drawCyberpunkBlock(block);
    }
  } else {
    for (let i = 0; i < blocks.length; i++) {
      drawCyberpunkBlock(blocks[i]);
    }

    ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (Math.random() < 0.01 && !gamePaused) {
    createPowerup();
  }
  drawPowerups();

  powerups = powerups.filter((powerup) => {
    if (powerup.active && powerup.duration > 0) {
      const elapsed = Date.now() - powerup.activationTime;
      return elapsed < powerup.duration;
    }
    return !powerup.active || powerup.duration === 0;
  });

  requestAnimationFrame(update);
}
