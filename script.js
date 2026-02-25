fetchData();

async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const products = await response.json();

        displayProducts(products);


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error.message);
    }
}

let cart = [];

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function displayProducts(products) {
    const productgrid = document.querySelector('.product-grid');

    productgrid.innerHTML = products.map(product => `
        <div class ="product-card">
            <div class = "product-image-container">
                <img src="${product.image}" alt="${product.title}"/>
            </div>
            <div class="product-info"> 
                <h3 style ="font-size:14px">${product.title}</h3>
                <p>$${product.price}</p>
                <div class="product-rating">
                    Rating: ${product.rating.rate} (${product.rating.count} reviews)
                </div>
            </div>
            <div class = "add-to-cart-container">
                <button class="add-to-cart-btn" data-product-name = "${product.title}" data-product-price = "${product.price}" data-product-image = "${product.image}" data-product-id = "${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.dataset.productName; 
        const productImage = button.dataset.productImage;
        const productPrice = button.dataset.productPrice;
        const productId = button.dataset.productId;

        const productAdded = cart.find(item => item.productId === productId);
        if (productAdded) {
            productAdded.quantity++;
        } else {
            cart.push({
            productId,
            productName, 
            productImage,
            productPrice,
            quantity: 1,
        });
        updateCart();
        console.log(cart);
        }
    })
});
}



