'use strict'
import { logoutReq } from '../general/api/auth.js'
import { updateProfile } from '../general/api/user.js'

const editProfileForm = document.getElementById('editProfileForm');
const userNameH1 = document.getElementById('userNameH1');
const descriptionParagraph = document.getElementById('descriptionParagraph')
const roleParagraph = document.getElementById('roleParagraph')
const usernameInput = document.getElementById('usernameInput');
const roleInput = document.getElementById('roleInput');
const presentationImageInput = document.getElementById('presentationImageInput');
const presentationInputLabel = document.getElementById('presentationInputLabel')
const descriptionInput = document.getElementById('descriptionInput');
const profileImageInput = document.getElementById('profileImageInput');
const profileImagePreview = document.getElementById('profileImagePreview');
const profileImagePreviewContainer = document.getElementById('profileImagePreviewContainer');
const profileImageInputParagraph = document.getElementById('profileInputErrorParagraph');
const InputFilter = /^[a-zA-Z0-9.,@()_-\s]*$/;
const descriptionFilter =/^[a-zA-Z0-9.,@():_-\s]*$/;
const modal = document.querySelector('.modal-section');
const submitProfileButton = document.getElementById('submitProfileButton')
let currentMainSection = 'recommended';
let currentMainButton = 'Recommended';
let loadingModal = false;

