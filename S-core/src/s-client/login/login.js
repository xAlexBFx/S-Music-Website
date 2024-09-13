import { loginReq } from "../general/api/auth.js";
const form = document.getElementById('form');
const identification = document.getElementById('identification');
const password = document.getElementById('password');
const InputFilter = /^[a-zA-Z0-9.,@()_-\s]*$/;

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        if(validateInput(identification, InputFilter, 6) == false) return setInputError(identification, 'Must have more than 6 characters, Not Special Characters Allowed');
        if(validateInput(password, InputFilter, 6) == false) return setInputError(password, 'Must have more than 6 characters, Not Special Characters Allowed');
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        const jsonString = JSON.stringify(formDataObject);

        loginReq(jsonString);

    })
    identification.addEventListener('input', () => {
        if(validateInput(identification, InputFilter, 6) == false) return setInputError(identification, 'Must have more than 6 characters, Not Special Characters Allowed');
        if (identification.classList.contains('issue-input')) identification.classList.remove('issue-input');
        if (!identification.classList.contains('checked-input')) identification.classList.add('checked-input');
        const inputParagraph = identification.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    password.addEventListener('input', () => {
        if(validateInput(password, InputFilter, 6) == false) return setInputError(password, 'Must have more than 6 characters, Not Special Characters Allowed');
        if (password.classList.contains('issue-input')) password.classList.remove('issue-input');
        if (!password.classList.contains('checked-input')) password.classList.add('checked-input');
        const inputParagraph = password.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })
})

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