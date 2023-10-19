document.addEventListener('DOMContentLoaded', () => {
    renderWishlistItems();
    
    function renderWishlistItems(): void {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      const wishlistPage = document.getElementById('wishlist');
      if(wishlistPage){
        wishlistPage.innerHTML = '';
      }
      
      wishlistPage?.classList.add('wishlistPage');
  
      // Renders each item in wishlist
      wishlist.forEach((product: any) => {
        const productDetails = document.createElement('div');
        productDetails.classList.add('prodDetails');
  
        const prodDetailsImage = document.createElement('div');
        prodDetailsImage.classList.add('prodDetailsImage');
  
        const prodDetailsContent = document.createElement('div');
        prodDetailsContent.classList.add('prodDetailsContent');
  
        const img = document.createElement('img');
        img.classList.add('checkout-img');
        img.setAttribute('src', product.image);
        prodDetailsImage.appendChild(img);
  
        const h5 = document.createElement('h5');
        h5.innerHTML = product.title;
        h5.classList.add('prodTitle');
        prodDetailsContent.appendChild(h5);
  
        const h6 = document.createElement('h6');
        if (typeof product.price === 'number') {
          h6.innerHTML = ` Price: $${product.price.toFixed(2)}`;
        } else {
          h6.innerHTML = ` Price: $${0}`;
        }
        prodDetailsContent.appendChild(h6);
  
        // Remove button
        const removeButton = createButton('Remove', () => removeFromWishlist(product));
        removeButton.classList.add('removeButton');
        prodDetailsContent.appendChild(removeButton);
  
        const cartButton = createButton('Move to Cart', () => moveToCart(product));
        cartButton.classList.add('moveToCartButton');
        prodDetailsContent.appendChild(cartButton);
  
        const wishlistContainer = document.getElementById('wishlist');
        wishlistContainer?.classList.add('wishlistContainer');
        wishlistContainer?.appendChild(productDetails);
        productDetails.appendChild(prodDetailsImage);
        productDetails.appendChild(prodDetailsContent);
      });
    }
  
    function createButton(text: string, onClick: () => void): HTMLButtonElement {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
    }
  
    function removeFromWishlist(product: any): void {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      renderWishlistItems();
    }
  
    function moveToCart(product: any): void {
      let cart:any[] = JSON.parse(localStorage.getItem('cart') || "[]");
      const productId = product.id;
      // product is already in the cart
      const productIndex = cart.findIndex(item => item.id == productId);
      if (productIndex == -1) {
        // Product is not in the cart, add it
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Product moved to cart:", product);
        alert("Product moved to cart. Enjoy shopping:)");
      } else {
        console.log("Product already in the cart.");
        alert("Product already in the cart.");
      }
      // Remove from wishlist after moving to cart
      removeFromWishlist(product);
    }
  });