'use strict'
import { logoutReq } from '../general/api/auth.js'

const userNameH1 = document.getElementById('userNameH1');
const usernameInput = document.getElementById('usernameInput');
const InputFilter = /^[a-zA-Z0-9.,@()_-\s]*$/;
const modal = document.querySelector('.modal-section');
let currentMainSection = 'recommended';
let currentMainButton = 'Recommended';
let loadingModal = false;

document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    const userDataObj = userData ? JSON.parse(userData) : {};

    userNameH1.textContent = `${userDataObj.username}`;
    usernameInput.value = `${userDataObj.username}`;

    usernameInput.addEventListener('input', () => {
        if(validateInput(usernameInput, InputFilter, 6, 20) == false) return setInputError(usernameInput, 'Must have more than 6 and less than 20 characters , No Special Characters Allowed');
        if (usernameInput.classList.contains('issue-input')) usernameInput.classList.remove('issue-input');
        if (!usernameInput.classList.contains('checked-input')) usernameInput.classList.add('checked-input');
        const inputParagraph = usernameInput.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })
})

const dropModal = (action) => {
    if(loadingModal) return;
    if (action === 'edit') {
        document.querySelector('.edit-section').style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        modal.style.cursor = 'auto';
        modal.style.top = '0';
    }

    if(action === 'logout') {
        document.querySelector('.logout-alert').style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        modal.style.cursor = 'auto';
        modal.style.top = '0';
    }
}

const closeModal = (action) => {
    if(loadingModal) return;
    if (action === 'edit') {
        document.body.style.overflowY = 'auto';
        modal.style.cursor = 'not-allowed';
        modal.style.top = '-100vh';
        loadingModal = true
        setTimeout(()=> {
            document.querySelector('.edit-section').style.display = 'none';
            loadingModal = false
        }, 600)
    }

    if(action === 'logout') {
        
        document.body.style.overflowY = 'auto';
        modal.style.cursor = 'not-allowed';
        modal.style.top = '-100vh';
        loadingModal = true
        setTimeout(()=> {
            document.querySelector('.logout-alert').style.display = 'none';
            loadingModal = false
        }, 600)
    }
}

const logout = () => logoutReq();

const changeMainSection = (section, buttonId) => {
    document.getElementById(`mainNav${currentMainButton}Button`).classList.remove('main-nav-button-active');
    document.getElementById(`mainNav${buttonId}Button`).classList.add('main-nav-button-active');
    currentMainButton = buttonId
    document.querySelector(`.${currentMainSection}-section`).style.display = 'none';
    document.querySelector(`.${section}-section`).style.display = 'flex';
    currentMainSection = section;
}

const validateInput = (input, filter, minLength, maxLength) => {
    if(filter.test(input.value) == false) return false;
    if(minLength) if(input.value.length < minLength) return false;
    if(maxLength) if(input.value.length > maxLength) return false;
    return true;
}

const setInputError = (input, message) =>  {
    input.classList.remove('checked-input');
    input.classList.add('issue-input');

    const inputParagraph = input.nextElementSibling
    inputParagraph.classList.add('issue-message');
    inputParagraph.textContent = `${message}`;
}

window.changeMainSection = changeMainSection;
window.dropModal = dropModal;
window.logout = logout;
window.closeModal = closeModal;