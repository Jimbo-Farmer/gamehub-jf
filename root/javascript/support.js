const button = document.querySelector("#contact-submit");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
form.reset();

function validate(){
    let i = 0;
    event.preventDefault();
    if(lengthCheck(nameInput.value.trim().length, 1)){
        nameError.style.visibility = "hidden";
        i += 1;
    } else {
        nameError.style.visibility = "unset";
    }
    if(lengthCheck(subject.value.trim().length, 4)){
        subjectError.style.visibility = "hidden";
        i += 1;
    } else {
        subjectError.style.visibility = "unset";
    }
    if(emailCheck(email.value)){
        emailError.style.visibility = "hidden";
        i += 1;
    } else {
        emailError.style.visibility = "unset";
    }
    if(lengthCheck(message.value.trim().length, 25)){
        messageError.style.visibility = "hidden";
        i += 1;
    } else {
        messageError.style.visibility = "unset";
    }
    if(i === inputs.length){
        form.submit();
    }
}

button.addEventListener("click", validate);

function lengthCheck(input, desiredLength){
    if(input >= desiredLength){
        return true;
    } else {
        return false;
    }
}

function emailCheck(emailInput){
    const regEx = /\S+@+\S+\.\S+/;
    const isValid = regEx.test(emailInput);
    return isValid;
}