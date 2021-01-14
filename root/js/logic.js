// hamburger menu

var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
  console.log("clicked")
}


// clickable store items

var items = document.querySelectorAll(".featured-item")
var itemImage = document.querySelector(".featured-item img")
var itemInfo = document.querySelector(".featured-item .item-information")


for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", toggleItemInfo)
  function toggleItemInfo(){
    this.classList.toggle("item-info-show")
    this.classList.toggle("image-blur")
  }
}



// add animate class to coin on posting of sale item

var coin = document.querySelector(".send")
var sound = document.querySelector(".sound")
var submitMessage = document.querySelector(".submit-message")

coin.addEventListener("click", toggleAnimate)
function toggleAnimate(){
  this.classList.toggle("animate")
  sound.classList.toggle("hidden")
  submitMessage.textContent = "Sent!";
}