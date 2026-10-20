   const INITIAL_TIME = 25;
    let timeLeft = INITIAL_TIME;
    let timerInterval = null;
    let isGameOver = false;

    const timerDisplay = document.getElementById('timer-display');
    const timerIcon = document.getElementById('timer-icon');
    const overlay = document.getElementById('game-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalBtn = document.getElementById('modal-btn');

    window.addEventListener('DOMContentLoaded', () => {
      startTimer();
    });

    function startTimer() {
      clearInterval(timerInterval);
      timeLeft = INITIAL_TIME;
      isGameOver = false;
      updateTimerDisplay();

      if (timerIcon) timerIcon.classList.add('ticking-anim');

      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          stopTimerAnimation();
          gameOver("¡Se acabó el tiempo!", "Perdiste la partida. Llegaste a 00:00.");
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      const seconds = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
      timerDisplay.textContent = `00:${seconds}`;
    }

    function stopTimerAnimation() {
      if (timerIcon) timerIcon.classList.remove('ticking-anim');
    }

    function checkAnswer(selectedOption) {
      if (isGameOver) return;
      const CORRECT_ANSWER = "Ninguna";

      clearInterval(timerInterval);
      stopTimerAnimation();

      if (selectedOption === CORRECT_ANSWER) {
        showWinScreen();
      } else {
        gameOver("Perdiste la partida", `Elegiste "${selectedOption}". No es la opción correcta.`);
      }
    }

    function showWinScreen() {
      isGameOver = true;
      modalTitle.textContent = "¡Correcto! 🎉";
      modalTitle.style.color = "#4CAF50";
      modalMessage.textContent = "¡Correcto! Avanzando a la siguiente pregunta...";
      modalBtn.textContent = "Siguiente Pregunta";
      modalBtn.onclick = () => {
        alert("Redireccionando...");
        restartGame();
      };
      overlay.classList.remove('hidden');
    }

    function gameOver(title, message) {
      isGameOver = true;
      modalTitle.textContent = title;
      modalTitle.style.color = "#ff5252";
      modalMessage.textContent = message;
      modalBtn.textContent = "Reintentar";
      modalBtn.onclick = () => restartGame();
      overlay.classList.remove('hidden');
    }

    function restartGame() {
      overlay.classList.add('hidden');
      startTimer();
    }

    function goBack() {
      if (confirm("¿Deseas salir?")) alert("Volviendo...");
    }

    function openProfile() {
      alert("Perfil de usuario");
    }