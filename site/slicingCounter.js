const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const tokensValue = document.getElementById("numTokens");

// Función para actualizar el valor del control deslizante
export function updateSliderValue() {
    sliderValue.textContent = slider.value;
    let selectedStyle = JSON.parse(localStorage.getItem('selectedStyle'));

    if (selectedStyle.type === 'Solo') {
    
        tokensValue.textContent = parseInt(slider.value) * 1;
    } else {
   
        tokensValue.textContent = parseInt(slider.value) * 2;
    }

}

