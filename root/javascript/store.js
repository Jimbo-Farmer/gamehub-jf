//Create game item html
const featured = document.querySelector(".featured");

import { gamesList } from "./resources/products.js";

function gameHtml(siteSection, i, className){
  siteSection.innerHTML += `<div class="${className}-item">
  <img src="${gamesList[i].image}" alt="${gamesList[i].name}">
    <div class="item-information">
      <h4 tabindex="0">${gamesList[i].name}</h4>
      <div class="extra-information">
        <p>${gamesList[i].description}</p>
        <p class="price"><b>$${gamesList[i].price}</b></p>
        <button class="add-to-cart" data-gameid=${gamesList[i].id}>Add to cart</button>
      </div>
    </div>
    <button class="hide-info"><img src="icons and logo/dropdown.png" alt="show more info"></img></button>
  </div>
  `
}

//Draw featured items on homepage

for(let i = 8; i>0 ; i--){
  gameHtml(featured, i, "featured");
}


// Add to cart
let cartQuantity = 0;
let cartItems = [];
let purchaseComplete = true;

function resetText(button){
  purchaseComplete = true;
  button.innerHTML =`add to cart`;
  button.classList.remove("confirmation");
  button.closest(".featured-item").classList.remove("extra-info-show");
  console.log(button.closest(".featured-item"));
}

const mobileCart = document.querySelector(".mobile-cart-container");
const navBasket = document.querySelector("#basket");
const addToCart = document.querySelectorAll(".add-to-cart");
const hideInfo = document.querySelectorAll(".hide-info");

for(let i = 0; i < addToCart.length; i++){
  addToCart[i].disabled = true;
  hideInfo[i].disabled = true;
  hideInfo[i].style.display = "none";
}



addToCart.forEach(function(button){
  button.onmousedown = function(event){
    purchaseComplete = false;
    cartQuantity += 1;
    this.innerHTML = `Added to cart!`;
    this.classList.add("confirmation");
    mobileCart.innerHTML = `<a href="checkout.html" class="mobile-cart">Cart <span class="cart-quantity">${cartQuantity}</span></a>`;
    navBasket.innerHTML = `<span class="cart-quantity">${cartQuantity}</span>`;
    setTimeout(resetText, 2000, this);
    const gameToAdd = gamesList.find(game => game.id === event.target.dataset.gameid);
    if(gameToAdd.qty > 0){
      gameToAdd.qty += 1;  
    } else {
      cartItems.push(gameToAdd);
      gameToAdd.qty += 1;
    }
    localStorage.setItem("cartList", JSON.stringify(cartItems));
    localStorage.setItem("numberOfItems", JSON.stringify(cartQuantity));
  }
})

addToCart.forEach(function(keypress){
  keypress.onkeypress = function(e){
    purchaseComplete = false;
    if(e.keyCode ===13){
      cartQuantity += 1;
      this.innerHTML = `Added to cart!`;
      this.classList.add("confirmation");
      mobileCart.innerHTML = `<a href="checkout.html" class="mobile-cart">Cart <span class="cart-quantity">${cartQuantity}</span></a>`;
      navBasket.innerHTML = `<span class="cart-quantity">${cartQuantity}</span>`;
      setTimeout(resetText, 2000, this);
      const gameToAdd = gamesList.find(game => game.id === event.target.dataset.gameid);
    if(gameToAdd.qty > 0){
      gameToAdd.qty += 1;  
    } else {
      cartItems.push(gameToAdd);
      gameToAdd.qty += 1;
    }
    localStorage.setItem("cartList", JSON.stringify(cartItems));
    localStorage.setItem("numberOfItems", JSON.stringify(cartQuantity));
    }
    
  }
})

//Game information display

let items = document.querySelectorAll(".featured-item")


for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("mouseenter", toggleItemInfo)
  function toggleItemInfo(){
    items[i].classList.add("extra-info-show");
    addToCart[i].disabled = false;
    hideInfo[i].disabled = false;
    hideInfo[i].style.display = "unset";
  }
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", toggleItemInfo)
  function toggleItemInfo(){
    items[i].classList.add("extra-info-show");
    addToCart[i].disabled = false;
    hideInfo[i].disabled = false;
    hideInfo[i].style.display = "unset";
  }
}

for (let i = 0; i < hideInfo.length; i++) {
  hideInfo[i].addEventListener("click", toggleItemInfo)
  function toggleItemInfo(){
    items[i].classList.remove("extra-info-show");
    addToCart[i].disabled = true;
    hideInfo[i].disabled = true;
    hideInfo[i].style.display = "none";
  }
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("mouseleave", toggleItemInfo)
  function toggleItemInfo(){
    if(purchaseComplete){
      items[i].classList.remove("extra-info-show");
      addToCart[i].disabled = true;
      hideInfo[i].disabled = true;
      hideInfo[i].style.display = "none";
    } 
  }
}
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("keyup", function(e){
    if(e.keyCode === 13){
      if(purchaseComplete){
        items[i].classList.toggle("extra-info-show");
        if(addToCart[i].disabled){
          addToCart[i].disabled = false;
          hideInfo[i].disabled = false;
          hideInfo[i].style.display = "unset";
        } else {
          addToCart[i].disabled = true;
          hideInfo[i].disabled = true;
          hideInfo[i].style.display = "none";
        }
      } 
    }   
  })
}





