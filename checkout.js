let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(cart) {
    const productSection = document.querySelector('.product-section');
    productSection.innerHTML = `<h1> Your Cart </h1>` + cart.map(product => `
        <div class ="product-card">
            <div class = "product-image-container">
                <img src="${product.productImage}" alt="${product.productName}" width="200" height ="200"/>
            </div>
            <div class="product-info"> 
                <h3 style ="font-size:14px">${product.productName}</h3>
                <p>$${product.productPrice}</p>
            </div>
            <div class = "product-quanity">
                <label for="quantity">Quantity:</label>
                <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    `).join('');

}
console.log(cart);
displayProducts(cart);
