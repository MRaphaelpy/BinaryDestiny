function generateBinary() {
  let binary = "";
  for (let i = 0; i < 4; i++) {
    binary += Math.round(Math.random());
  }
  return binary;
}

function createBlock() {
  const binary = generateBinary();
  currentCorrectAnswer = parseInt(binary, 2);

  blocks.push({
    x: Math.random() * (canvas.width - 100),
    y: -100,
    width: 100,
    height: 100,
    binary: binary,
  });

  updateAnswerButtons();
}

function drawCyberpunkBlock(block) {
  ctx.fillStyle = "rgba(10, 20, 40, 0.7)";
  ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
  ctx.lineWidth = 2;

  const gradient = ctx.createLinearGradient(
    block.x,
    block.y,
    block.x + block.width,
    block.y + block.height
  );
  gradient.addColorStop(0, "rgba(10, 20, 40, 0.7)");
  gradient.addColorStop(1, "rgba(30, 40, 80, 0.7)");
  ctx.fillStyle = gradient;
  ctx.fillRect(block.x, block.y, block.width, block.height);

  ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
  ctx.strokeRect(block.x, block.y, block.width, block.height);

  ctx.strokeStyle = "rgba(255, 0, 255, 0.5)";
  ctx.strokeRect(block.x + 5, block.y + 5, block.width - 10, block.height - 10);

  ctx.strokeStyle = "rgba(0, 255, 255, 0.4)";
  ctx.beginPath();
  ctx.moveTo(block.x + 20, block.y);
  ctx.lineTo(block.x + 20, block.y + 20);
  ctx.lineTo(block.x + 40, block.y + 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(block.x + block.width, block.y + 40);
  ctx.lineTo(block.x + block.width - 20, block.y + 40);
  ctx.lineTo(block.x + block.width - 20, block.y + 60);
  ctx.stroke();

  ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
  ctx.font = '18px "Orbitron", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(
    block.binary,
    block.x + block.width / 2,
    block.y + block.height / 2
  );

  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
  ctx.fillText(
    block.binary,
    block.x + block.width / 2,
    block.y + block.height / 2
  );
  ctx.shadowBlur = 0;
}
