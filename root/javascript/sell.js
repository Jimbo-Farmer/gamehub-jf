//coin animate on sale
const coin = document.querySelector(".send");
const submitMessage = document.querySelector(".submit-message");
const options = document.querySelector(".success");
const terms = document.querySelector("#terms");


coin.addEventListener("click", toggleAnimate)
function toggleAnimate(){
    if(terms.checked){
        this.classList.toggle("animate");
        options.classList.remove("hidden");
        submitMessage.textContent = "Sent!";
    }
}