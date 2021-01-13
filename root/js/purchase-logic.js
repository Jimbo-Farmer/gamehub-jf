// Purchase process
var addToBasket = document.querySelector("#add");
var text = document.querySelector(".prompt");
var priceDisplay = document.querySelector(".price");
var proceed = document.querySelector(".proceed");
var basket = document.querySelector("#basket")


addToBasket.addEventListener("click", togglePrice)
function togglePrice(){
  text.textContent = "Added!";
  priceDisplay.id =("hide");
  addToBasket.src = ("icons and logos/add-to-cart-pressed.png");
  basket.src = ("icons and logos/full-basket.png");
  proceed.classList.toggle("show-proceed");
}


// hamburger menu

var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
  console.log("clicked")
}
