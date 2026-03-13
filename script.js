

fetchData();


async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const products = await response.json();
        localStorage.setItem('products',JSON.stringify(products));

        displayProducts(products);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        addToCartB(cart);


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error.message);
    }
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

            const productName = button.dataset.productName; 
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
                    productName, 
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


function displayProducts(products) {
    const productgrid = document.querySelector('.product-grid');
    productgrid.innerHTML = products.map(product => `
        <div class ="product-card">
            <div class = "product-image-container">
                <img src="assets/product-images/product${product.id}.png" alt="${product.title}"/>
            </div>
            <button class="wishlist-button-small" data-product-title = "${product.title}" data-product-image = "${product.image}" data-product-id = "${product.id}">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/4D4D4D/like--v2.png" alt="like--v2"/>
            </button>
            <div class="product-info"> 
                <h3 style="font-size:13px">$${parseFloat(product.price).toFixed(2)}</h3>
                <p style ="font-size:12px">${product.title}</p>
                <div class="product-rating" style ="font-size:13px">
                    Rating: ${product.rating.rate} (${product.rating.count} reviews)
                </div>
            </div>
            <div class = "add-to-cart-container">
                <button class="add-to-cart-btn" data-product-name = "${product.title}" data-product-price = "${product.price}" data-product-image = "${product.image}" data-product-id = "${product.id}">Add to Cart</button>
                <p class="added-to-cart"><span style="color:green;">&#10003;</span> Added to Cart</p>
            </div>
        </div>
    `).join('');

      document.querySelectorAll('.wishlist-button-small').forEach(button => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const productId = button.dataset.productId;
    
        const isFavorite = favorites.find(item => item.productId === productId);
    
        if (isFavorite) {
            button.querySelector('img').src = 'https://img.icons8.com/material/24/4D4D4D/like--v1.png';
        }
    })

    addToCart();
    addToFavorites();
}




 const allButtons = document.querySelectorAll('.category-buttons');
 
 allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];

        allButtons.forEach((button) => {
            button.style.backgroundColor = 'transparent';
            button.style.color = 'black';
        });

        let filteredarray = [];
        if (button.innerHTML === 'All') {
            button.style.backgroundColor = 'rgb(24, 36, 111)';
            button.style.color = 'white';
            filteredarray = products;
        } else if( button.innerHTML ==='Clothing') {
            button.style.backgroundColor = 'rgb(24, 36, 111)';
            button.style.color = 'white';
            filteredarray = products.filter(product => product.category === "women's clothing" || product.category === "men's clothing");
        } else if(button.innerHTML === 'Jewelry') {
            button.style.backgroundColor = 'rgb(24, 36, 111)';
            button.style.color = 'white';
            filteredarray = products.filter(product => product.category === 'jewelery');
        } else if(button.innerHTML = 'Gadgets') {
            button.style.backgroundColor = 'rgb(24, 36, 111)';
            button.style.color = 'white';
            filteredarray = products.filter(product => product.category === 'electronics');
        }
        displayProducts(filteredarray);
        addToCart();
    });
});

const inputElement = document.querySelector('.input');

function searchDisplay() {
    const productgrid = document.querySelector('.product-grid');

    const products = JSON.parse(localStorage.getItem('products')) || [];
   
    const query = inputElement.value.toLowerCase();
  
    const filteredarray = products.filter(product => product.title.toLowerCase().includes(query)|| product.category.toLowerCase().includes(query));


    if (filteredarray.length != 0) {
        displayProducts(filteredarray);
    } else {
        productgrid.innerHTML = `<p class="no-products-found">No Items Found</p>`;
    }
}

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchDisplay();
    }}
)




const addToCartBubble = document.querySelector('.cart-icon-bubble');

function addToCartB(cart) {
    if (cart.length) {
        addToCartBubble.innerHTML = cart.length;
    } else {
        addToCartBubble.innerHTML = '0';
    }
}


function addToFavorites() {
    document.querySelectorAll('.wishlist-button-small').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const productTitle = button.dataset.productTitle; 
            const productImage = button.dataset.productImage;
            
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const index = favorites.findIndex(item => item.productId === productId);

            if (index > -1) {
                favorites.splice(index,1);
                button.querySelector('img').src = 'https://img.icons8.com/material-outlined/24/4D4D4D/like--v2.png';
            } else {
                favorites.push({ productId, productTitle, productImage });
                button.querySelector('img').src = 'https://img.icons8.com/material/24/4D4D4D/like--v1.png';
            }
                localStorage.setItem('favorites',JSON.stringify(favorites));
            })   

    });
}