document.addEventListener('DOMContentLoaded', () => {
    editProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let presentationImageStatus;
        let profileImageStatus;

        if(validateInput(usernameInput, InputFilter,6, 20) == false) return setInputError(usernameInput, 'More than 6 and less than 20 characters, Not Special Characters Allowed');
        if(validateInput(roleInput, InputFilter,0, 20) == false) return setInputError(roleInput, 'less than 20 characters, No Special Characters Allowed');
        if(validateInput(descriptionInput, descriptionFilter, 0, 60) == false) return setInputError(descriptionInput, 'Max of 60 characters, Not Special Characters Allowed');
        if(presentationImageInput.files[presentationImageInput.files.length - 1]) {
            if(verifyFileType(presentationImageInput.files[presentationImageInput.files.length - 1]) == false) return setInputError(presentationInputLabel, 'You must select a valid image file type ');
            presentationImageStatus = true
        }
        if(profileImageInput.files[profileImageInput.files.length - 1]) {
            if(verifyFileType(profileImageInput.files[profileImageInput.files.length - 1]) == false) {
                profileImageInputParagraph.textContent = 'You must select a valid image type file';
                profileImageInputParagraph.classList.add('issue-message');
                profileImagePreviewContainer.style.borderColor = 'var(--negative-color)'
                return;
            }
            profileImageStatus = true
        }
        const formProcessedData = new FormData(this)
        const userData = localStorage.getItem('user');
        const userDataObj = userData ? JSON.parse(userData) : {};

        if(!presentationImageStatus) formProcessedData.delete('presentationImage');
        if(!profileImageStatus) formProcessedData.delete('profileImage');
        if(userDataObj.username === formProcessedData.get('username')) formProcessedData.delete('username');
        if(userDataObj.role === formProcessedData.get('role')) formProcessedData.delete('role');
        if(userDataObj.description === formProcessedData.get('description')) formProcessedData.delete('description');
        const formDataObject = Object.fromEntries(formProcessedData.entries());
        if(Object.keys(formDataObject).length === 0) return;

        updateProfile(formProcessedData)
    })

    submitProfileButton.addEventListener('click', ()=> {
        editProfileForm.dispatchEvent(new Event('submit'));
    });

    renderUserData()

    usernameInput.addEventListener('input', () => {
        if(validateInput(usernameInput, InputFilter, 6, 20) == false) return setInputError(usernameInput, 'Must have more than 6 and less than 20 characters , No Special Characters Allowed');
        if (usernameInput.classList.contains('issue-input')) usernameInput.classList.remove('issue-input');
        if (!usernameInput.classList.contains('checked-input')) usernameInput.classList.add('checked-input');
        const inputParagraph = usernameInput.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    roleInput.addEventListener('input', () => {
        if(validateInput(roleInput, InputFilter, 0, 20) == false) return setInputError(roleInput, 'less than 20 characters, No Special Characters Allowed');
        if (roleInput.classList.contains('issue-input')) roleInput.classList.remove('issue-input');
        if (!roleInput.classList.contains('checked-input')) roleInput.classList.add('checked-input');
        const inputParagraph = roleInput.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    presentationImageInput.addEventListener('change', event => {
        const selectedFile = event.target.files[event.target.files.length - 1];
        const inputParagraph = presentationImageInput.nextElementSibling
        if (selectedFile && verifyFileType(selectedFile)) {
                if (presentationInputLabel.classList.contains('issue-input')) presentationInputLabel.classList.remove('issue-input');
                if (!presentationInputLabel.classList.contains('checked-input')) presentationInputLabel.classList.add('checked-input');
                if(inputParagraph.classList.contains('issue-message')) inputParagraph.classList.remove('issue-message');
                inputParagraph.classList.add('checked-message');
                inputParagraph.textContent = 'Image selected successfully!';
                
        } else {
            if(presentationInputLabel.classList.contains('checked-input')) presentationInputLabel.classList.remove('checked-input');
            presentationInputLabel.classList.add('issue-input')
            setInputError(presentationInputLabel, 'You must select a valid image type file');
        }
    })

    descriptionInput.addEventListener('input', () => {
        if(validateInput(descriptionInput, descriptionFilter, 0, 60) == false) return setInputError(descriptionInput, 'Max of 60 characters, No Special Characters Allowed');
        if (descriptionInput.classList.contains('issue-input')) descriptionInput.classList.remove('issue-input');
        if (!descriptionInput.classList.contains('checked-input')) descriptionInput.classList.add('checked-input');
        const inputParagraph = descriptionInput.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    profileImageInput.addEventListener('change', event => {
        const selectedFile = event.target.files[event.target.files.length - 1];

        if (selectedFile && verifyFileType(selectedFile)) {
                showSelectedImage(selectedFile)
                profileImagePreviewContainer.style.borderColor = 'var(--positive-color)'

                if(profileImageInputParagraph.classList.contains('issue-message')) {
                    profileImageInputParagraph.classList.remove('issue-message')
                }
        } else {
            profileImageInputParagraph.textContent = 'You must select a valid image type file';
            profileImageInputParagraph.classList.add('issue-message');
            profileImagePreviewContainer.style.borderColor = 'var(--negative-color)'
        }
    });
})

const renderUserData = ()=> {
    const userData = localStorage.getItem('user');
    const userDataObj = userData ? JSON.parse(userData) : {};
    const userProfileImage = document.getElementById('userProfileImage');
    const userPresentationImage = document.getElementById('userPresentationImage');
    if(!userDataObj.role) userDataObj.role= 'User'
    if(!userDataObj.description) userDataObj.description = 'No description...'

    if(!userDataObj.profileImage) {
        userProfileImage.src = 'https://static.vecteezy.com/system/resources/previews/023/465/800/original/remove-contact-dark-mode-glyph-ui-icon-delete-unwanted-user-address-book-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg';
        profileImagePreview.src = 'https://static.vecteezy.com/system/resources/previews/023/465/800/original/remove-contact-dark-mode-glyph-ui-icon-delete-unwanted-user-address-book-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg';
    }
    else {
        userProfileImage.src = userDataObj.profileImage.imageUrl; 
        profileImagePreview.src = userDataObj.profileImage.imageUrl
    }

    if(!userDataObj.presentationImage) {
        document.querySelector('.presentation').style.backgroundColor= 'var(--sections-background-color)';
        userPresentationImage.style.display = 'none';
    } else userPresentationImage.src = userDataObj.presentationImage.imageUrl;

    userNameH1.textContent = `${userDataObj.username}`;
    usernameInput.value = `${userDataObj.username}`;
    roleParagraph.textContent = `${userDataObj.role}`
    roleInput.value = `${userDataObj.role}`;
    descriptionInput.value = `${userDataObj.description}`
    descriptionParagraph.textContent = `${userDataObj.description}`
}

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

const verifyFileType = file => {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    return allowedFileTypes.includes(file.type);
}

const showSelectedImage = image => {
    if (image) {
        const lector = new FileReader();
        lector.onload = e => {
            profileImagePreview.src =`${e.target.result}`;
        };
        lector.readAsDataURL(image);
    }
}

window.changeMainSection = changeMainSection;
window.dropModal = dropModal;
window.logout = logout;
window.closeModal = closeModal;
