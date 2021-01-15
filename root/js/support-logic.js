// hamburger menu

var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
  console.log("clicked")
}

//contact form expand on support page
var contact = document.querySelector(".contact-form");
var contactClick = document.querySelector(".contact-form h4");
contactClick.addEventListener("click", toggleExpand3)
function toggleExpand3(){
  contact.classList.toggle("collapse")
}