document.addEventListener('DOMContentLoaded', () => {

  const gameConfig = {
    totalTimeSeconds: 10,
    countryCoords: {
      'brazil': { x: 95, y: 45 },
      'venezuela': { x: 80, y: 25 },
      'peru': { x: 60, y: 38 },
      'paraguay': { x: 85, y: 50 }
    }
  };

  // Debe ser la misma clave que usa tutorial.js
  const TUTORIAL_KEY = 'geoPlanetTutorialVisto';

  let selectedCountryKey = null;
  let userGuesses = {};
  let remainingTime = gameConfig.totalTimeSeconds;
  let timerInterval = null;
  let gameEnded = false;

  const optionCards = document.querySelectorAll('.option-card');
  const countryPaths = document.querySelectorAll('.country-path');
  const tiempoDisplay = document.getElementById('tiempo');
  const markersLayer = document.getElementById('markersLayer');
  const resultModal = document.getElementById('resultModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalDetails = document.getElementById('modalDetails');
  const cuentaRegresivaSpan = document.getElementById('cuentaRegresiva');

  initGame();

  function tutorialPendiente() {
    try {
      return localStorage.getItem(TUTORIAL_KEY) !== '1';
    } catch (e) {
      return true; // sin localStorage el tutorial se muestra siempre
    }
  }

  function initGame() {
    bindEvents();
    updateTimerDisplay(); // muestra 00:10 quieto

    if (tutorialPendiente()) {
      // El cronómetro espera a que termine (o se salte) el tutorial
      document.addEventListener('tutorial:fin', startTimer, { once: true });
    } else {
      startTimer();
    }
  }

  function startTimer() {
    if (timerInterval || gameEnded) return; // evita iniciarlo dos veces
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      remainingTime--;
      updateTimerDisplay();

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endGame(true);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedSec = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMin = minutes < 10 ? `0${minutes}` : minutes;
    tiempoDisplay.textContent = `${formattedMin}:${formattedSec}`;
  }

  function bindEvents() {
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        if (gameEnded) return;

        optionCards.forEach(c => c.classList.remove('seleccionada'));
        card.classList.add('seleccionada');
        selectedCountryKey = card.getAttribute('data-country');
      });
    });

    countryPaths.forEach(path => {
      path.addEventListener('click', () => {
        if (gameEnded) return;

        if (!selectedCountryKey) {
          alert('Primero selecciona un país de las opciones de la derecha.');
          return;
        }

        const clickedCountryKey = path.getAttribute('data-country');
        userGuesses[selectedCountryKey] = clickedCountryKey;

        const currentCard = document.querySelector(`.option-card[data-country="${selectedCountryKey}"]`);
        if (currentCard) {
          currentCard.classList.remove('seleccionada');
          currentCard.style.pointerEvents = 'none';
          currentCard.style.opacity = '0.6';
        }

        selectedCountryKey = null;

        if (Object.keys(userGuesses).length === optionCards.length) {
          clearInterval(timerInterval);
          endGame(false);
        }
      });
    });
  }

  function endGame(timeOut) {
    gameEnded = true;
    let correctCount = 0;
    const totalOptions = optionCards.length;
    modalDetails.innerHTML = '';

    optionCards.forEach(card => {
      const countryKey = card.getAttribute('data-country');
      const guessedKey = userGuesses[countryKey];
      const isCorrect = (guessedKey === countryKey);

      card.style.opacity = '1';

      if (isCorrect) {
        correctCount++;
        card.classList.add('correcta');
        placeMarker(countryKey, 'correcta-mira', '✓');
      } else {
        card.classList.add('incorrecta');

        if (guessedKey) {
          placeMarker(guessedKey, 'incorrecta-mira', '✗');
        }

        placeMarker(countryKey, 'missed-mira', '🎯');

        const detailItem = document.createElement('div');
        detailItem.style.marginBottom = '0.3em';
        detailItem.innerHTML = `❌ <b>${getCountryName(countryKey)}</b>: Se marcaciones erróneas o no ubicadas.`;
        modalDetails.appendChild(detailItem);
      }
    });

    if (timeOut) {
      modalTitle.textContent = '¡Tiempo Agotado!';
      modalMessage.textContent = `Puntuación: ${correctCount} de ${totalOptions} acertados.`;
    } else if (correctCount === totalOptions) {
      modalTitle.textContent = '¡Excelente!';
      modalMessage.textContent = '¡Has acertado todas las ubicaciones!';
      modalDetails.innerHTML = '<div>🎉 ¡Completado sin errores!</div>';
    } else {
      modalTitle.textContent = 'Juego Terminado';
      modalMessage.textContent = `Acertaste ${correctCount} de ${totalOptions} países.`;
    }

    resultModal.classList.add('active');

    // CONTEO REGRESIVO DE 5 SEGUNDOS AUTOMÁTICO
    let countdown = 5;
    cuentaRegresivaSpan.textContent = countdown;
    const countdownInterval = setInterval(() => {
      countdown--;
      cuentaRegresivaSpan.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        location.reload();
      }
    }, 1000);
  } 

  function placeMarker(countryKey, className, symbol) {
    const coords = gameConfig.countryCoords[countryKey];
    if (!coords) return;

    const marker = document.createElement('div');
    marker.className = `target-marker ${className}`;
    marker.style.left = `${coords.x}%`;
    marker.style.top = `${coords.y}%`;
    marker.textContent = symbol;

    markersLayer.appendChild(marker);
  }

  function getCountryName(key) {
    const names = {
      'brazil': 'Brazil',
      'venezuela': 'Venezuela',
      'peru': 'Perú',
      'paraguay': 'Paraguay'
    };
    return names[key] || key;
  }
});
