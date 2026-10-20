const jugador = {
    nombre: "Usuario",
    puntos: 0,
    logrosObtenidos: 0,
    logrosTotales: 30,
    nivel: 1,
    xpActual: 0,
    xpSiguienteNivel: 500
};

function actualizarInterfazUsuario(datos) {
    // Busca el elemento del nombre y le coloca el nombre personalizado
    const userNameElem = document.getElementById('user-name');
    if (userNameElem && datos.nombre) {
        userNameElem.innerText = datos.nombre;
    }

    // Puntos
    const puntosElem = document.getElementById('puntos-text');
    if (puntosElem) {
        puntosElem.innerText = datos.puntos ? datos.puntos.toLocaleString('es-AR') : "0";
    }

    // Logros
    const logrosElem = document.getElementById('logros-text');
    if (logrosElem) {
        logrosElem.innerText = `${datos.logrosObtenidos || 0} / ${datos.logrosTotales}`;
    }

    // Nivel
    const levelElem = document.getElementById('user-level');
    if (levelElem) {
        levelElem.innerText = `Nivel ${datos.nivel || 1}`;
    }

    // Barra de XP
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');

    if (xpBar && xpText && datos.xpSiguienteNivel > 0) {
        let porcentaje = (datos.xpActual / datos.xpSiguienteNivel) * 100;
        porcentaje = Math.min(Math.max(porcentaje, 0), 100);
        xpBar.style.width = `${porcentaje}%`;
        xpText.innerText = `${datos.xpActual} / ${datos.xpSiguienteNivel}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Lee de localStorage lo que guardó la pantalla de personalización
    const datosGuardados = localStorage.getItem('geoPlanetUser');
    if (datosGuardados) {
        try {
            const parsedData = JSON.parse(datosGuardados);
            Object.assign(jugador, parsedData);
        } catch (e) {
            console.error("Error al leer localStorage:", e);
        }
    }

    actualizarInterfazUsuario(jugador);
});