// Manter as funções existentes
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playSound(powerupType) {
  let soundFile;

  switch (powerupType) {
    case "timeFreeze":
      soundFile = "music/efects/ice.mp3";
      break;
    case "extraHeart":
      soundFile = "music/efects/heart.mp3";
      break;
    case "scoreBoost":
      soundFile = "music/efects/boost.mp3";
      break;
    case "shield":
      soundFile = "music/efects/shield.mp3";
      break;
    default:
      soundFile = "music/powerup.mp3";
  }

  const audio = new Audio(soundFile);
  audio.volume = 0.2;
  audio.play().catch((err) => {
    console.error("Erro ao tocar som do power-up:", err);
  });
}

function gameOverMusic() {
  stopBackgroundMusic();
  const audio = new Audio(`music/death.mp3`);
  audio.volume = 0.2;
  audio.play();
}

function startGameMusic() {
  stopBackgroundMusic();
  const audio = new Audio(`music/megalovania.mp3`);
  audio.volume = 0.2;
  audio.play();
}

// Lista de arquivos de música na pasta background
// Você precisa manter esta lista atualizada manualmente quando adicionar novos arquivos
const musicFileList = [
  "megalovania.mp3",
  "gameconso.mp3",
  "8BIT.mp3",
  "BatmanStreetsofDesolation.mp3",
  "Ghostbusters2.mp3",
  "Kirby.mp3",
  "SectionZ.mp3",
  // Adicione todos os nomes de arquivos que estiverem na sua pasta music/background/
];

// Modificação para carregar todas as músicas dinamicamente
let backgroundTracks = [];
let loadedTracks = 0;
let currentTrackIndex = 0;
let isBackgroundMusicPlaying = false;
let playList = [];

// Função para carregar todas as músicas
function loadMusicTracks() {
  return new Promise((resolve) => {
    console.log(`Carregando ${musicFileList.length} arquivos de música...`);
    backgroundTracks = [];
    loadedTracks = 0;

    // Se não houver músicas na lista, resolve imediatamente
    if (musicFileList.length === 0) {
      console.warn("Nenhum arquivo de música encontrado na lista!");
      resolve();
      return;
    }

    // Para cada arquivo na lista, cria um objeto Audio
    musicFileList.forEach((fileName, index) => {
      const track = new Audio(`music/background/${fileName}`);

      // Configura volume e eventos
      track.volume = 0.1;
      track.preload = "auto";

      // Adiciona evento quando os metadados do áudio são carregados
      track.addEventListener("loadedmetadata", function () {
        loadedTracks++;
        console.log(
          `Música carregada (${loadedTracks}/${musicFileList.length}): ${fileName}`
        );

        // Quando todos os arquivos estiverem carregados, resolve a Promise
        if (loadedTracks === musicFileList.length) {
          console.log("Todas as músicas foram carregadas com sucesso!");
          resolve();
        }
      });

      // Adiciona evento para erro de carregamento
      track.addEventListener("error", function () {
        console.error(`Erro ao carregar música: ${fileName}`);
        loadedTracks++;

        // Mesmo com erro, continua para não travar o carregamento
        if (loadedTracks === musicFileList.length) {
          console.log(
            "Processo de carregamento de música concluído com erros."
          );
          resolve();
        }
      });

      // Adiciona à lista de músicas
      backgroundTracks.push(track);
    });
  });
}

// Inicializa a lista de reprodução aleatória
function initializePlaylist() {
  // Crie uma lista de índices válidos (apenas músicas que carregaram corretamente)
  const validTracks = backgroundTracks
    .map((track, index) => ({ track, index }))
    .filter((item) => item.track.readyState > 0) // Filtra apenas músicas carregadas
    .map((item) => item.index);

  if (validTracks.length === 0) {
    console.error("Nenhuma música válida disponível para reprodução!");
    return;
  }

  // Embaralha os índices válidos
  playList = shuffleArray([...validTracks]);
  currentTrackIndex = 0;
  console.log("Playlist aleatória criada:", playList);
}

