function checkAnswerButton(selectedAnswer) {
  if (!gameActive || gamePaused) return;

  if (Number(selectedAnswer) === currentCorrectAnswer) {
    let pointsGained = 10;

    streak++;
    if (streak >= 3) {
      pointsGained *= 2;
      showStreakAnimation();
    }

    const scoreBooster = powerups.find(
      (p) => p.active && p.type === "scoreBoost"
    );
    if (scoreBooster) {
      pointsGained *= 2;
      console.log("Score boost aplicado! Pontos: " + pointsGained);
    }

    score += pointsGained;
    scoreDisplay.textContent = `Pontuação: ${score}`;

    blocks.shift();
    createBlock();
    updateAnswerButtons();

    if (score % 50 === 0) {
      speed += 0.5;
    }
  } else {
    streak = 0;

    if (isShieldActive) {
      console.log("Resposta errada bloqueada pelo escudo!");
      showShieldBlockAnimation();
      return;
    }

    loseHeart();
  }
}

function checkAnswer(answer) {
  if (!gameActive || gamePaused) return;

  if (Number(answer) === currentCorrectAnswer) {
    let pointsGained = 10;

    streak++;
    if (streak >= 3) {
      pointsGained *= 2;
      showStreakAnimation();
    }

    const scoreBooster = powerups.find(
      (p) => p.active && p.type === "scoreBoost"
    );
    if (scoreBooster) {
      pointsGained *= 2;
    }

    score += pointsGained;
    scoreDisplay.textContent = `Pontuação: ${score}`;

    blocks.shift();
    createBlock();

    if (score % 50 === 0) {
      speed += 0.5;
    }
  } else {
    streak = 0;

    if (isShieldActive) {
      showShieldBlockAnimation();
      return;
    }
    loseHeart();
  }
}

function loseHeart() {
  hearts--; // Reduz o número de corações
  document.getElementById("hearts-container").innerHTML = updateHeartsHTML(); // Atualiza a interface

  if (hearts <= 0) {
    gameOver(); // Termina o jogo se não houver mais corações
  } else {
    showHeartLossAnimation(); // Exibe a animação de perda de coração
  }
}
