let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function displayProducts(favorites) {
    const noFavsContainer = document.querySelector('.no-favorites-container');
    const productgrid = document.querySelector('.product-grid');
    if (favorites.length === 0) {
        productgrid.innerHTML = "";
        productgrid.style.padding = '0';
        noFavsContainer.innerHTML =`<div class ="no-favorites"><h1 class ="empty-cart"> Your wishlist is empty.</h1><a href="index.html" id = "back-arrow"> &larr; Continue Shopping</a></div>`;
    } else {
        productgrid.innerHTML = favorites.map(product => `
        <div class ="product-card">
            <div class = "product-image-container">
                <img src="assets/product-images/product${product.productId}.png" alt="${product.productTitle}"/>
            </div>
            <button class="wishlist-button-small" onclick ="deleteFavItem(this)" data-product-id = "${product.productId}" data-product-title = "${product.productTitle}" data-product-image = "${product.productImage}">
                <img width="24" height="24" src="https://img.icons8.com/material/24/4D4D4D/like--v1.png" alt="like"/>
            </button>
            <div class="product-info"> 
                <p style ="font-size:12px">${product.productTitle}</p>
            </div>
            <div class = "add-to-cart-container">
                <button class="add-to-cart-btn" data-product-name = "${product.productName}" data-product-price = "${product.productPrice}" data-product-image = "${product.productImage}" data-product-id = "${product.productId}">Add to Cart</button>
                <p class="added-to-cart"><span style="color:green;">&#10003;</span> Added to Cart</p>
            </div>
        </div>
    `).join('');
    }
}

displayProducts(favorites);

function deleteFavItem(button) {
    const targetID = button.dataset.productId;

    const index = favorites.findIndex(product => product.productId === targetID);

    favorites.splice(index,1);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    displayProducts(favorites);

}