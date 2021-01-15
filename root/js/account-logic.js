// hamburger menu

var navbar = document.querySelector("nav")
var ham = document.querySelector(".hamburger")

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
  console.log("clicked")
}


//account expand logic - not DRY at all!
var info = document.querySelector(".basic-info");
var click = document.querySelector(".basic-info h3");
click.addEventListener("click", toggleExpand1)
function toggleExpand1(){
  info.classList.toggle("collapse")

}
var wish = document.querySelector(".wishlist");
var wishclick = document.querySelector(".wishlist h3");
wishclick.addEventListener("click", toggleExpand2)
function toggleExpand2(){
  wish.classList.toggle("collapse")

}