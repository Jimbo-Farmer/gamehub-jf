var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
    navbar.classList.toggle("showNav")
    ham.classList.toggle("showClose")
    console.log("clicked")
  }