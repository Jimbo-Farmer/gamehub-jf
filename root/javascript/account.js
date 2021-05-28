const accountHtml = document.querySelector(".account-container");

let logIn;
let signIn;

if(!loggedIn){
    accountHtml.innerHTML = `<form action="account.html" method="dialog">  
    <h3>Login below. <span id="signup-prompt" tabindex="0">New user?</span></h3>
    <fieldset id="user-details">
        <div class="username">
            <label for="username">Username</label>
            <input type="text" name="username" id="user" class="form-input">
        </div>
        <div class="password">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-input">
        </div>
        <div class="remember">
            <label for="remember">Remember me</label>
            <input type="checkbox" name="remember" id="remember" class="form-input">
        </div>
        <div>
            <input id="login-submit" type="submit" value="Login">
        </div>
    </fieldset>  
    </form>`
    logIn = document.querySelector("#login-submit");
    logIn.addEventListener("click", goToAccount);
}


const signup = document.querySelector("#signup-prompt");

signup.addEventListener("click", expand)
function expand(){
    accountHtml.innerHTML = `
    <fieldset id="signup-details">
                <legend>Create an account below</legend>
                <div class="user-create">
                    <label for="username">Create username</label>
                    <input type="text" name="user-create" id="user-create" class="form-input">
                </div>
                <div class="password-create">
                    <label for="password-create">Create password</label>
                    <input type="password" name="password-create" id="password-create" class="form-input">
                </div>
                <div class="password-confirm">
                    <label for="password-confirm">Confirm password</label>
                    <input type="password" name="password-confirm" id="password-confirm" class="form-input">
                </div>
                <div class="email">
                    <label for="email-new">Email address</label>
                    <input type="email" name="email-new" id="email-new" class="form-input">
                </div>
                <div class="remember">
                    <label for="remember">Remember me</label>
                    <input type="checkbox" name="remember" id="remember" class="form-input">
                </div>
                <div>
                    <input id="signup-submit" type="submit" value="Sign Up">
                </div>
            </fieldset>`
            signIn = document.querySelector("#signup-submit");
            signIn.addEventListener("click", goToAccount);
}


function goToAccount(){
    accountHtml.innerHTML =
    `<section id="all-details">
                <h3>Account</h3>
                <section class="basic-info">
                    <h4 id="click">Basic Info <span>(edit)</span></h4>
                    <table>
                        <tr>
                            <td>First name: </td>
                            <td>Super</td>
                        </tr>
                        <tr>
                            <td>Last name:</td>
                            <td>Mario</td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>Maribro</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>sm@ninten.do</td>
                        </tr>
                        <tr>
                            <td>DOB:</td>
                            <td>09.07.1981</td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>Japan</td>
                        </tr>
                        <tr>
                            <td class="pic">Profile pic:</td>
                            <td><img src="images/profile.jpg" alt="profile picture"></td>
                        </tr>
                    </table>
                      
                </section>
    
                <section class="wishlist collapse">
                    <h4>Wishlist</h4> 
                    <table>
                        <tr>
                            <td>Boxer </td>
                            <td class="add">Add to cart</td>
                            <td class="delete">x</td>
                        </tr>
                        <tr>
                            <td>Assassin</td>
                            <td class="add">Add to cart</td>
                            <td class="delete">x</td>
                        </tr>
                        <tr>
                            <td>Racing</td>
                            <td class="add">Add to cart</td>
                            <td class="delete">x</td>
                        </tr>
                    </table>          
                </section>
                <section class="delivery-details collapse">
                    <h4>Delivery details</h4>            
                </section>
                <section class="payment-details collapse">
                    <h4>Payment details</h4>            
                </section>
                <section class="security collapse">
                    <h4>Security</h4>            
                </section>
                <section class="preferences collapse">
                    <h4>Preferences</h4>            
                </section>
                <section class="delete collapse">
                    <h4 class="delete">Delete account</h4>            
                </section>
    
            </section>`
}