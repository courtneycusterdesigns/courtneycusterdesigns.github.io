let products2 = null;
// Fetch products from product.json
fetch('./product.json')
    .then(response => response.json())
    .then(data => {
        products2 = data;

        // Once products are loaded, show the product based on the saved product ID
        let productId = localStorage.getItem('product_id');
        if (productId) {
            showProduct(productId);
        }
    })
    .catch(error => {
        console.error('Error loading products:', error);
    });

function sendPage($id) {
    // save product id to localStorage
    localStorage.setItem('product_id', $id);
}

function showProduct($id) {
    let productPageHTML = document.querySelector('.product_page');

    if (productPageHTML) {
        productPageHTML.innerHTML = '';

        // get product data for id
        let productCopy = JSON.parse(JSON.stringify(products2));
        let product = productCopy.filter(product => product.id == $id)[0];
        console.log(product);

        let newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.innerHTML = `
            <img src="${product.image}" class="product_img"/>
            <div class="product_info">
                <h2 class="product_name">${product.name}</h2>
                <p class="product_price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="add_to_cart_button">Add to Cart</button>
            </div>
        `;
        productPageHTML.appendChild(newProduct);
    }
}