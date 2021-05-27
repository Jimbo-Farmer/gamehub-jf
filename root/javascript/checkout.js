const shoppingCart = JSON.parse(localStorage.getItem("cartList"));

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
            <td>Item</td>
            <td>Qty</td>
            <td>Unit Price</td>
            <td>Price</td>
        </tr>`; 
        
        for(let i = 0; i < shoppingCart.length; i++){
            summary.innerHTML += `<tr class="item-info">
            <td>${shoppingCart[i].name}</td>
            <td>${shoppingCart[i].qty}</td>
            <td>$${shoppingCart[i].price}</td>
            <td class="item-total">$${parseInt(shoppingCart[i].price) * shoppingCart[i].qty}</td>
            </tr>`
        }
      
summary.innerHTML +=`<tr>
            <td></td>
            <td></td>
            <td>Subtotal</td>
            <td>$${total(shoppingCart)}</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>Shipping</td>
            <td>$${shipping}</td>
        </tr>
        <tr class="total">
            <td></td>
            <td></td>
            <td>Total</td>
            <td>$${total(shoppingCart) + shipping}</td>
        </tr>
    </tbody>          
`;

