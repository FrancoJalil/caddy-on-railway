function getStartedFlux() {
   
    // llevarlo a /signup con algun contexto
    window.location.href = "/login?next=pricing";
}

function getStartedFluxV() {
   
    // llevarlo a /signup con algun contexto
    window.location.href = "/login?next=verification";
}

document.addEventListener('DOMContentLoaded', () => {
    let getStartedButton = document.getElementById('getStarted');
    let getStartedVerification = document.getElementById('getStartedVerification');

    getStartedButton.addEventListener('click', getStartedFlux);
    getStartedVerification.addEventListener('click', getStartedFluxV);
});
