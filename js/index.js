let canvas,
  ctx,
  blocks = [],
  score = 0,
  speed = 1;
let gameActive = false;
let currentCorrectAnswer;
let menu, scoreDisplay;
let playerName = "";
let hearts = 3;
let gamePaused = false;
let powerups = [];
let streak = 0;
let leaderboard = JSON.parse(localStorage.getItem("Rafa")) || [];

let backgroundMusic;
startGameMusic();
document.addEventListener("DOMContentLoaded", function () {
  startGameMusic();
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  menu = document.getElementById("menu");
  scoreDisplay = document.getElementById("score-display");

  const answerInput = document.getElementById("answer-input");
  answerInput.innerHTML = '<div id="answer-buttons"></div>';

  updateMenuHTML(); // Atualiza a tela inicial do menu
});
