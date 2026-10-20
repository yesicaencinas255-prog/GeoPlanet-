const INITIAL_TIME = 25;
    let timeLeft = INITIAL_TIME;
    let timerInterval = null;
    let isGameOver = false;

    const timerDisplay = document.getElementById('timer-display');
    const timerIcon = document.getElementById('timer-icon');

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
          // Si se acaba el tiempo, muestra el resultado acumulado
          mostrarCajitaResultados("⏰ ¡Tiempo Agotado!");
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

    // AL TOCAR UNA OPCIÓN: Se evalúa y se muestra el modal con los resultados totales
    function checkAnswer(selectedOption) {
      if (isGameOver) return;
      const CORRECT_ANSWER = "Colombia";

      clearInterval(timerInterval);
      stopTimerAnimation();
      isGameOver = true;

      if (selectedOption === CORRECT_ANSWER) {
        sumarPuntos(10); // Suma 10 puntos por acierto
        guardarLogro("⭐ Experto en Banderas");
        mostrarCajitaResultados("🎉 ¡Correcto!");
      } else {
        mostrarCajitaResultados("❌ Respuesta Incorrecta");
      }
    }

    // --- FUNCIONES DE CONTROL DE PUNTOS, MONEDAS Y LOGROS ---

    function sumarPuntos(puntos) {
      let puntosActuales = parseInt(localStorage.getItem("puntos") || "0");
      puntosActuales += puntos;
      localStorage.setItem("puntos", puntosActuales);
      recalcularMonedas();
    }

    function pedirPista(costoEnPuntos = 5) {
      let puntosActuales = parseInt(localStorage.getItem("puntos") || "0");
      let pistas = parseInt(localStorage.getItem("pistasUsadas") || "0");

      puntosActuales = Math.max(0, puntosActuales - costoEnPuntos);
      pistas++;

      localStorage.setItem("puntos", puntosActuales);
      localStorage.setItem("pistasUsadas", pistas);
      recalcularMonedas();

      alert(`💡 Pista activada (-${costoEnPuntos} puntos).`);
    }

    function recalcularMonedas() {
      let puntos = parseInt(localStorage.getItem("puntos") || "0");
      let monedas = puntos * 10;
      localStorage.setItem("monedas", monedas);
    }

    function guardarLogro(logro) {
      let logros = JSON.parse(localStorage.getItem("logros") || "[]");
      if (!logros.includes(logro)) {
        logros.push(logro);
        localStorage.setItem("logros", JSON.stringify(logros));
      }
    }

    // --- MOSTRAR LA CAJITA FINAL ---
    function mostrarCajitaResultados(titulo) {
      recalcularMonedas();

      const puntos = localStorage.getItem("puntos") || "0";
      const monedas = localStorage.getItem("monedas") || "0";
      const pistas = localStorage.getItem("pistasUsadas") || "0";

      // Otorgar logro si no se usaron pistas durante el juego
      if (parseInt(pistas) === 0) {
        guardarLogro("🧠 Master sin Pistas");
      }

      document.getElementById("tituloModal").textContent = titulo;
      document.getElementById("puntosTexto").textContent = puntos;
      document.getElementById("monedasTexto").textContent = `🪙 ${monedas}`;
      document.getElementById("pistasTexto").textContent = pistas;

      // Renderizar logros en la lista
      const listaLogros = document.getElementById("listaLogrosModal");
      listaLogros.innerHTML = "";
      
      const logrosActualizados = JSON.parse(localStorage.getItem("logros") || "[]");
      if (logrosActualizados.length === 0) {
        listaLogros.innerHTML = "<li>Sin logros en esta ronda</li>";
      } else {
        logrosActualizados.forEach(log => {
          const li = document.createElement("li");
          li.textContent = log;
          listaLogros.appendChild(li);
        });
      }

      // Mostrar el modal
      document.getElementById("modalResultado").style.display = "flex";
    }

    function finalizarJuego() {
      window.location.href = "menu.html";
    }

    function goBack() {
      if (confirm("¿Deseas salir del juego?")) {
        window.location.href = "menu.html";
      }
    }

    function openProfile() {
      alert("Perfil de usuario");
    }
