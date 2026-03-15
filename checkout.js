let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelector('#checkout').addEventListener('click', async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    try {
        const response = await fetch('https://your-railway-url.railway.app/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: cart })
        });

        console.log('status:', response.status);
        const data = await response.json();
        console.log('data:', data);
        console.log("hello");
        window.location.href = data.url; 
    } catch (error) {
        console.error('Error:', error);
    }
});


function displayProducts(cart) {
    const productSection = document.querySelector('.product-section');
    const cartInfo = document.querySelector('.cart-info');
    const leftSection = document.querySelector('.left-section');
    if (cart.length === 0) {
        cartInfo.innerHTML = ``;
        leftSection.innerHTML =`<div class ="empty-cart-width"><h1 class ="empty-cart"> Your cart is empty.</h1><a class = "continue-shopping-link" href="index.html" id = "back-arrow"> &larr; Continue Shopping</a></div>`;
    } else {
        cartInfo.innerHTML = `<h1> Shopping Cart </h1> <h1> ${cart.length} Items </h1>`;
        productSection.innerHTML = cart.map(product =>
            `<div class ="product-card">
            <div class = "product-image-container">
                <img src="assets/product-images/product${product.productId}.png" alt="${product.productTitle}"/>
            </div>
            <div class="product-info"> 
                <h3 style ="font-size:13px">${product.productTitle}</h3>
                <p style ="font-size:11px">$${parseFloat(product.productPrice).toFixed(2)}</p>
            </div>
            <div class="quantity-control">
                <button id="minus" data-product-id = "${product.productId}" onclick= "quantityButton(this)">-</button>
                <span id="quantity-display">${product.quantity}</span>
                <button id="plus" data-product-id = "${product.productId}" onclick ="quantityButton(this)">+</button>
            </div>
            <div class = "delete-from-cart-btn">
                <button onclick = "deleteItem(this)" data-product-id = "${product.productId}"> <img src = "assets/delete-from-cart-btn.png"> </button>
            </div>
        </div>
    `).join('');
    }
}

displayProducts(cart);


let promoCode = false;

totalCostElement = document.querySelector('.total-cost');

let shippingPrice = 5;
const selectShipping = document.querySelector('#shipping-options');
    selectShipping.addEventListener('change', () => {
    if (selectShipping.value === 'standard') {
        shippingPrice = 5; 
    } else {
        shippingPrice = 10;
    }
    totalCost();
});



const addToCartBubble = document.querySelector('.cart-icon-bubble');

function addToCartB(cart) {
    if (cart.length) {
        addToCartBubble.innerHTML = cart.length;
    } else {
        addToCartBubble.innerHTML = '0';
    }
}

function quantityButton(button) {
    const quantityDisplay = button.closest('.product-card').querySelector('#quantity-display');
    const productQuantity = parseInt(quantityDisplay.innerHTML);
    
    if (button.id === 'plus') {
        quantityDisplay.innerHTML = productQuantity + 1;
        const product = cart.find(item => item.productId === button.dataset.productId);
        if (product) product.quantity = productQuantity + 1;
    } else {
        if (productQuantity > 1) {
            quantityDisplay.innerHTML = productQuantity - 1;
            const product = cart.find(item => item.productId === button.dataset.productId);
            if (product) product.quantity = productQuantity - 1;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    totalCost();
}

function totalCost() {
    const cart2 = JSON.parse(localStorage.getItem('cart')) || [];

    let totalCost = 0;
    totalCost += cart2.map(product => product.quantity * parseFloat(product.productPrice)).reduce((sum,price) => sum + price,0);
    
    if (cart2.length && promoCode) {
        console.log(totalCost);
        totalCostElement.innerHTML = `<p> Total Cost</p> <p>$${((totalCost+shippingPrice)/2).toFixed(2)}</p>`;
    } else if (cart2.length) {
        totalCostElement.innerHTML = `<p> Total Cost</p> <p>$${(totalCost + shippingPrice).toFixed(2)}</p>`;
    } else {
        totalCostElement.innerHTML = `<p> Total Cost</p> <p>$${(totalCost + shippingPrice).toFixed(2)}</p>`;
    }

    addToCartB(cart);
}



function deleteItem(button) {
    const targetID = button.dataset.productId;

    const index = cart.findIndex(cart => cart.productId === targetID);

    cart.splice(index,1);

    localStorage.setItem('cart', JSON.stringify(cart));

    totalCost();

    displayProducts(cart);


}

let inputElement = document.getElementById("input");
const checkMark = document.querySelector('.check-mark');
const promoCodeInfo = document.querySelector('.promo-code-info');
promoCodeInfo.style.display = 'none';

function promoCodeApplied() {
    if (!(inputElement.value === "")) {
        let totalCost = 0;
        totalCost += cart.map(product => product.quantity * parseFloat(product.productPrice)).reduce((sum,price) => sum + price,0);
        checkMark.innerHTML = `<img src="assets/check-mark.png" width="15" height="15"> <p class ="heyo">Promo Code Applied </p> <button onclick = "removePC()"> Remove</button>`;
        promoCodeInfo.style.display = 'block';
        promoCodeInfo.innerHTML = `<p>-$${((totalCost)*0.5).toFixed(2)} (50% off)</p>`;
        promoCode = true;
        inputElement.style.border = 'none';
        checkMark.style.color = 'black';
        inputElement.value = "";
    } else {
        checkMark.style.color = 'red';
        checkMark.innerHTML = `<p class="heyo"> Please enter a code </p>`;
        inputElement.style.border = '1px solid red';
    }

    totalCost();
}

totalCost();

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        promoCodeApplied();
    }
})


function removePC() {
    checkMark.innerHTML = "";
    inputElement.value = "";
    promoCodeInfo.style.display = 'none';
    promoCode = false;

    totalCost();
}
