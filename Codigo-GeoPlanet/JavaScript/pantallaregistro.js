 document.getElementById('formRegistro').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const curso = document.getElementById('curso').value.trim();
      const gmail = document.getElementById('gmail').value.trim();
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value;
      const mensaje = document.getElementById('mensaje');

      // Validación simple
      if (!nombre || !apellido || !curso || !gmail || !password || !password2) {
        mensaje.innerText = "Por favor, completa todos los campos.";
        return;
      }

      if (password !== password2) {
        mensaje.innerText = "Las contraseñas no coinciden.";
        return;
      }

      // Estructura inicial del usuario
      const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        curso: curso,
        gmail: gmail,
        puntos: 0,
        logrosObtenidos: 0,
        logrosTotales: 30,
        nivel: 1,
        xpActual: 0,
        xpSiguienteNivel: 500
      };

      // Guardar datos temporalmente y redirigir
      localStorage.setItem('geoPlanetUser', JSON.stringify(nuevoUsuario));
      window.location.href = 'personalizacion_nombre.html';
    });