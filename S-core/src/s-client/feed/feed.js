'use strict'
const headerCenterContainer = document.getElementById('headerCenterContainer');
const searchBarInput = document.getElementById('searchBar');
const searcherContainer = document.getElementById('searcherContainer');

let searcherContainerStatus = false;
let currentMainSection = 'recommended';
let currentMainButton = 'Recommended';

document.addEventListener('DOMContentLoaded', () => {

    renderUserData()

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

const renderUserData = () => {
    const userData = localStorage.getItem('user');
    const userDataObj = userData ? JSON.parse(userData) : {}; 
    const profileImageElement = document.getElementById('profileImageElement')

    if(userDataObj.profileImage) profileImageElement.src = userDataObj.profileImage.imageUrl;
    if(!userDataObj.profileImage) profileImageElement.src = 'https://static.vecteezy.com/system/resources/previews/023/465/800/original/remove-contact-dark-mode-glyph-ui-icon-delete-unwanted-user-address-book-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg';
}

window.changeMainSection = changeMainSection;