const POWERUP_TYPES = [
  {
    type: "timeFreeze",
    name: "Congelar Tempo",
    duration: 5000,
    icon: "❄️",
  },
  {
    type: "extraHeart",
    name: "Coração Extra",
    duration: 0,
    icon: "❤️",
  },
  {
    type: "scoreBoost",
    name: "Bônus de Pontos",
    duration: 10000,
    icon: "⭐",
  },
  {
    type: "shield",
    name: "Escudo",
    duration: 8000,
    icon: "🛡️",
  },
];

//funçao do djhabo

function createPowerup() {
  // Só continua se o jogo estiver ativo
  if (!gameActive) return;

  // Aplica a chance de 10% (0.1)
  if (Math.random() <= 0.1) {
    console.log("Power-up criado com sucesso! (10% de chance)");

    // Seleciona um tipo aleatório de power-up
    const powerupType =
      POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];

    // Cria o power-up e adiciona ao array
    powerups.push({
      x: Math.random() * (canvas.width - 50),
      y: Math.random() * (canvas.height / 2),
      width: 40,
      height: 40,
      type: powerupType.type,
      name: powerupType.name,
      icon: powerupType.icon,
      duration: powerupType.duration,
      active: false,
      activationTime: 0,
    });
  }
}

function drawPowerups() {
  powerups.forEach((powerup, index) => {
    if (!powerup.active) {
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(
        powerup.x + powerup.width / 2,
        powerup.y + powerup.height / 2,
        powerup.width / 2 + 5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      const pulseSize = 5 * Math.sin(Date.now() / 300) + 10;
      ctx.shadowColor = "#f0f";
      ctx.shadowBlur = pulseSize;

      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(
        powerup.icon,
        powerup.x + powerup.width / 2,
        powerup.y + powerup.height / 2
      );
      ctx.restore();

      powerup.y += Math.sin(Date.now() / 1000 + index) * 0.5;
    }
  });
}

function checkPowerupClick(event) {
  if (!gameActive) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for (let i = powerups.length - 1; i >= 0; i--) {
    const powerup = powerups[i];
    if (!powerup.active) {
      const dx = mouseX - (powerup.x + powerup.width / 2);
      const dy = mouseY - (powerup.y + powerup.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < powerup.width / 2) {
        activatePowerup(powerup);
        playSound(powerup.type);
        powerups.splice(i, 1);
        return;
      }
    }
  }
}

function activatePowerup(powerup) {
  switch (powerup.type) {
    case "timeFreeze":
      gamePaused = true;
      showPowerupAnimation(powerup);
      setTimeout(() => {
        gamePaused = false;
      }, powerup.duration);
      break;

    case "extraHeart":
      if (hearts < 3) {
        hearts++;
        document.getElementById("hearts-container").innerHTML =
          updateHeartsHTML();
        showPowerupAnimation(powerup);
      }
      break;

    case "scoreBoost":
      powerup.active = true;
      powerup.activationTime = Date.now();
      showPowerupAnimation(powerup);

      setTimeout(() => {
        const index = powerups.findIndex((p) => p === powerup);
        if (index !== -1) {
          powerups.splice(index, 1);
        }
      }, powerup.duration);
      break;

    case "shield":
      powerup.active = true; // Ativa o poder de proteção
      powerup.activationTime = Date.now(); // Salva o tempo de ativação
      activateShield(powerup.duration);
      showPowerupAnimation(powerup);
      break;
  }
}
