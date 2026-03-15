let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const addToCartBubble = document.querySelector('.cart-icon-bubble');



function displayProducts(favorites) {
    const noFavsContainer = document.querySelector('.no-favorites-container');
    const productgrid = document.querySelector('.product-grid');
    if (favorites.length === 0) {
        productgrid.innerHTML = "";
        productgrid.style.padding = '0';
        noFavsContainer.style.display= 'block';
        noFavsContainer.innerHTML =`<div class ="no-favorites"><h1 class ="empty-cart"> Your wishlist is empty.</h1><a href="index.html" id = "back-arrow"> &larr; Continue Shopping</a></div>`;
    } else {
        noFavsContainer.style.display= 'none';
        productgrid.innerHTML = favorites.map(product => `
        <div class ="product-card">
            <div class = "product-image-container">
                <img src="assets/product-images/product${product.productId}.png" alt="${product.productTitle}"/>
            </div>
            <button class="wishlist-button-small" onclick ="deleteFavItem(this)" data-product-price = "${product.productPrice}" data-product-id = "${product.productId}" data-product-title = "${product.productTitle}" data-product-image = "${product.productImage}">
                <img width="24" height="24" src="https://img.icons8.com/material/24/EFA8A6/like--v1.png" alt="like"/>
            </button>
            <div class="product-info"> 
                <p style ="font-size:12px">${product.productTitle}</p>
            </div>
            <div class = "add-to-cart-container">
                <button class="add-to-cart-btn" data-product-title = "${product.productTitle}" data-product-price = "${product.productPrice}" data-product-image = "${product.productImage}" data-product-id = "${product.productId}">Add to Cart</button>
                <p class="added-to-cart"><span style="color:green;">&#10003;</span> Added to Cart</p>
            </div>
        </div>
    `).join('');
    }
    addToCart();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    addToCartB(cart);
}

displayProducts(favorites);

function deleteFavItem(button) {
    const targetID = button.dataset.productId;

    const index = favorites.findIndex(product => product.productId === targetID);

    favorites.splice(index,1);

    localStorage.setItem('favorites', JSON.stringify(favorites));


    displayProducts(favorites);
}

function addToCart() {
    document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
        button.addEventListener('click', () => {

            const paragraphCart = button.closest('.product-card').querySelector('.added-to-cart');
            button.style.opacity = '0.7';

            setTimeout(() => {
            button.style.display= 'none';
            paragraphCart.style.display = 'block';
            }, 700);

            setTimeout(() => {
            button.style.opacity = '1.0';
            button.style.display= 'block';
            paragraphCart.style.display = 'none';
            }, 3000);

            const productTitle = button.dataset.productTitle; 
            const productImage = button.dataset.productImage;
            const productPrice = button.dataset.productPrice;
            const productId = button.dataset.productId;

            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const productAdded = cart.find(item => item.productId === productId);
                if (productAdded) {
                    productAdded.quantity++;
                } else {
                    cart.push({
                    productId,
                    productTitle, 
                    productImage,
                    productPrice,
                    quantity: 1,
                });
                }
                localStorage.setItem('cart',JSON.stringify(cart));
                addToCartB(cart);
            })  
    });
}


console.log(addToCartBubble);

function addToCartB(cart) {
    if (cart.length) {
        addToCartBubble.innerHTML = cart.length;
    } else {
        addToCartBubble.innerHTML = '0';
    }
}
