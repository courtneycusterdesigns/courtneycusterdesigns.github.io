let cart = [];

// Check if cart is already in localStorage
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
addCartToHTML();

function addCartToHTML() {
    let cartHTML = document.querySelector('.cart');
    cartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.total_quantity');
    let totalPriceHTML = document.querySelector('.total_price');

    let totalQuantity = 0;
    let totalPrice = 0;

    if(cart){
        cart.forEach(product => {
            if(product){
                let newProduct = document.createElement('div');
                newProduct.classList.add('product');
                newProduct.innerHTML = `
                    <img src="${product.cart_image}" class="product_img"/>
                    <div class="content">
                        <div class="product_name">
                            ${product.name}
                        </div>
                        <div class="product_price">
                            $${product.price} / product
                        </div>
                    </div>
                    <div class="quantity">
                        <span class="quantity_value">${product.quantity}</span>
                    </div>
                `;
                cartHTML.appendChild(newProduct);
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    // event.preventDefault(); // Prevent form submission for testing
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out null or undefined products
    let validCart = cart.filter(product => product && product.id);

    // Extract product IDs from the valid cart
    let idList = validCart.map(product => product.name);

    // Get product amounts from the valid cart
    let amountList = validCart.map(product => product.quantity);

    // console.log('Product IDs:', idList);

    // Add product IDs to the hidden input field
    let productIdsInput = document.getElementById('cartData');
    productIdsInput.value = JSON.stringify(idList);

    // Add product amounts to the hidden input field
    let productAmountsInput = document.getElementById('cartAmount');
    productAmountsInput.value = JSON.stringify(amountList);
});

// Add event listener to the form submission
window.addEventListener("load", function () {
    const form = document.getElementById('checkoutForm');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                window.location.href = "order_success.html";

                // clear the cart in localStorage
                localStorage.removeItem('cart');
                cart = [];
                addCartToHTML();
            })
    });
});