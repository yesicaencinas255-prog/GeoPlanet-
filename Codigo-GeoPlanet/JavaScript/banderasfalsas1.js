const INITIAL_TIME = 25;
let timeLeft = INITIAL_TIME;
let timerInterval = null;
let isGameOver = false;

// Elementos del DOM
const timerDisplay = document.getElementById('timer-display');
const timerIcon = document.getElementById('timer-icon');
const mensajeResultado = document.getElementById('mensajeResultado');

// --- MANEJO SEGURO DE PUNTAJE ---
function reiniciarPuntajeSeguro() {
  if (typeof reiniciarPuntaje === 'function') {
    reiniciarPuntaje();
  } else {
    localStorage.setItem('puntaje', '0');
  }
}

function sumarPuntosSeguro(puntos) {
  if (typeof sumarPuntos === 'function') {
    sumarPuntos(puntos);
  } else {
    let actual = parseInt(localStorage.getItem('puntaje') || '0', 10);
    localStorage.setItem('puntaje', (actual + puntos).toString());
  }
}

// --- EVENTO DE INICIO ---
window.addEventListener('DOMContentLoaded', () => {
  reiniciarPuntajeSeguro(); 
  startTimer();
});

// --- CRONÓMETRO ---
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = INITIAL_TIME;
  isGameOver = false;

  if (mensajeResultado) {
    mensajeResultado.textContent = "";
    mensajeResultado.className = "mensaje-resultado";
  }

  updateTimerDisplay();

  if (timerIcon) timerIcon.classList.add('ticking-anim');

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      stopTimerAnimation();
      isGameOver = true;

      if (mensajeResultado) {
        mensajeResultado.textContent = "⌛ ¡Se acabó el tiempo!";
        mensajeResultado.className = "mensaje-resultado advertencia";
      }

      setTimeout(() => { 
        window.location.href = "PreguntasN1.html"; 
      }, 1500);
    }
  }, 1000);
}

function updateTimerDisplay() {
  if (!timerDisplay) return;
  const seconds = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
  timerDisplay.textContent = `00:${seconds}`;
}

function stopTimerAnimation() {
  if (timerIcon) timerIcon.classList.remove('ticking-anim');
}

// --- EVALUACIÓN DE RESPUESTA ---
function checkAnswer(selectedOption, clickedBtn) {
  if (isGameOver) return;
  
  const CORRECT_ANSWER = "Ninguna";
  clearInterval(timerInterval);
  stopTimerAnimation();
  isGameOver = true;

  // Deshabilitar todos los botones para evitar múltiples clics
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.style.pointerEvents = 'none');

  if (selectedOption === CORRECT_ANSWER) {
    sumarPuntosSeguro(10); // Respuesta correcta: +10 pts
    if (clickedBtn) clickedBtn.classList.add('correcto-btn');

    if (mensajeResultado) {
      mensajeResultado.textContent = "🎉 ¡Excelente! Respuesta correcta (+10 pts).";
      mensajeResultado.className = "mensaje-resultado correcto";
    }
  } else {
    if (clickedBtn) clickedBtn.classList.add('incorrecto-btn');

    if (mensajeResultado) {
      mensajeResultado.textContent = `❌ Respuesta incorrecta. Elegiste "${selectedOption}".`;
      mensajeResultado.className = "mensaje-resultado incorrecto";
    }
  }

  setTimeout(() => {
    window.location.href = "PreguntasN1.html";
  }, 1500);
}

// --- NAVEGACIÓN ---
function goBack() {
  if (confirm("¿Deseas salir?")) {
    window.location.href = "menu.html";
  }
}

function openProfile() { 
  alert("Perfil de usuario"); 
}