'use strict'
const searcherBase = document.getElementById('searcherBase');
const searchBarInput = document.getElementById('searchBar');
const saveAlertModal = document.querySelector('.save-alert-modal');
const modalExitButton = document.getElementById('modalExitButton');
const backButton = document.getElementById('backButton');
const sidebarInSectionButtons = document.querySelectorAll('.sidebar-button-in-section');
let settingsChangedStatus = false;
let searcherBaseStatus = false;
let lastBarSectionSelected ;
let lastBarInSectionSelected ;

document.addEventListener('DOMContentLoaded', ()=> {

    const userData = localStorage.getItem('user');
    const userDataObj = userData ? JSON.parse(userData) : {};
    console.log(userDataObj.settings)

    backButton.addEventListener('click', () =>{
        if(settingsChangedStatus) {
            document.body.style.overflowY = 'hidden';
            saveAlertModal.style.cursor = 'auto';
            saveAlertModal.style.top = '0'

            return;
        }
        window.location.href = '/feed';
    })

    searchBarInput.addEventListener('input', () => {
        if(searchBarInput.value == ''){
            searcherContainer.style.display = 'none'
            searcherBaseStatus = false;
        }
        else {
            searcherContainer.style.display = 'flex'
            searcherBaseStatus = true
        }
    })

    document.addEventListener('click', (e) => {
        if(searcherBaseStatus) {
            if(!searcherBase.contains(e.target) && !searcherContainer.contains(e.target)) searcherContainer.style.display = 'none';
        }
    })
    
    sidebarInSectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(lastBarInSectionSelected) lastBarInSectionSelected.classList.remove('selected-in-section-button');

            button.classList.toggle('selected-in-section-button')
            if(lastBarInSectionSelected !== button) lastBarInSectionSelected = button;
        })
    })

    const toggleDropdown = (button) => {

        const section = button.parentElement;
        button.classList.toggle('active-link')
        section.classList.toggle('active');
        if(lastBarSectionSelected !== button) lastBarSectionSelected = button;
    }

    // const scrollToSection = (sectionName) => {
    //     const section = document.getElementById(`${sectionName}-setting-section`)
    //     section.scrollIntoView({ behavior: 'smooth' });
    // }

    const doNotSaveSettings = () => {
        window.location.href = '/feed';
    }

    const saveSettings = () => {
        //save Settings Logic
        window.location.href = '/feed';
    }

    modalExitButton.addEventListener('click', () => {
        saveAlertModal.style.cursor = 'not-allowed';
        saveAlertModal.style.top = '-100vh'
        document.body.style.overflowY = 'auto';
    })
    
    window.toggleDropdown = toggleDropdown;
    window.doNotSaveSettings = doNotSaveSettings;
    window.saveSettings = saveSettings;
    // window.scrollToSection = scrollToSection;
})

