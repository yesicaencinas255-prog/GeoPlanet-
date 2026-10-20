 document.addEventListener('DOMContentLoaded', () => {
      const inputNombre = document.getElementById('inputNombre');
      const btnSiguiente = document.getElementById('btnSiguiente');
      const mensajeNombre = document.getElementById('mensajeNombre');

      // Cargar el nombre registrado previamente si existe
      const datosGuardados = localStorage.getItem('geoPlanetUser');
      let usuario = datosGuardados ? JSON.parse(datosGuardados) : {};

      if (usuario.nombre) {
        inputNombre.value = usuario.nombre;
      }

      btnSiguiente.addEventListener('click', () => {
        const nuevoNombre = inputNombre.value.trim();

        if (!nuevoNombre) {
          mensajeNombre.innerText = "Ingresa un nombre de usuario válido.";
          return;
        }

        // Actualizar el nombre en los datos del usuario
        usuario.nombre = nuevoNombre;
        localStorage.setItem('geoPlanetUser', JSON.stringify(usuario));

        // Redirigir al menú principal
        window.location.href = 'menu.html';
      });
    });