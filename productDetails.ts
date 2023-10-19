const currId = localStorage.getItem('CurrId') || '';

fetch(`https://fakestoreapi.com/products/${currId}`)
  .then(res => res.json())
  .then((data: any) => {
    console.log(data)
    let productDetails = document.getElementById('productDetails') as HTMLElement;
    let productImage = document.createElement('div');
    productImage.classList.add("productImage");
    
    let img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.classList.add("prod-img");
    productImage.append(img);
    productDetails?.appendChild(productImage);

    let productContent = document.createElement('div');
    productContent.classList.add("productContent");

    let title = document.createElement('h5');
    title.innerHTML = data.title;
    title.classList.add("prod-title");
    productContent.appendChild(title);

    let price = document.createElement('h6');
    price.innerHTML = `$ ${data.price}`;
    price.classList.add("prod-price");
    productContent.appendChild(price);

    let desc = document.createElement('p');
    desc.innerHTML = data.description;
    desc.classList.add("prod-desc");
    productContent.appendChild(desc);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add("buttons-container");
   
    const addToCartButton = document.createElement('a');
    addToCartButton.classList.add(
      "btn",
      "btn-primary",
      "col-12",
      "mx-auto",
      "mt-auto",
      "pink-btn",
      "add-to-cart-button"
    );
    addToCartButton.textContent = "Add to Cart";
    buttonsContainer.appendChild(addToCartButton);

    const addToWishlistButton = document.createElement('a');
    addToWishlistButton.classList.add(
      "btn",
      "btn-outline-primary",
      "col-12",
      "mx-auto",
      "mt-3",
      "pink-btn",
      "add-to-wishlist-button"
    );
    addToWishlistButton.innerHTML = "Add to Wishlist";
    buttonsContainer.appendChild(addToWishlistButton);
   
    productContent.appendChild(buttonsContainer);
    productDetails?.appendChild(productContent);

    addToCartButton.addEventListener('click', () => {

      let cart:any[] = JSON.parse(localStorage.getItem('cart') || "[]");
      const productId = data.id;
      // product is already in the cart
      const productIndex = cart.findIndex((item: any) => item.id == productId);
      if (productIndex == -1) {
        // Product is not in the cart, add it
        cart.push(data);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Product added to cart:", data);
        alert("Product is added to cart. Continue shopping:)");
      } else {
        console.log("Product already in the cart.");
        alert("Product already in the cart.");
      }
    });

    addToWishlistButton.addEventListener('click', () => {
      let wishlist:any[] = JSON.parse(localStorage.getItem('wishlist') || "[]");
      const productId = data.id;
      // product is already in the wishlist
      const productIndex = wishlist.findIndex((item: any) => item.id == productId);
      if (productIndex == -1) {
        // Product is not in the wishlist, add it
        wishlist.push(data);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        console.log("Product added to wishlist:", data);
        alert("Product is added to wishlist. Enjoy shopping:)");
      } else {
        console.log("Product already in the wishlist.");
        alert("Product already in the wishlist.");
      }
    });
  });