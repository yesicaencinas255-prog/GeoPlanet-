/* ============================================================
   EDITAR PERFIL - Geo Planet
   Guarda los datos en localStorage del navegador.
   ============================================================ */

const CLAVE_NOMBRE = "geoplanet_nombre";
const CLAVE_PASSWORD = "geoplanet_password";
const CLAVE_FOTO = "geoplanet_foto";

const FOTO_POR_DEFECTO = "imagenes/usuario.png";
const TAMANO_MAX_MB = 5;      // peso máximo de la imagen elegida
const TAMANO_FOTO_PX = 300;   // la foto se recorta y reduce a 300x300

/* Elementos */
const formulario = document.getElementById("formEditar");
const vistaPrevia = document.getElementById("vistaPrevia");
const inputFoto = document.getElementById("inputFoto");
const btnCambiarFoto = document.getElementById("btnCambiarFoto");
const btnQuitarFoto = document.getElementById("btnQuitarFoto");

const inputNombre = document.getElementById("nombre");
const inputActual = document.getElementById("claveActual");
const inputNueva = document.getElementById("claveNueva");
const inputRepetir = document.getElementById("claveRepetir");
const campoActual = document.getElementById("campoActual");

const mensajeFoto = document.getElementById("mensajeFoto");
const mensajeGeneral = document.getElementById("mensajeGeneral");

/* Foto pendiente de guardar (null = sin cambios, "" = quitar foto) */
let fotoNueva = null;


/* ---------- Utilidades de almacenamiento ---------- */

function leer(clave) {
    try {
        return localStorage.getItem(clave);
    } catch (e) {
        return null;
    }
}

function guardar(clave, valor) {
    try {
        localStorage.setItem(clave, valor);
        return true;
    } catch (e) {
        return false;
    }
}

function borrar(clave) {
    try {
        localStorage.removeItem(clave);
    } catch (e) { }
}


/* ---------- Carga inicial ---------- */

function cargarDatos() {
    inputNombre.value = leer(CLAVE_NOMBRE) || "Usuario";
    vistaPrevia.src = leer(CLAVE_FOTO) || FOTO_POR_DEFECTO;

    // Si todavía no hay contraseña guardada, no se pide la actual
    if (!leer(CLAVE_PASSWORD)) {
        campoActual.style.display = "none";
    }
}


/* ---------- Navegación ---------- */

function volverAlPerfil() {
    window.location.href = "perfil.html";
}


/* ---------- Mensajes de error / estado ---------- */

function mostrarError(id, texto) {
    const el = document.getElementById(id);
    el.textContent = texto;
    el.classList.add("visible");
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(function (el) {
        el.textContent = "";
        el.classList.remove("visible");
    });
    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "mensaje";
}

function mensaje(el, texto, tipo) {
    el.textContent = texto;
    el.className = "mensaje " + tipo;
}


/* ---------- Foto de perfil ---------- */

btnCambiarFoto.addEventListener("click", function () {
    inputFoto.click();
});

inputFoto.addEventListener("change", function () {
    const archivo = inputFoto.files[0];
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
        mensaje(mensajeFoto, "El archivo elegido no es una imagen.", "mal");
        inputFoto.value = "";
        return;
    }

    if (archivo.size > TAMANO_MAX_MB * 1024 * 1024) {
        mensaje(mensajeFoto, "La imagen pesa más de " + TAMANO_MAX_MB + " MB.", "mal");
        inputFoto.value = "";
        return;
    }

    const lector = new FileReader();

    lector.onload = function () {
        const img = new Image();

        img.onload = function () {
            // Recorte cuadrado centrado y reducción de tamaño
            const lado = Math.min(img.width, img.height);
            const sx = (img.width - lado) / 2;
            const sy = (img.height - lado) / 2;

            const canvas = document.createElement("canvas");
            canvas.width = TAMANO_FOTO_PX;
            canvas.height = TAMANO_FOTO_PX;
            canvas.getContext("2d").drawImage(
                img, sx, sy, lado, lado, 0, 0, TAMANO_FOTO_PX, TAMANO_FOTO_PX
            );

            fotoNueva = canvas.toDataURL("image/jpeg", 0.85);
            vistaPrevia.src = fotoNueva;
            mensaje(mensajeFoto, "Foto lista. Presioná «Guardar cambios».", "ok");
        };

        img.onerror = function () {
            mensaje(mensajeFoto, "No se pudo leer la imagen.", "mal");
        };

        img.src = lector.result;
    };

    lector.onerror = function () {
        mensaje(mensajeFoto, "No se pudo leer el archivo.", "mal");
    };

    lector.readAsDataURL(archivo);
});

btnQuitarFoto.addEventListener("click", function () {
    fotoNueva = "";
    inputFoto.value = "";
    vistaPrevia.src = FOTO_POR_DEFECTO;
    mensaje(mensajeFoto, "Se usará la foto por defecto al guardar.", "ok");
});


/* ---------- Mostrar / ocultar contraseña ---------- */

document.querySelectorAll(".ojo").forEach(function (boton) {
    boton.addEventListener("click", function () {
        const campo = document.getElementById(boton.dataset.objetivo);
        campo.type = campo.type === "password" ? "text" : "password";
    });
});


/* ---------- Guardar cambios ---------- */

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    const nombre = inputNombre.value.trim();
    const actual = inputActual.value;
    const nueva = inputNueva.value;
    const repetir = inputRepetir.value;
    const passwordGuardada = leer(CLAVE_PASSWORD);
    const quiereCambiarClave = nueva !== "" || repetir !== "" || actual !== "";

    let valido = true;

    // Nombre
    if (nombre.length < 3) {
        mostrarError("errorNombre", "El nombre debe tener al menos 3 caracteres.");
        valido = false;
    }

    // Contraseña (solo si se completó algún campo)
    if (quiereCambiarClave) {
        if (passwordGuardada && actual !== passwordGuardada) {
            mostrarError("errorActual", "La contraseña actual no es correcta.");
            valido = false;
        }

        if (nueva.length < 6) {
            mostrarError("errorNueva", "La nueva contraseña debe tener al menos 6 caracteres.");
            valido = false;
        }

        if (nueva !== repetir) {
            mostrarError("errorRepetir", "Las contraseñas no coinciden.");
            valido = false;
        }
    }

    if (!valido) return;

    // Guardado
    let todoOk = guardar(CLAVE_NOMBRE, nombre);

    if (quiereCambiarClave) {
        todoOk = guardar(CLAVE_PASSWORD, nueva) && todoOk;
    }

    if (fotoNueva === "") {
        borrar(CLAVE_FOTO);
    } else if (fotoNueva !== null) {
        todoOk = guardar(CLAVE_FOTO, fotoNueva) && todoOk;
    }

    if (!todoOk) {
        mensaje(mensajeGeneral, "No se pudieron guardar los datos en el navegador.", "mal");
        return;
    }

    mensaje(mensajeGeneral, "✅ Cambios guardados. Volviendo al perfil...", "ok");
    setTimeout(volverAlPerfil, 1200);
});


cargarDatos();