const RESPUESTAS_CORRECTAS = ["linea", "línea", "frontera", "division", "división", "limite", "límite"];
let tiempoRestante = 25;
let temporizador = null;
let juegoTerminado = false;

document.addEventListener("DOMContentLoaded", () => {
  iniciarCronometro();
});

function iniciarCronometro() {
  clearInterval(temporizador);
  tiempoRestante = 25;
  juegoTerminado = false;
  actualizarReloj();
  temporizador = setInterval(() => {
    tiempoRestante--;
    actualizarReloj();
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      juegoTerminado = true;
      mostrarMensaje("⌛ ¡Se agotó el tiempo!", "advertencia");
      setTimeout(() => { window.location.href = "acertijo.html"; }, 1500);
    }
  }, 1000);
}

function actualizarReloj() {
  const cronometroEl = document.getElementById("cronometro");
  if (cronometroEl) {
    const seg = tiempoRestante < 10 ? `0${tiempoRestante}` : tiempoRestante;
    cronometroEl.textContent = `00:${seg}`;
  }
}

function enviarRespuesta() {
  if (juegoTerminado) return;
  const inputEl = document.getElementById("respuestaUsuario");
  const respuesta = inputEl.value.trim().toLowerCase();
  
  if (!respuesta) {
    mostrarMensaje("Escribí una respuesta antes de continuar.", "advertencia");
    return;
  }

  const esCorrecto = RESPUESTAS_CORRECTAS.some(palabra => respuesta.includes(palabra));
  if (esCorrecto) {
    clearInterval(temporizador);
    juegoTerminado = true;
    sumarPuntos(10); // +10 Puntos
    mostrarMensaje("🎉 ¡Correcto! (+10 pts). Redirigiendo...", "correcto");
    setTimeout(() => {
      window.location.href = "acertijo.html";
    }, 1200);
  } else {
    mostrarMensaje("❌ Respuesta incorrecta. Intentalo de nuevo.", "incorrecto");
  }
}

function mostrarMensaje(texto, tipo) {
  const mensajeEl = document.getElementById("mensajeResultado");
  if (mensajeEl) {
    mensajeEl.textContent = texto;
    mensajeEl.className = `mensaje-resultado ${tipo}`;
  }
}

// Pistas: Restan 3 puntos por cada uso
function usarPista(numPista) {
  if (juegoTerminado) return;
  const areaPista = document.getElementById("areaPista");
  const pistas = {
    1: "💡 Pista 1: Es una línea o frontera imaginaria o real.",
    2: "💡 Pista 2: Separa dos territorios, países o regiones.",
    3: "💡 Pista 3: Empieza con 'L' o involucra la palabra 'frontera'."
  };

  if (areaPista && pistas[numPista]) {
    areaPista.textContent = pistas[numPista];
    areaPista.style.display = "block";
   
    // Restar de 3 en 3 los puntos y reducir tiempo
    pedirPista(3); 
    tiempoRestante = Math.max(0, tiempoRestante - 3);
    actualizarReloj();
  }
}