document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
    function renderCartItems() {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var totalPrice = 0;
        // Clears the cart container every time the function is called
        var cartPage = document.getElementById('cart');
        cartPage === null || cartPage === void 0 ? void 0 : cartPage.innerHTML = '';
        cartPage === null || cartPage === void 0 ? void 0 : cartPage.classList.add('cartPage');
        // Renders each item in cart or display a message if cart is empty
        if (cart.length === 0) {
            var emptyCartMessage = document.createElement('p');
            emptyCartMessage.classList.add('empty');
            emptyCartMessage.innerText = 'Your cart is empty:(';
            cartPage === null || cartPage === void 0 ? void 0 : cartPage.appendChild(emptyCartMessage);
        }
        else {
            cart.forEach(function (product) {
                var _a, _b;
                var productDetails = document.createElement('div');
                productDetails.classList.add('prodDetails');
                var prodDetailsImage = document.createElement('div');
                prodDetailsImage.classList.add('prodDetailsImage');
                var prodDetailsContent = document.createElement('div');
                prodDetailsContent.classList.add('prodDetailsContent');
                var img = document.createElement('img');
                img.classList.add('checkout-img');
                img.setAttribute('src', product.image);
                prodDetailsImage.appendChild(img);
                var h5 = document.createElement('h5');
                h5.innerHTML = product.title;
                h5.classList.add('prodTitle');
                prodDetailsContent.appendChild(h5);
                var h6 = document.createElement('h6');
                if (typeof product.price === 'number') {
                    h6.innerHTML = " Price $".concat(product.price.toFixed(2));
                    totalPrice += product.price * ((_a = product.quantity) !== null && _a !== void 0 ? _a : 1);
                }
                else {
                    h6.innerHTML = " Price: $".concat(0);
                }
                prodDetailsContent.appendChild(h6);
                prodDetailsContent.classList.add('prodDetailsImage');
                var quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');
                var minusButton = createButton('-', function () { return updateQuantity(product, -1); });
                quantityContainer.appendChild(minusButton);
                // Create a single quantityElement for each cart item
                var quantityElement = document.createElement('span');
                quantityElement.textContent = (_b = product.quantity) !== null && _b !== void 0 ? _b : 1;
                quantityContainer.appendChild(quantityElement);
                var plusButton = createButton('+', function () { return updateQuantity(product, 1); });
                quantityContainer.appendChild(plusButton);
                prodDetailsContent.appendChild(quantityContainer);
                // Remove button
                var removeButton = createButton('Remove', function () { return removeFromCart(product); });
                removeButton.classList.add('removeButton');
                prodDetailsContent.appendChild(removeButton);
                var cartContainer = document.getElementById('cart');
                cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.add('cartContainer');
                cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(productDetails);
                productDetails.appendChild(prodDetailsImage);
                productDetails.appendChild(prodDetailsContent);
            });
            // Render total price
            var cartContainer = document.getElementById('cart');
            var totalPriceElement = document.createElement('div');
            totalPriceElement.classList.add('total-price');
            totalPriceElement.textContent = "Total Price: $".concat(totalPrice.toFixed(2));
            cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(totalPriceElement);
            // Store total price in the local storage
            localStorage.setItem('totalPrice', totalPrice.toFixed(2));
            var placeOrder = createButton('Place Order', function () {
                makePayment();
                localStorage.removeItem('cart');
                renderCartItems();
            });
            placeOrder.classList.add('placeOrder', 'btn', 'btn-primary', 'col-12', 'mx-auto', 'mt-auto', 'pink-btn');
            cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(placeOrder);
        }
    }
    function createButton(text, onClick) {
        var button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    function makePayment() {
        window.location.href = 'payment.html';
    }
    function updateQuantity(product, change) {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var updatedCart = cart.map(function (item) {
            var _a;
            if (item.id === product.id) {
                item.quantity = ((_a = item.quantity) !== null && _a !== void 0 ? _a : 1) + change;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartItems();
    }
    function removeFromCart(product) {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var updatedCart = cart.filter(function (item) { return item.id !== product.id; });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartItems();
    }
});
