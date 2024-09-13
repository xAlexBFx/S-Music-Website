import { registerReq } from "../general/api/auth.js";
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const InputFilter = /^[a-zA-Z0-9.,;:!?()'"¡¿_\-\s]*$/;
const emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        if(validateInput(username, InputFilter,6, 20) == false) return setInputError(username, 'More than 6 and less than 20 characters, Not Special Characters Allowed');
        if(validateInput(email, emailFilter) == false) return setInputError(email, 'Invalid Email');
        if(validateInput(password, InputFilter) == false) return setInputError(password, 'More than 6 characters, Not Special Characters Allowed');
        if(rePassword.value !== password.value) return setInputError(rePassword, 'Two Different Password Given');

        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        const jsonString = JSON.stringify(formDataObject);

        registerReq(jsonString);

    })
    username.addEventListener('input', () => {
        if(validateInput(username, InputFilter,6, 20) == false) return setInputError(username, 'More than 6 and less than 20 characters, Not Special Characters Allowed');
        if (username.classList.contains('issue-input')) username.classList.remove('issue-input');
        if (!username.classList.contains('checked-input')) username.classList.add('checked-input');
        const inputParagraph = username.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    email.addEventListener('input', () => {
        if(validateInput(email, emailFilter) == false) return setInputError(email, 'Invalid Email');
        if (email.classList.contains('issue-input')) email.classList.remove('issue-input');
        if (!email.classList.contains('checked-input')) email.classList.add('checked-input');
        const inputParagraph = email.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';
    })

    password.addEventListener('input', () => {
        if(validateInput(password, InputFilter, 6) == false) return setInputError(password, 'More than 6 characters, Not Special Characters Allowed');
        if (password.classList.contains('issue-input')) password.classList.remove('issue-input');
        if (!password.classList.contains('checked-input')) password.classList.add('checked-input');
        const inputParagraph = password.nextElementSibling
        inputParagraph.classList.remove('issue-message');
        inputParagraph.textContent = '';

        if(rePassword.value !== password.value) return setInputError(rePassword, 'Two Different Password Given');
        if (rePassword.classList.contains('issue-input')) rePassword.classList.remove('issue-input');
        if (!rePassword.classList.contains('checked-input')) rePassword.classList.add('checked-input');
        const reInputParagraph = rePassword.nextElementSibling
        reInputParagraph.classList.remove('issue-message');
        reInputParagraph.textContent = '';
    })

    rePassword.addEventListener('input', () => {
        if(rePassword.value !== password.value) return setInputError(rePassword, 'Two Different Password Given');
        if (rePassword.classList.contains('issue-input')) rePassword.classList.remove('issue-input');
        if (!rePassword.classList.contains('checked-input')) rePassword.classList.add('checked-input');
        const inputParagraph = rePassword.nextElementSibling
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