document.getElementById('form-login').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página recargue inmediatamente
            
            const email = document.getElementById('email-input').value;
            
            // Extraer el nombre de usuario antes del @ (ej: "juan.perez@gmail.com" -> "juan.perez")
            const nombreExtraido = email.split('@')[0];

            // Cargar datos guardados previos o usar valores por defecto
            const usuarioExistente = JSON.parse(localStorage.getItem('geoPlanetUser')) || {
                puntos: 1250,
                logrosObtenidos: 12,
                logrosTotales: 30,
                nivel: 5,
                xpActual: 350,
                xpSiguienteNivel: 800
            };

            // Asignar el nuevo nombre de usuario
            usuarioExistente.nombre = nombreExtraido;

            // Guardar en el navegador
            localStorage.setItem('geoPlanetUser', JSON.stringify(usuarioExistente));

            // Redirigir al menú
            window.location.href = 'menu.html';
        });