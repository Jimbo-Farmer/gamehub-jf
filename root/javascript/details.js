const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://frontendfarmer.com/CMS%20Noroff/Headless%20CMS/index.php/wp-json/wc/store/products/";
const container = document.querySelector(".container");

let reviewsHTML;
async function getReviews(){
    const response = await fetch("https://frontendfarmer.com/CMS%20Noroff/Headless%20CMS/index.php/wp-json/wp/v2/comments?post="+id);
    const results = await response.json();
        reviewsHTML = `<div class="reviews"><h3>Customer Reviews</h3>`;
        if(results.length === 0){
            reviewsHTML += `<p>No reviews yet</p></div>`
        }
        else {
            for(let i=0; i< results.length; i++){
                reviewsHTML += `<b>${i+1} Review by: ${results[i].author_name}</b> ${results[i].content.rendered}`;   
                }
                reviewsHTML +=`</div>`
        }       
}

getReviews();

async function getProduct(){
    try{
        await getReviews(); 
        const response = await fetch(url+id);
        const output = await response.json();
        //Draw item on homepage        
        container.innerHTML += `<div class="item-details">
        <img src="${output.images[0].src}" alt="${output.name}">
        <div class="item-information extra-info-show">
            <h4 tabindex="0">${output.name}</h4>
            <div tabindex="0" class="extra-information" onclick="blur()">
            <p>${output.description}</p>
            ${reviewsHTML}
            <p class="price"><b>$${output.prices.price}</b></p>
            <button class="add-to-cart" onclick="blur()" data-gameid=${output.id}>Add to cart</button>
            </div>
        </div>     
        </div>
        `
        
        if(!output.inBasket){
        output.inBasket = 0;
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
            const gameToAdd = output;
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
  
        let items = document.querySelectorAll(".container-item")
  
        
    }
    catch(error){
        container.innerHTML = "Apologies, an error has occurred.";
        console.log(error);
    }
  }
  
  getProduct();



