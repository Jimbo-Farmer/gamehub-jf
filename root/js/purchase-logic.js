// Purchase process
var add = document.querySelector("#add");
var text = document.querySelector(".prompt");
var priceDisplay = document.querySelector(".price");
var proceed = document.querySelector(".proceed");
var basket = document.querySelector("#basket")


add.addEventListener("click", togglePrice)
function togglePrice(){
  text.textContent = "Added!";
  priceDisplay.id =("hide");
  add.src = ("icons and logos/add-to-cart-pressed.png");
  basket.src = ("icons and logos/full-basket.png");
  proceed.classList.toggle("show-proceed");
}


