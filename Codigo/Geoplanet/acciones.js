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