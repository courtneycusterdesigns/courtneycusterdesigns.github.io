let products = null;
// get products from json
fetch('./product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

// show products in list html
function addDataToHTML() {
    // remove data default in html
    let listProductHTML = document.querySelector('.product_list');
    listProductHTML.innerHTML = '';

    // add new products
    if(products != null){
        products.forEach(product => {
            if(product.id > 100){
                let newProduct = document.createElement('div');
                newProduct.classList.add('product');
                newProduct.innerHTML = `
                    <a href="product_page.html" onclick="sendPage(${product.id})"><img src="${product.image}" class="product_img"/></a>
                    <p class="product_name">${product.name}</p>
                    <p class="product_price">$${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="add_to_cart_button">Add to Cart</button>
                `;
                listProductHTML.appendChild(newProduct);
            }
        });
    }
}

// add product to cart ----------------------------------------------------
let cart = [];

function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = []; // Initialize as an empty object if no cart exists
    }
}

// Call initializeCart when the script loads
initializeCart();

function addToCart($id) {
    window.location.href = "cart.html";

    let productCopy = JSON.parse(JSON.stringify(products));
    // if this product is not in the cart
    if(!cart[$id]){
        let dataProduct = productCopy.filter(product => product.id == $id)[0];
        // add product to cart
        cart[$id] = dataProduct;
        cart[$id].quantity = 1;
    }
    else{
        // if the product is already in the cart
        // increase quantity
        cart[$id].quantity++;
    }
    // save cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // update total price
    let totalPrice = updateTotalPrice();
    let totalPriceHTML = document.querySelector('.total_price');
    totalPriceHTML.innerText = `$${totalPrice}`;
    addCartToHTML();
}

addCartToHTML();
function addCartToHTML() {
    // clear data default in html
    let cartHTML = document.querySelector('.cart_list');
    cartHTML.innerHTML = '';
    
    //let totalHTML = document.querySelector('.cartCount');
    let totalQuantity = 0;

    // add new products
    if(cart != null){
        cart.forEach(product => {
            if(product != null){
                let newCart = document.createElement('div');
                newCart.classList.add('product');
                newCart.innerHTML = `
                    <a href="product_page.html" onclick="sendPage(${product.id})"><img src="${product.cart_image}" class="product_img"/></a>
                    <div class="content">
                        <div class="product_name">
                            <a href="product_page.html" onclick="sendPage(${product.id})">${product.name}</a>
                        </div>
                        <div class="product_price">
                            $${product.price} / product
                        </div>
                    </div>
                    <div class="quantity">
                        <button onClick="changeQuantity(${product.id},' - ')">-</button>
                        <span class="quantity_value">${product.quantity}</span>
                        <button onClick="changeQuantity(${product.id},'+')">+</button>
                    </div>
                `;
                cartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    //totalHTML.innerText = totalQuantity;
    // update total price
    let totalPrice = updateTotalPrice();
    let totalPriceHTML = document.querySelector('.total_price');
    totalPriceHTML.innerText = `$${totalPrice}`;
}

function changeQuantity(id, operator) {
    if(operator == '+'){
        cart[id].quantity++;
    }
    else{
        cart[id].quantity--;
        if(cart[id].quantity <= 0){
            delete cart[id];
        }
    }
    // save cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    addCartToHTML();
}

// update total price
function updateTotalPrice() {
    let totalPrice = 0;
    for (let product of cart) {
        if (product != null) {
            totalPrice += product.price * product.quantity;
        }
    }
    return totalPrice;
}
// Call updateTotalPrice when the cart is updated
// and display the total price in the HTML
function displayTotalPrice() {
    let totalPrice = updateTotalPrice();
    let totalPriceHTML = document.querySelector('.total_price');
    totalPriceHTML.innerText = `$${totalPrice}`;
}
