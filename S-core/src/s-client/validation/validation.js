import { emailValidationRequest } from "../general/api/auth.js";
const form = document.getElementById('form');
const code1 = document.getElementById('code1');
const code2 = document.getElementById('code2');
const code3 = document.getElementById('code3');
const code4 = document.getElementById('code4');
const code5 = document.getElementById('code5');
const code6 = document.getElementById('code6');
const codePattern = /^[0-9]{6}$/;
const userEmailText = document.getElementById('userEmailText');


document.addEventListener('DOMContentLoaded', () => {
    code1.focus();
    const userData = localStorage.getItem('user');
    const userDataObj = userData ? JSON.parse(userData) : {};

    userEmailText.textContent = `${userDataObj.email}`
    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        document.querySelectorAll('#codeForm input').forEach(input => {
            if(input.value == '') setWrongCodeStatus('There are missing numbers');
        });

        const code = `${code1.value}${code2.value}${code3.value}${code4.value}${code5.value}${code6.value}`;
        if(codePattern.test(code) == false) {
            setWrongCodeStatus('invalid, Not Supported Code!')
        }
        emailValidationRequest(code);
    })

    document.querySelectorAll('#codeForm input').forEach((input, index, inputs) => {
        input.addEventListener('input', function() {
            if (this.value.length > 1) {
                this.value = this.value.charAt(0);
            }

            if(this.value != ''){
                input.classList.remove('checked-input');
            }

            if(this.value != ''){
                setCheckedCode(this);
                input.classList.remove('issue-input');
            }
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });
})

const setWrongCodeStatus = (message) =>  {
    const allInputs = document.querySelectorAll('.form-input')
    allInputs.forEach(input => {
        if(input.classList.contains('checked-input')){
            input.classList.remove('checked-input');
            input.classList.add('issue-input');
        }
        input.value=''
    })
    const messageParagraph = document.getElementById('messageParagraph')
    messageParagraph.classList.add('issue-message');
    messageParagraph.textContent = `${message}`;
}

const setCheckedCode = (input) =>  {
    input.classList.add('checked-input');
}