// Função para reproduzir a próxima música da lista
function playNextTrack() {
  // Pare a música atual se estiver tocando
  if (isBackgroundMusicPlaying) {
    backgroundTracks.forEach((track) => {
      track.pause();
      track.currentTime = 0;
    });
  }

  // Se a playlist estiver vazia ou chegou ao final, cria uma nova
  if (playList.length === 0 || currentTrackIndex >= playList.length) {
    initializePlaylist();
    // Se ainda estiver vazia após inicializar, há um problema
    if (playList.length === 0) {
      console.error(
        "Não foi possível criar playlist: nenhuma música disponível"
      );
      isBackgroundMusicPlaying = false;
      return;
    }
  }

  const trackToPlay = playList[currentTrackIndex];
  const fileName = musicFileList[trackToPlay] || "desconhecido";
  console.log(
    `Tocando música: ${currentTrackIndex + 1}/${playList.length} (${fileName})`
  );

  // Configura a música atual
  const currentTrack = backgroundTracks[trackToPlay];
  currentTrack.volume = 0.1;

  // Limpa qualquer event listener anterior
  currentTrack.onended = null;

  // Adiciona evento para tocar a próxima música quando esta terminar
  currentTrack.onended = function () {
    currentTrackIndex++;
    playNextTrack();
  };

  // Inicia a reprodução
  const playPromise = currentTrack.play();

  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.error("Erro ao reproduzir música de fundo:", err);
      // Tenta a próxima música em caso de erro
      currentTrackIndex++;
      setTimeout(playNextTrack, 500); // Pequeno atraso antes de tentar novamente
    });
  }

  isBackgroundMusicPlaying = true;
}

// Função para iniciar a música de fundo
async function playBackgroundMusic() {
  // Se as músicas ainda não foram carregadas, carrega-as primeiro
  if (backgroundTracks.length === 0) {
    console.log("Carregando músicas de fundo...");
    await loadMusicTracks();
  }

  // Inicializa a playlist se ainda não foi feito ou está vazia
  if (playList.length === 0) {
    initializePlaylist();
  }

  // Só inicia a reprodução se houver músicas na playlist
  if (playList.length > 0) {
    playNextTrack();
  } else {
    console.error(
      "Não foi possível iniciar a música: nenhuma música disponível"
    );
  }
}

// Função para parar a música de fundo
function stopBackgroundMusic() {
  isBackgroundMusicPlaying = false;

  backgroundTracks.forEach((track) => {
    track.pause();
    track.currentTime = 0;
    track.onended = null; // Remove o event listener
  });
}

// Função para pausar/retomar a música de fundo
function toggleBackgroundMusic(shouldPlay) {
  if (playList.length === 0 || currentTrackIndex >= playList.length) {
    return;
  }

  const currentTrack = backgroundTracks[playList[currentTrackIndex]];

  if (!currentTrack) {
    console.error("Faixa atual indisponível");
    return;
  }

  if (shouldPlay === undefined) {
    // Inverte o estado atual
    if (isBackgroundMusicPlaying) {
      currentTrack.pause();
      isBackgroundMusicPlaying = false;
    } else {
      currentTrack
        .play()
        .catch((err) => console.error("Erro ao retomar música:", err));
      isBackgroundMusicPlaying = true;
    }
  } else if (shouldPlay) {
    // Continua a música atual
    if (!isBackgroundMusicPlaying) {
      currentTrack
        .play()
        .catch((err) => console.error("Erro ao retomar música:", err));
      isBackgroundMusicPlaying = true;
    }
  } else {
    // Pausa a música atual
    if (isBackgroundMusicPlaying) {
      currentTrack.pause();
      isBackgroundMusicPlaying = false;
    }
  }
}

// Função para carregar as músicas assim que a página carregar
document.addEventListener("DOMContentLoaded", function () {
  // Pré-carrega as músicas em segundo plano
  loadMusicTracks().then(() => {
    console.log("Músicas pré-carregadas com sucesso");
  });
});
