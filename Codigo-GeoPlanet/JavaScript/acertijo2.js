// Tiempo inicial

let tiempo = 25;

let respondio = false;


// CRONÓMETRO

let cronometro = setInterval(function () {

    tiempo--;

    if (tiempo < 10) {

        document.getElementById("tiempo").textContent = "00:0" + tiempo;

    } else {

        document.getElementById("tiempo").textContent = "00:" + tiempo;

    }


    // Se terminó el tiempo

    if (tiempo <= 0) {

        clearInterval(cronometro);

        if (respondio == false) {

            respondio = true;

            alert("¡Se acabó el tiempo!");

            // Brilla la respuesta correcta

            document
                .getElementById("argentina")
                .classList.add("correcta");

        }

    }

}, 1000);


// RESPONDER

function responder(respuesta) {

    // No permite responder dos veces

    if (respondio == true) {

        return;

    }


    respondio = true;

    clearInterval(cronometro);


    // RESPUESTA CORRECTA

    if (respuesta == "Argentina") {

        alert("¡Correcto!");

        document
            .getElementById("argentina")
            .classList.add("correcta");

    }


    // RESPUESTA INCORRECTA

    else {

        alert("¡Incorrecto!");

        // Muestra la respuesta correcta

        document
            .getElementById("argentina")
            .classList.add("correcta");

    }

}


// BOTÓN DE SALIR

function salir() {

    window.location.href = "menu.html";

}


// SIGUIENTE NIVEL

function siguienteNivel() {

    window.location.href = "nivel2.html";

}