const shoppingCart = JSON.parse(localStorage.getItem("cartList"));
console.log(shoppingCart);
const summary = document.querySelector(".summary");
const totals = document.querySelectorAll(".item-total");

function total(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += (array[i].price)*(array[i].qty);
        
    }
    return sum;
}

let shipping = 5;


summary.innerHTML = `
    <tbody>
        <tr class="column-headers">
            <td tabindex="0">Item</td>
            <td tabindex="0">Qty</td>
            <td tabindex="0">Unit Price</td>
            <td tabindex="0">Price</td>
        </tr>`; 
        
        for(let i = 0; i < shoppingCart.length; i++){
            summary.innerHTML += `<tr class="item-info">
            <td tabindex="0">${shoppingCart[i].name}</td>
            <td tabindex="0">${shoppingCart[i].qty}</td>
            <td tabindex="0">$${shoppingCart[i].price}</td>
            <td tabindex="0" class="item-total">$${parseInt(shoppingCart[i].price) * shoppingCart[i].qty}</td>
            </tr>`
        }
      
summary.innerHTML +=`<tr>
            <td></td>
            <td></td>
            <td tabindex="0" class="subtotal">Subtotal</td>
            <td tabindex="0" class="subtotal">$${total(shoppingCart)}</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td tabindex="0">Shipping</td>
            <td tabindex="0">$${shipping}</td>
        </tr>
        <tr class="total">
            <td></td>
            <td></td>
            <td tabindex="0" class="total">Total</td>
            <td tabindex="0" class="total">$${total(shoppingCart) + shipping}</td>
        </tr>
    </tbody>          
`;

