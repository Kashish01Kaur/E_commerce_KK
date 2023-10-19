var currId = localStorage.getItem('CurrId') || '';
fetch("https://fakestoreapi.com/products/".concat(currId))
    .then(function (res) { return res.json(); })
    .then(function (data) {
    console.log(data);
    var productDetails = document.getElementById('productDetails');
    var productImage = document.createElement('div');
    productImage.classList.add("productImage");
    var img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.classList.add("prod-img");
    productImage.append(img);
    productDetails === null || productDetails === void 0 ? void 0 : productDetails.appendChild(productImage);
    var productContent = document.createElement('div');
    productContent.classList.add("productContent");
    var title = document.createElement('h5');
    title.innerHTML = data.title;
    title.classList.add("prod-title");
    productContent.appendChild(title);
    var price = document.createElement('h6');
    price.innerHTML = "$ ".concat(data.price);
    price.classList.add("prod-price");
    productContent.appendChild(price);
    var desc = document.createElement('p');
    desc.innerHTML = data.description;
    desc.classList.add("prod-desc");
    productContent.appendChild(desc);
    var buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add("buttons-container");
    var addToCartButton = document.createElement('a');
    addToCartButton.classList.add("btn", "btn-primary", "col-12", "mx-auto", "mt-auto", "pink-btn", "add-to-cart-button");
    addToCartButton.textContent = "Add to Cart";
    buttonsContainer.appendChild(addToCartButton);
    var addToWishlistButton = document.createElement('a');
    addToWishlistButton.classList.add("btn", "btn-outline-primary", "col-12", "mx-auto", "mt-3", "pink-btn", "add-to-wishlist-button");
    addToWishlistButton.innerHTML = "Add to Wishlist";
    buttonsContainer.appendChild(addToWishlistButton);
    productContent.appendChild(buttonsContainer);
    productDetails === null || productDetails === void 0 ? void 0 : productDetails.appendChild(productContent);
    addToCartButton.addEventListener('click', function () {
        var cart = JSON.parse(localStorage.getItem('cart') || "[]");
        var productId = data.id;
        // product is already in the cart
        var productIndex = cart.findIndex(function (item) { return item.id == productId; });
        if (productIndex == -1) {
            // Product is not in the cart, add it
            cart.push(data);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log("Product added to cart:", data);
            alert("Product is added to cart. Continue shopping:)");
        }
        else {
            console.log("Product already in the cart.");
            alert("Product already in the cart.");
        }
    });
    addToWishlistButton.addEventListener('click', function () {
        var wishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
        var productId = data.id;
        // product is already in the wishlist
        var productIndex = wishlist.findIndex(function (item) { return item.id == productId; });
        if (productIndex == -1) {
            // Product is not in the wishlist, add it
            wishlist.push(data);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            console.log("Product added to wishlist:", data);
            alert("Product is added to wishlist. Enjoy shopping:)");
        }
        else {
            console.log("Product already in the wishlist.");
            alert("Product already in the wishlist.");
        }
    });
});
