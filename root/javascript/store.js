//Create game item html
const featured = document.querySelector(".featured");

import { gamesList } from "./resources/products.js";

function gameHtml(siteSection, i, className){
  siteSection.innerHTML += `<div class="${className}-item" tabindex="0">
  <img src="${gamesList[i].image}" alt="${gamesList[i].name}">
    <div class="item-information">
      <h4>${gamesList[i].name}</h4>
      <div class="extra-information">
        <p>${gamesList[i].description}</p>
        <p class="price"><b>$${gamesList[i].price}</b></p>
        <button class="add-to-cart" data-gameid=${gamesList[i].id}>Add to cart</button>
      </div>
    </div>
  </div>`
}

//Draw featured items on homepage

for(let i = 8; i>0 ; i--){
  gameHtml(featured, i, "featured");
}


// Add to cart
let cartQuantity = 0;
let cartItems = [];

function resetText(button){
  button.innerHTML =`add to cart`;
  button.classList.remove("confirmation");
}

const mobileCart = document.querySelector(".mobile-cart-container");
const navBasket = document.querySelector("#basket");
const addToCart = document.querySelectorAll(".add-to-cart");

addToCart.forEach(function(button){
  button.onmousedown = function(event){
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
  keypress.onkeyup = function(e){
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
let infoDisplay = false;

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", toggleItemInfo)
  function toggleItemInfo(){
    this.classList.toggle("extra-info-show");
    addToCart.innerHTML = `Add to cart`;
  }
}
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("keyup", function(e){
    if(e.keyCode === 13){
      items[i].classList.toggle("extra-info-show");
      addToCart.innerHTML = `Add to cart`;  
    }
  })
}
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("mouseover", toggleItemInfo)
  function toggleItemInfo(){
    this.classList.add("extra-info-show");
  }
}
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("mouseout", toggleItemInfo)
  function toggleItemInfo(){
    this.classList.remove("extra-info-show");
    addToCart.innerHTML = `Add to cart`;
  }
}

