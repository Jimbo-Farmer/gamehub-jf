// hamburger menu

const menu = document.querySelector(".navigation")
const ham = document.querySelector(".hamburger")
let menuClosed = true;

ham.addEventListener("click", toggleHamburger)
function toggleHamburger(){
  menu.classList.toggle("show-menu");
  if(menuClosed){
    ham.innerHTML= `<img src="icons and logo/close-menu.png" alt="close hamburger menu">`
    menuClosed = false;
  } else {
    ham.innerHTML = `<img src="icons and logo/hamburger-menu.png" alt="hamburger menu">`
    menuClosed = true;
  }
}

// update cart total

const basketQty = JSON.parse(localStorage.getItem("numberOfItems"));
const itemsCount = document.querySelector("#basket");
const miniCart = document.querySelector(".mobile-cart-container");
if((!isNaN(basketQty) && basketQty > 0)){
  itemsCount.innerHTML = `<span class="cart-quantity">${basketQty}</span>`;
  miniCart.innerHTML = `<a href="checkout.html" class="mobile-cart">Cart <span class="cart-quantity">${basketQty}</span></a>`;
};


// login info

window.loggedIn = false;
