document.addEventListener("DOMContentLoaded", function (e) {
  const products = [
    { id: 1, name: "product 1", price: 599.99 },
    { id: 2, name: "product 2", price: 699.99 },
    { id: 3, name: "product 3", price: 488.99 },
    { id: 4, name: "product 4", price: 54.99 },
  ];

  const cart = [];

  const productList = document.getElementById("product-list");

  const cartItems = document.getElementById("cart-items");
  const emptyInput = document.getElementById("empty-cart");
  const totalInput = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  const cartTotal = document.getElementById("cart-total");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)} </span>
        <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      //   console.log("clicked");
      const productId = parseInt(e.target.getAttribute("data-id"));

      const product = products.find((p) => p.id === productId);

      addToCart(product);
    }
  });

  function addToCart(product) {
    // console.log(product);
    cart.push(product);
    renderTotal();
  }

  function renderTotal() {
    cartItems.innerText = "";

    let totalPrice = 0;
    if (cart.length > 0) {
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        // console.log(item);
        const totalElement = document.createElement("div");
        totalElement.classList.add("cart-list");
        totalElement.innerHTML = `${item.name} - $${item.price.toFixed(
          2
        )} <button class="remove" data-id="${item.id}">Remove</button>`;

        totalInput.textContent = `${totalPrice.toFixed(2)}`;
        cartItems.append(totalElement);
      });
    } else {
      cartTotal.classList.add("hidden");
    }
  }

  // Remove product from cart
  const removeButton = document.getElementById("cart-items");

  removeButton.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const cartId = parseInt(e.target.getAttribute("data-id"));

      const itemId = cart.find((c) => c.id === cartId);

      removeFromCart(itemId);
    }
  });

  function removeFromCart(itemId) {
    const index = cart.findIndex((obj) => obj === itemId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    renderTotal();
  }

  checkoutButton.addEventListener("click", function (e) {
    cartItems.innerText = "";
    cart.length = 0;
    alert("Checkout successfull");
    renderTotal();
  });
});
