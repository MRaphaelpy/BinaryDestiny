function showPowerupAnimation(powerup) {
  const animation = document.createElement("div");
  animation.className = "powerup-animation";
  animation.innerHTML = `
    <div class="powerup-icon">${powerup.icon}</div>
    <div class="powerup-name">${powerup.name}</div>
  `;

  document.getElementById("game-container").appendChild(animation);

  switch (powerup.type) {
    case "timeFreeze":
      setTimeout(
        () => canvas.classList.remove("time-freeze"),
        powerup.duration
      );
      break;

    case "extraHeart":
      animation.classList.add("heart-effect");
      break;

    case "scoreBoost":
      animation.classList.add("score-boost-effect");
      canvas.classList.add("score-boost");
      setTimeout(
        () => canvas.classList.remove("score-boost"),
        powerup.duration
      );
      break;

    case "shield":
      animation.classList.add("shield-effect");
      canvas.classList.add("shield-active");
      setTimeout(
        () => canvas.classList.remove("shield-active"),
        powerup.duration
      );
      break;
  }

  setTimeout(() => {
    animation.classList.add("fade-out");
    setTimeout(() => animation.remove(), 1000);
  }, 2000);
}

function showStreakAnimation() {
  const streakAnimation = document.createElement("div");
  streakAnimation.className = "streak-animation";
  streakAnimation.textContent = `Sequência x2!`;

  document.getElementById("game-container").appendChild(streakAnimation);

  setTimeout(() => {
    streakAnimation.classList.add("fade-out");
    setTimeout(() => streakAnimation.remove(), 1000);
  }, 1000);
}

function showHeartLossAnimation() {
  const heartLoss = document.createElement("div");
  heartLoss.className = "heart-loss-animation";
  heartLoss.innerHTML = "❤️";

  document.getElementById("game-container").appendChild(heartLoss);

  setTimeout(() => heartLoss.remove(), 1000);
}

function showShieldBlockAnimation() {
  const shieldBlock = document.createElement("div");
  shieldBlock.className = "shield-block-animation";
  shieldBlock.innerHTML = "🛡️";

  document.getElementById("game-container").appendChild(shieldBlock);

  setTimeout(() => shieldBlock.remove(), 1000);
}
