let tiempo = 25;
let respondio = false;

let cronometro = setInterval(function () {
    tiempo--;
    if (tiempo < 10) {
        document.getElementById("tiempo").textContent = "00:0" + tiempo;
    } else {
        document.getElementById("tiempo").textContent = "00:" + tiempo;
    }
    
    if (tiempo <= 0) {
        clearInterval(cronometro);
        if (respondio == false) {
            respondio = true;
            const mensajeDiv = document.getElementById("mensajeResultado");
            if (mensajeDiv) {
                mensajeDiv.textContent = "⌛ ¡Se acabó el tiempo!";
                mensajeDiv.className = "mensaje-resultado advertencia";
            }
            document.getElementById("argentina").classList.add("correcta");
            setTimeout(siguienteNivel, 1500);
        }
    }
}, 1000);

function responder(respuesta) {
    if (respondio == true) return;
    respondio = true;
    clearInterval(cronometro);
    const mensajeDiv = document.getElementById("mensajeResultado");

    if (respuesta == "Argentina") {
        sumarPuntos(10); // +10 Puntos
        if (mensajeDiv) {
            mensajeDiv.textContent = "🎉 ¡Excelente! Respuesta correcta (+10 pts).";
            mensajeDiv.className = "mensaje-resultado correcto";
        }
        document.getElementById("argentina").classList.add("correcta");
        setTimeout(siguienteNivel, 1200);
    } else {
        if (mensajeDiv) {
            mensajeDiv.textContent = "❌ Respuesta incorrecta.";
            mensajeDiv.className = "mensaje-resultado incorrecto";
        }
        document.getElementById("argentina").classList.add("correcta");
        setTimeout(siguienteNivel, 1500);
    }
}

function salir() {
    window.location.href = "menu.html";
}

function siguienteNivel() {
    window.location.href = "juegonivel1.2Y.html";
}