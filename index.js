function calculateStars(rating) {
    var filledStars = Math.floor(rating);
    var unfilledStars = 5 - filledStars;
    var stars = "";
    for (var i = 0; i < filledStars; i++) {
        stars += "★";
    }
    for (var i = 0; i < unfilledStars; i++) {
        stars += "☆";
    }
    return stars;
}
function fetchData(url) {
    var data = [];
    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
        .then(function (resData) {
        data = resData;
        console.log(data);
        var sortButton = document.getElementById("sortButton");
        var sortByMenu = document.querySelector("#sortButton + .dropdown-menu");
        sortButton === null || sortButton === void 0 ? void 0 : sortButton.addEventListener("click", function () {
            sortByMenu === null || sortByMenu === void 0 ? void 0 : sortByMenu.addEventListener("click", function (event) {
                var sortOption = event.target.textContent;
                if (sortOption === "Price (Low to High)") {
                    data.sort(function (a, b) { return a.price - b.price; });
                }
                else if (sortOption === "Price (High to Low)") {
                    data.sort(function (a, b) { return b.price - a.price; });
                }
                else if (sortOption === "Rating (Low to High)") {
                    data.sort(function (a, b) { return a.rating.rate - b.rating.rate; });
                }
                else if (sortOption === "Popularity (Rating High to Low)") {
                    data.sort(function (a, b) { return b.rating.rate - a.rating.rate; });
                }
                displayProducts();
            });
        });
        var filterButton = document.getElementById("filterButton");
        var filterByMenu = document.querySelector("#filterButton + .dropdown-menu");
        filterButton === null || filterButton === void 0 ? void 0 : filterButton.addEventListener("click", function () {
            filterByMenu === null || filterByMenu === void 0 ? void 0 : filterByMenu.addEventListener("click", function (event) {
                var filterOption = event.target.textContent;
                if (filterOption === "Customer Rating") {
                    data = data.filter(function (product) { return product.rating.rate >= 4; });
                }
                displayProducts();
            });
        });
        var mainContainer = document.getElementById("home");
        var cardDeck = document.createElement("div");
        cardDeck.classList.add("card-deck");
        function displayProducts() {
            cardDeck.innerHTML = "";
            data.forEach(function (product) {
                var card = document.createElement("div");
                card.classList.add("card");
                card.style.width = "18rem";
                card.style.margin = "1rem";
                var cardImage = document.createElement("img");
                cardImage.classList.add("card-img-top");
                cardImage.alt = "Product Image";
                cardImage.src = product.image;
                var cardBody = document.createElement("div");
                cardBody.classList.add("card-body", "d-flex", "flex-column");
                var cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title");
                cardTitle.textContent = product.title;
                var cardPrice = document.createElement("p");
                cardPrice.classList.add("card-price");
                cardPrice.textContent = "$ ".concat(product.price);
                var cardRating = document.createElement("p");
                cardRating.classList.add("card-rating");
                cardRating.textContent = "Rating: ".concat(calculateStars(product.rating.rate), " (").concat(product.rating.count, " reviews)");
                var cardButton = document.createElement("a");
                cardButton.classList.add("btn", "btn-primary", "col-12", "mx-auto", "mt-auto", "card-btn");
                cardButton.href = "./productDetails.html?id=".concat(product.id);
                cardButton.textContent = "View More ";
                cardDeck.appendChild(card);
                card.appendChild(cardImage);
                card.appendChild(cardBody);
                cardBody.appendChild(cardButton);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardPrice);
                cardBody.appendChild(cardRating);
                cardButton.addEventListener("click", function () {
                    localStorage.setItem("CurrId", product.id.toString());
                });
            });
        }
        displayProducts();
        if (mainContainer) {
            mainContainer.appendChild(cardDeck);
        }
    }).catch(function (error) { return console.error("FETCH ERROR:", error); });
}
