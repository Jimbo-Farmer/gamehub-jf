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



