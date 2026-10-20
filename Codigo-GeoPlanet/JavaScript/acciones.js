function irAPagina() {
    window.location.href = "ajustes.html";
}

function irAPagina2(){
    window.location.href = "menu.html";
}

// Reproducir música automáticamente
window.addEventListener("load", function() {

    const musica = document.getElementById("musica");

    musica.volume = 0.5;

    musica.play().catch(function() {
        console.log("El navegador bloqueó la reproducción automática.");
    });

});


// Cambiar volumen
function cambiarVolumen() {

    const musica = document.getElementById("musica");
    const volumen = document.getElementById("volumen");

    musica.volume = volumen.value;

}
    <!-- Script de lógica de juego e integración de datos -->
   
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
            // Actualizar NOMBRE DE USUARIO
            const userNameElem = document.getElementById('user-name');
            if (userNameElem && datos.nombre) {
                userNameElem.innerText = datos.nombre;
            }

            // Actualizar PUNTOS
            const puntosElem = document.getElementById('puntos-text');
            if (!datos.puntos || datos.puntos <= 0) {
                puntosElem.innerText = "0 Puntos";
            } else {
                puntosElem.innerText = datos.puntos.toLocaleString('es-AR') + " Puntos";
            }

            // Actualizar LOGROS
            const logrosElem = document.getElementById('logros-text');
            if (!datos.logrosObtenidos || datos.logrosObtenidos <= 0) {
                logrosElem.innerText = `Sin Logros (${datos.logrosTotales})`;
            } else {
                logrosElem.innerText = `${datos.logrosObtenidos} / ${datos.logrosTotales}`;
            }

            // Actualizar NIVEL
            document.getElementById('user-level').innerText = `Nivel ${datos.nivel || 1}`;

            // Actualizar BARRA DE EXPERIENCIA (XP)
            const xpBar = document.getElementById('xp-bar');
            const xpText = document.getElementById('xp-text');

            if (datos.xpSiguienteNivel > 0) {
                let porcentaje = (datos.xpActual / datos.xpSiguienteNivel) * 100;
                porcentaje = Math.min(Math.max(porcentaje, 0), 100);

                xpBar.style.width = `${porcentaje}%`;
                xpText.innerText = `${datos.xpActual} / ${datos.xpSiguienteNivel}`;
            } else {
                xpBar.style.width = '100%';
                xpText.innerText = 'MAX';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const datosGuardados = localStorage.getItem('geoPlanetUser');
            if (datosGuardados) {
                Object.assign(jugador, JSON.parse(datosGuardados));
            }

            actualizarInterfazUsuario(jugador);
        });

        function agregarPuntos(cantidad) {
            jugador.puntos += cantidad;
            jugador.xpActual += cantidad;

            if (jugador.xpActual >= jugador.xpSiguienteNivel) {
                jugador.nivel++;
                jugador.xpActual -= jugador.xpSiguienteNivel;
                jugador.xpSiguienteNivel = Math.round(jugador.xpSiguienteNivel * 1.5);
                alert(`¡Felicidades! Subiste al Nivel ${jugador.nivel}`);
            }

            localStorage.setItem('geoPlanetUser', JSON.stringify(jugador));
            actualizarInterfazUsuario(jugador);
        }
   