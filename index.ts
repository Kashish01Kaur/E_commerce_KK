interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number
  };
}

function calculateStars(rating: number): string {
  const filledStars = Math.floor(rating);
  const unfilledStars = 5 - filledStars;
  let stars = "";
  for (let i = 0; i < filledStars; i++) {
    stars += "★";
  }
  for (let i = 0; i < unfilledStars; i++) {
    stars += "☆";
  }
  return stars;
}

function fetchData(url: string) {
  let data: Product[] = [];

  fetch(url).then((response) => {
    if (response.ok) {
      return response.json() as Promise<Product[]>;
    }
    else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((resData) => {
    data = resData;
    console.log(data);

    const sortButton = document.getElementById("sortButton");
    const sortByMenu = document.querySelector("#sortButton + .dropdown-menu") as HTMLUListElement;
    sortButton?.addEventListener("click", () => {
      sortByMenu?.addEventListener("click", (event) => {
        const sortOption = (event.target as HTMLAnchorElement).textContent;
        if (sortOption === "Price (Low to High)") {
          data.sort((a, b) => a.price - b.price);
        }else if (sortOption === "Price (High to Low)") {
          data.sort((a, b) => b.price - a.price);
        } else if (sortOption === "Rating (Low to High)") {
          data.sort((a, b) => a.rating.rate - b.rating.rate);
        } else if (sortOption === "Popularity (Rating High to Low)") {
          data.sort((a, b) => b.rating.rate - a.rating.rate);
        }
        displayProducts();
      });
    });

    const filterButton = document.getElementById("filterButton");
    const filterByMenu = document.querySelector("#filterButton + .dropdown-menu") as HTMLUListElement;
    filterButton?.addEventListener("click", () => {
      filterByMenu?.addEventListener("click", (event) => {
        const filterOption = (event.target as HTMLAnchorElement).textContent;
        if (filterOption === "Customer Rating") {
          data = data.filter((product) => product.rating.rate >= 4);
        }
        displayProducts();
      });
    });

    const mainContainer = document.getElementById("home");
    const cardDeck = document.createElement("div");
    cardDeck.classList.add("card-deck");

    function displayProducts() {
      cardDeck.innerHTML = "";
      data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.style.margin = "1rem";

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top");
        cardImage.alt = "Product Image";
        cardImage.src = product.image;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = product.title;

        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.textContent = `$ ${product.price}`;

        const cardRating = document.createElement("p");
        cardRating.classList.add("card-rating");
        cardRating.textContent = `Rating: ${calculateStars(
          product.rating.rate
        )} (${product.rating.count} reviews)`;

        const cardButton = document.createElement("a");
        cardButton.classList.add(
          "btn",
          "btn-primary",
          "col-12",
          "mx-auto",
          "mt-auto",
          "card-btn"
        );
        cardButton.href = `./productDetails.html?id=${product.id}`;
        cardButton.textContent = "View More ";

        cardDeck.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        cardBody.appendChild(cardButton);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardRating);

        cardButton.addEventListener("click", () => {
          localStorage.setItem("CurrId", product.id.toString());
        });
      });
    }

    displayProducts();

    if (mainContainer) {
      mainContainer.appendChild(cardDeck);
    }
  }).catch((error) => console.error("FETCH ERROR:", error));
}