// LOADING
const textArray = ["..."];
const textElement = document.getElementById("texto");
let textIndex = 0;
let writingInterval;
let deletingInterval;

export function escribirTexto(message) {
    const textoActual = textArray[textIndex];
    textElement.textContent = message;

    let puntoIndex = 0;
    writingInterval = setInterval(function () {
        textElement.textContent += textoActual.charAt(puntoIndex);
        puntoIndex++;

        if (puntoIndex === textoActual.length) {
            clearInterval(writingInterval);
            setTimeout(borrarTexto(message), 300); // Tiempo de pausa antes de borrar
        }
    }, 300); // Velocidad de escritura de los puntos
}

function borrarTexto(message) {
    let txt_len = message;
    console.log("borrando");
    const textoActual = textArray[textIndex];
    deletingInterval = setInterval(function () {
        if (textElement.textContent.length >= txt_len + 3) {
            textElement.textContent = message;
        } else {
            clearInterval(deletingInterval);
            textIndex = (textIndex + 1) % textArray.length; // Ciclo de texto
            setTimeout(escribirTexto(message), 300); // Tiempo de pausa antes de volver a escribir
        }
    }, 400); // Velocidad de borrado
}

export function detenerBucle() {
    
    textElement.textContent = "";
    clearInterval(writingInterval);
    clearInterval(deletingInterval);
}
