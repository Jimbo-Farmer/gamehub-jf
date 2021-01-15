// hamburger menu

var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
  console.log("clicked")
}


//account expand logic
var info = document.querySelector(".basic-info");
var click = document.querySelector("#click");
click.addEventListener("click", toggleExpand)
function toggleExpand(){
  info.classList.toggle("collapse")
  console.log("clicked")
}