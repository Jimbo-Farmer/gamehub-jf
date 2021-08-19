//Create game item html
const featured = document.querySelector(".featured");


// ****Old code**** (products listed in resources js file------------------------------------------------------------------)
// import { gamesList } from "./resources/products.js";

// function gameHtml(siteSection, i, className){
//   siteSection.innerHTML += `<div class="${className}-item">
//   <img src="${gamesList[i].images[0].src}" alt="${gamesList[i].name}">
//     <div class="item-information">
//       <h4 tabindex="0">${gamesList[i].name}</h4>
//       <div tabindex="0" class="extra-information" onclick="blur()">
//         <p>${gamesList[i].description}</p>
//         <p class="price"><b>$${gamesList[i].price}</b></p>
//         <button class="add-to-cart" onclick="blur()" data-gameid=${gamesList[i].id}>Add to cart</button>
//       </div>
//     </div>
//     <button class="hide-info" onclick="event.stopPropagation()"><img src="icons and logo/exit-button.png" alt="hide info"></img></button>
//   </div>
//   `
// }


// ****New code**** (products from headless cms------------------------------------------------------------------)

const url = "http://frontendfarmer.com/CMS%20Noroff/Headless%20CMS/index.php/wp-json/wc/store/products";
let urlExt = "?featured=true";


async function getProducts(){
  try{ 
      const response = await fetch(url+urlExt);
      const output = await response.json();
      
      //Draw featured items on homepage

      for(let i = 0; i < output.length ; i++){
        featured.innerHTML += `<div class="featured-item">
        <img src="${output[i].images[0].src}" alt="${output[i].name}">
          <div class="item-information">
            <h4 tabindex="0">${output[i].name}</h4>
            <div tabindex="0" class="extra-information" onclick="blur()">
              <p>${output[i].description}</p>
              <p class="price"><b>$${output[i].prices.price}</b></p>
              <button class="add-to-cart" onclick="blur()" data-gameid=${output[i].id}>Add to cart</button>
              <a href="details.html?id=${output[i].id}" class="more-info" onclick="blur()" data-gameid=${output[i].id}>More Info</a>
            </div>
          </div>
          <button class="hide-info" onclick="event.stopPropagation()"><img src="icons and logo/exit-button.png" alt="hide info"></img></button>
        </div>
        `
        if(!output[i].inBasket){
          output[i].inBasket = 0;
        }
        

      }
     
      // Add to cart
      const basketQty = JSON.parse(localStorage.getItem("numberOfItems"));
      if((!isNaN(basketQty) && basketQty > 0)){
        var cartQuantity = basketQty;
      } else cartQuantity = 0;

      if(JSON.parse(localStorage.getItem("cartList"))){
        var cartItems = JSON.parse(localStorage.getItem("cartList"));
      } else {
        cartItems = [];
      }
      
      let purchaseComplete = true;

      function resetText(button){
        purchaseComplete = true;
        button.innerHTML =`add to cart`;
        button.classList.remove("confirmation");
        // button.closest(".featured-item").classList.remove("extra-info-show");
      }

      const mobileCart = document.querySelector(".mobile-cart-container");
      const navBasket = document.querySelector("#basket");
      const addToCart = document.querySelectorAll(".add-to-cart");
      const moreInfo = document.querySelectorAll(".more-info")
      const hideInfo = document.querySelectorAll(".hide-info");

      for(let i = 0; i < addToCart.length; i++){
        moreInfo[i].disabled = true;
        addToCart[i].disabled = true;
        hideInfo[i].disabled = true;
        hideInfo[i].style.display = "none";
      }

      function findGame(id){
        for(let i = 0; i < output.length; i++){
          if(id == output[i].id){
            return output[i];
          }
        }
      }
      function checkCart(id){
        for(let i = 0; i < cartItems.length; i++){
          if(id == cartItems[i].id){
            return cartItems[i];
          }
        }
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
          console.log(event.target.dataset.gameid)
          const gameToAdd = findGame(event.target.dataset.gameid);
          const alreadyInCart = checkCart(event.target.dataset.gameid);
          if(alreadyInCart){
            alreadyInCart.inBasket += 1;
            const index = cartItems.indexOf(alreadyInCart);
            cartItems.splice(index, 1);
            cartItems.push(alreadyInCart);
          } else if((gameToAdd.inBasket > 0) && !alreadyInCart){
            gameToAdd.inBasket += 1;  
          } else {
            cartItems.push(gameToAdd);
            gameToAdd.inBasket += 1;
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
            const gameToAdd = findGame(event.target.dataset.gameid);
            const alreadyInCart = checkCart(event.target.dataset.gameid);
            if(alreadyInCart){
              alreadyInCart.inBasket += 1;
              const index = cartItems.indexOf(alreadyInCart);
              cartItems.splice(index, 1);
              cartItems.push(alreadyInCart);
            } else if((gameToAdd.inBasket > 0) && !alreadyInCart){
              gameToAdd.inBasket += 1;  
            } else {
              cartItems.push(gameToAdd);
              gameToAdd.inBasket += 1;
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
          moreInfo[i].disabled = false;
          // hideInfo[i].disabled = false;
          // hideInfo[i].style.display = "unset";
        }
      }

      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", toggleItemInfo)
        function toggleItemInfo(){
          items[i].classList.add("extra-info-show");
          addToCart[i].disabled = false;
          moreInfo[i].disabled = false;
          hideInfo[i].disabled = false;
          hideInfo[i].style.display = "unset";
        }
      }

      for (let i = 0; i < hideInfo.length; i++) {
        hideInfo[i].addEventListener("click", toggleItemInfo)
        function toggleItemInfo(){
          hideInfo[i].closest(".featured-item").classList.remove("extra-info-show");
          addToCart[i].disabled = true;
          // hideInfo[i].disabled = true;
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


      //Game Browse-------------

      const platformButton = document.querySelector("#platforms-button");
      const genreButton = document.querySelector("#genre-button");
      const platform = document.querySelector("#platform");
      const genre = document.querySelector("#genre");

      platformButton.addEventListener("click", showPlatforms);
      function showPlatforms(){
        if(genre.classList.length === 0){
          genre.classList.toggle("hidden");
        }
        platform.classList.toggle("hidden");
      }
      genreButton.addEventListener("click", showGenres);
      function showGenres(){
        if(platform.classList.length === 0){
          platform.classList.toggle("hidden");
        }
        genre.classList.toggle("hidden");
        console.log(genre.classList)
      }
      
  }
  catch(error){
      featured.innerHTML = "Apologies, an error has occurred.";
      console.log(error);
  }
}

getProducts();











