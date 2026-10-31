// Diccionario con las rutas de las vestimentas completas
const opcionesRopa = {
  argentina: 'img/VestimentaArgentina.png',
  bolivia: 'img/VestimentasBolivia.png',
  brazil: 'img/VestimentasBrazil.png',
  chile: 'img/VestimentasChile.png',
  colombia: 'img/VestimentaColombia.png',
  ecuador: 'img/VestimentaEcuador.png',
  paraguay: 'img/VestimentaParaguay.png',
  peru: 'img/VestimentasPeru.png',
  uruguay: 'img/VestimentasUruguay.png',
  venezuela: 'img/VestimentasVenezuela.png'
};

document.addEventListener('DOMContentLoaded', () => {
  // Botón volver
  const btnAtras = document.getElementById('btn-atras');
  if (btnAtras) {
    btnAtras.addEventListener('click', () => {
      history.back();
    });
  }

  // Selección e intercambio de ropa y clases
  const tarjetas = document.querySelectorAll('.tarjeta');
  const personaje = document.getElementById('img-personaje');

  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const pais = tarjeta.getAttribute('data-pais');
      if (opcionesRopa[pais] && personaje) {
        // Cambia la imagen
        personaje.src = opcionesRopa[pais];
       
        // Cambia las clases para que aplique el CSS del país correspondiente
        personaje.className = `personaje personaje-${pais}`;
      }
    });
  });

  // Botón de Reinicio para volver a la ropa original del juego
  const btnReinicio = document.getElementById('btn-reinicio');
  if (btnReinicio && personaje) {
    btnReinicio.addEventListener('click', () => {
      personaje.src = 'img2/Personaje con vest.png';
      personaje.className = 'personaje';
    });
  }
});