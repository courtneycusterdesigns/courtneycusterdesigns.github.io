let headerContent = `
<a href="index.html"><img src="./img/site_img/small.jpg" class="logo" width=60px/></a>
<div class="navbar">
    <a href="index.html">Home</a>
    <div class="dropdown">
        <button class="dropbtn">Shop <i class="fa fa-caret-down"></i></button>
        <div class="dropdown-content">
            <a href="chain_earrings.html">Chain Earrings</a>
            <a href="shop_earrings.html">Earrings</a>
        </div>
    </div>
    <a href="contact.html">Contact</a>
    <a href="cart.html"><i class="far fa-shopping-bag"></i></a>
</div>
<h2 class="header">Courtney Custer Designs</h2>
`;
document.querySelector('#buttoncontainer').insertAdjacentHTML('beforeend', headerContent);