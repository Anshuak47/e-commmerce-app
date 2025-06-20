document.addEventListener("DOMContentLoaded", function (e) {
  const products = [
    { id: 1, name: "product 1", price: 599.99 },
    { id: 2, name: "product 2", price: 699.99 },
    { id: 3, name: "product 3", price: 488.99 },
    { id: 4, name: "product 4", price: 54.99 },
  ];

  const productList = document.getElementById("product-list");

  const cartItems = document.getElementById("cart-items");
  const emptyInput = document.getElementById("empty-cart");
  const totalInput = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  const cartTotal = document.getElementById("cart-total");

  let cartData = localStorage.getItem("cart");
  let savedCart = [];

  if (cartData) {
    try {
      savedCart = JSON.parse(cartData);
    } catch (e) {
      console.error("Failed to parse cart data:", e);
      savedCart = [];
    }
  }
  let totalPrice = 0;

  savedCart.forEach((cart) => renderTotal(cart));

  // Display Products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price} </span>
        <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  //  Add products to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();

      // Get product ID
      const productId = parseInt(e.target.getAttribute("data-id"));

      // Match attribute Id with product Id in array
      const product = products.find((p) => p.id === productId);

      let productAdded = false;
      // Duplicate products should not be added
      savedCart.forEach((item) => {
        if (productId === item.id) {
          productAdded = true;
        }
      });

      // If product is already added then show alert message
      if (productAdded) {
        return alert("product already added");
      } else {
        // Else push the product in cart and save in local storage + render
        savedCart.push(product);
        renderTotal(product);
        saveCart();
      }
    }
  });

  function renderTotal(product) {
    // Hide empty cart message
    emptyInput.classList.add("hidden");

    // Show cart items
    cartTotal.classList.remove("hidden");

    // Calculate total price
    totalPrice += product.price;

    // Creat a new div element
    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-list");
    totalElement.innerHTML = `${product.name} - $${product.price} <button class="remove" data-id="${product.id}">Remove</button>`;

    // Show Price
    totalInput.textContent = `${totalPrice.toFixed(2)}`;

    // Append Cart list in Cart div
    cartItems.append(totalElement);

    totalElement
      .querySelector("button")
      .addEventListener("click", function (e) {
        e.preventDefault();

        // Get the product id to remove
        const cartId = parseInt(e.target.getAttribute("data-id"));

        // Get the cart items after remove that product
        savedCart = savedCart.filter((c) => c.id !== cartId);

        totalPrice = 0;

        // CALCULATE NEW PRICE
        savedCart.forEach((item) => (totalPrice = totalPrice + item.price));

        // remove the div of deleted product
        totalElement.remove();

        // Show final price
        totalInput.textContent = `${totalPrice.toFixed(2)}`;

        // Save the cart in local Storage
        saveCart();
      });
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(savedCart));
  }

  checkoutButton.addEventListener("click", function (e) {
    cartItems.innerText = "";
    savedCart.length = 0;
    alert("Checkout successfull");
    localStorage.setItem("cart", "");
    totalPrice = 0;
  });
});
