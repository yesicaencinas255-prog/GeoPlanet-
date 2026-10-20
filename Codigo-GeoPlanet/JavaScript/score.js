// ==========================================
// score.js - Control Global de Puntaje
// ==========================================

// Inicia la partida limpia en 0 (Llamado en la primera pantalla)
function reiniciarPuntaje() {
    localStorage.setItem("puntos", "0");
    localStorage.setItem("pistasUsadas", "0");
    localStorage.setItem("logros", "[]");
    localStorage.setItem("respuestasCorrectas", "0");
    recalcularMonedas();
}

// Obtener los puntos actuales acumulados
function obtenerPuntos() {
    return parseInt(localStorage.getItem("puntos") || "0");
}

// Sumar puntos por respuesta correcta (+10)
function sumarPuntos(puntos = 10) {
    let puntosActuales = obtenerPuntos() + puntos;
    let correctas = parseInt(localStorage.getItem("respuestasCorrectas") || "0") + 1;
    
    localStorage.setItem("puntos", puntosActuales.toString());
    localStorage.setItem("respuestasCorrectas", correctas.toString());
    recalcularMonedas();
}

// Descuenta 3 puntos por cada pista usada
function pedirPista(costoEnPuntos = 3) {
    let puntosActuales = obtenerPuntos();
    let pistas = parseInt(localStorage.getItem("pistasUsadas") || "0");
    
    // Evita puntos negativos
    puntosActuales = Math.max(0, puntosActuales - costoEnPuntos);
    pistas++;

    localStorage.setItem("puntos", puntosActuales.toString());
    localStorage.setItem("pistasUsadas", pistas.toString());
    recalcularMonedas();
}

// Recalcular monedas (1 punto = 10 monedas)
function recalcularMonedas() {
    let puntos = obtenerPuntos();
    let monedas = puntos * 10;
    localStorage.setItem("monedas", monedas.toString());
}

// Guardar logros desbloqueados
function guardarLogro(logro) {
    let logros = JSON.parse(localStorage.getItem("logros") || "[]");
    if (!logros.includes(logro)) {
        logros.push(logro);
        localStorage.setItem("logros", JSON.stringify(logros));
    }
}