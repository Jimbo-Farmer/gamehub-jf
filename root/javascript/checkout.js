const shoppingCart = JSON.parse(localStorage.getItem("cartList"));


const basketQty = JSON.parse(localStorage.getItem("numberOfItems"));
      if((!isNaN(basketQty) && basketQty > 0)){
        var cartQuantity = basketQty;
      } else cartQuantity = 0;

console.log(shoppingCart);

const summary = document.querySelector(".summary");
const totals = document.querySelectorAll(".item-total");
const paymentButton = document.querySelector("#checkout-submit");

function total(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += (array[i].prices.price)*(array[i].inBasket);  
    }
    return sum;
}

let shipping = 5;

if((!shoppingCart)||(shoppingCart.length === 0)){
    summary.innerHTML = `<tbody>Your Cart Is Empty :(</tbody>`
} else {
    drawSummary();  
}


function drawSummary(){
    summary.innerHTML = `
    <tbody>
        <tr class="column-headers">
            <td tabindex="0">Item</td>
            <td tabindex="0">Qty</td>
            <td></td>
            <td tabindex="0">Unit Price</td>
            <td tabindex="0">Price</td>   
        </tr>`; 
        
        for(let i = 0; i < shoppingCart.length; i++){
            summary.innerHTML += `<tr class="item-info">
            <td tabindex="0">${shoppingCart[i].name}</td>
            <td tabindex="0">${shoppingCart[i].inBasket}</td>
            <td class="remove">x</td>
            <td tabindex="0">$${shoppingCart[i].prices.price}</td>
            <td tabindex="0" class="item-total">$${parseInt(shoppingCart[i].prices.price) * parseInt(shoppingCart[i].inBasket)}</td>
            </tr>`
        }      
    summary.innerHTML +=`<tr>
            <td></td>
            <td></td>
            <td></td>
            <td tabindex="0" class="subtotal">Subtotal</td>
            <td tabindex="0" class="subtotal">$${total(shoppingCart)}</td>  
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td tabindex="0">Shipping</td>
            <td tabindex="0">$${shipping}</td>   
        </tr>
        <tr class="total">
            <td></td>
            <td></td>
            <td></td>
            <td tabindex="0" class="total">Total</td>
            <td tabindex="0" class="total">$${total(shoppingCart) + shipping}</td>
        </tr>
    </tbody>          
    `;
    const removeButtons = document.querySelectorAll(".remove");
    for(let i = 0; i < removeButtons.length; i++){
        removeButtons[i].addEventListener("click", function(){
            if(shoppingCart[i].inBasket > 0){
                shoppingCart[i].inBasket -=1;
                cartQuantity -= 1;
                if(shoppingCart[i].inBasket === 0){
                    shoppingCart.splice(i,1);
                }
                localStorage.setItem("numberOfItems", JSON.stringify(cartQuantity));
                localStorage.setItem("cartList", JSON.stringify(shoppingCart));
                if(shoppingCart.length === 0){
                    summary.innerHTML = `<tbody>Your Cart Is Empty :(</tbody>`
                } else {
                    drawSummary();  
                }
            }
        })
    }
}


paymentButton.addEventListener("click", clearCart);
function clearCart(){
    localStorage.removeItem("cartList");
    localStorage.removeItem("numberOfItems");
}
