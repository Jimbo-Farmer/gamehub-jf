let alreadyLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

const page = document.querySelector(".page");

if(!alreadyLoggedIn){
    page.innerHTML = `
    <div class="page-title">
        <h1>Sell your used games</h1>
    </div>
    <div class="sell-info">You must be logged in to post a game for sale
    <a class="link-to-login" href="account.html">Go to Login</a>
    </div>`
}

const coin = document.querySelector("#send");
const submitMessage = document.querySelector(".submit-message");
const options = document.querySelector(".success");
const terms = document.querySelector("#terms");

const gameDetails = document.querySelector("#game-details");
const unopened = document.querySelector("#unopened");
const good = document.querySelector("#good");
const fair = document.querySelector("#fair");
const poor = document.querySelector("#poor");
const sellingPrice = document.querySelector("#selling-price");

const gameTitleError = document.querySelector("#game-title-error");
const gameConditionError = document.querySelector("#game-condition-error");
const sellingPriceError = document.querySelector("#selling-price-error");
const termsError = document.querySelector("#terms-error");

let sent = false;

coin.addEventListener("click", function(){
    flagErrors();
    console.log(validate());
    if(validate()){
        toggleAnimate();
    }
})


function toggleAnimate(){
    if(!sent){
        coin.classList.toggle("animate");
        options.classList.remove("hidden");
        submitMessage.textContent = "Sent!";
        sent= true;
        
    }
}

function flagErrors(){
    event.preventDefault();
    if(lengthCheck(gameDetails.value.trim().length, 1)){
        gameTitleError.style.visibility = "hidden";
    } else {
        gameTitleError.style.visibility = "unset";
    }
    if(unopened.checked || good.checked || fair.checked || poor.checked){
        gameConditionError.style.visibility = "hidden";
    } else {
        gameConditionError.style.visibility = "unset";
    }
    if(!isNaN(parseInt(sellingPrice.value))){
        sellingPriceError.style.visibility = "hidden";
    } else {
        sellingPriceError.style.visibility = "unset";
    }
    if(terms.checked){
        termsError.style.visibility = "hidden";
    } else {
        termsError.style.visibility = "unset";
    }
}


function validate(){
    if((lengthCheck(gameDetails.value.trim().length, 1)) && (unopened.checked || good.checked || fair.checked || poor.checked) && (!isNaN(parseInt(sellingPrice.value))) && terms.checked){
        return true;
    } else {
        return false;
    }
}

function lengthCheck(input, desiredLength){
    if(input >= desiredLength){
        return true;
    } else {
        return false;
    }
}


