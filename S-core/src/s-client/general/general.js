'use strict'

const musicProgressInput = document.getElementById('musicProgressSlider');
const volumeSlider = document.getElementById('volumeSlider');

let musicProgressValue = (musicProgressInput.value - musicProgressInput.min) / (musicProgressInput.max - musicProgressInput.min) * 100;
let volumeSliderValue = (volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min) * 100;
let currentSong ;


document.addEventListener('DOMContentLoaded', () => {

    if(volumeSlider.style.background !== `linear-gradient(to right,  var(--first-color) ${volumeSliderValue}%, var(--light-background-color) ${volumeSliderValue}%)`) {
        volumeSlider.style.background = `linear-gradient(to right,  var(--first-color) ${volumeSliderValue}%, var(--light-background-color) ${volumeSliderValue}%)`;
    }
    
    if(musicProgressInput.style.background !== `linear-gradient(to right,  var(--first-color) ${musicProgressValue}%, var(--light-background-color) ${musicProgressValue}%)`) {
        musicProgressInput.style.background = `linear-gradient(to right,  var(--first-color) ${musicProgressValue}%, var(--light-background-color) ${musicProgressValue}%)`;
    }
    
    musicProgressInput.addEventListener('input', () => {
        const value = (musicProgressInput.value - musicProgressInput.min) / (musicProgressInput.max - musicProgressInput.min) * 100;
        musicProgressValue = value
        musicProgressInput.style.background = `linear-gradient(to right,  var(--first-color) ${value}%, var(--light-background-color) ${value}%)`;
    });
    
    volumeSlider.addEventListener('input', () => {
        const value = (volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min) * 100;
        volumeSliderValue = value
        volumeSlider.style.background = `linear-gradient(to right,  var(--first-color) ${value}%, var(--light-background-color) ${value}%)`;
    });
})