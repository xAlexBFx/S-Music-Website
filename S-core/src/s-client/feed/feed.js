'use strict'
const headerCenterContainer = document.getElementById('headerCenterContainer');
const searchBarInput = document.getElementById('searchBar');
const searcherContainer = document.getElementById('searcherContainer');

let searcherContainerStatus = false;
let currentMainSection = 'recommended';
let currentMainButton = 'Recommended';

document.addEventListener('DOMContentLoaded', () => {

    headerCenterContainer.addEventListener('click', function() {
        searchBarInput.focus();
    });

    searchBarInput.addEventListener('input', () => {
        if(searchBarInput.value == ''){
            searcherContainer.style.display = 'none'
            searcherContainerStatus = false;
        }
        else {
            searcherContainer.style.display = 'flex'
            searcherContainerStatus = true
        }
    })

    document.getElementById('userImageContainer').addEventListener('click', () => {
        window.location.href = '/profile';
    })

    document.addEventListener('click', (e) => {
        if(searcherContainerStatus) {
            if(!headerCenterContainer.contains(e.target) && !searcherContainer.contains(e.target)) searcherContainer.style.display = 'none';
        }
    })
})


const changeMainSection = (section, buttonId) => {
    document.getElementById(`mainNav${currentMainButton}Button`).classList.remove('main-nav-button-active');
    document.getElementById(`mainNav${buttonId}Button`).classList.add('main-nav-button-active');
    currentMainButton = buttonId
    document.querySelector(`.${currentMainSection}-section`).style.display = 'none';
    document.querySelector(`.${section}-section`).style.display = 'flex';
    currentMainSection = section;
}

window.changeMainSection = changeMainSection;