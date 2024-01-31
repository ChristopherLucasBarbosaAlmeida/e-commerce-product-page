let count = 0;
const counter = document.getElementById("counter");
const decreaseButton = document.getElementById("minus");
const incrementButton = document.getElementById("plus");

decreaseButton.addEventListener("click", () => {
  if (!count) {
    return;
  }

  count--;
  counter.textContent = count;
});

incrementButton.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});

const cartIcon = document.getElementById("cart");

cartIcon.addEventListener("click", () => {
  const cart = document.querySelector(".cart");
  if (cart.classList.contains("hidden")) {
    cart.classList.remove(...["hidden", "cart-hidden"]);
    cart.classList.add(...["show", "cart-show"]);
  } else {
    cart.classList.remove(...["show", "cart-show"]);
    cart.classList.add("cart-hidden");
    setTimeout(() => {
      cart.classList.add("hidden");
    }, 400);
  }
});

function getStoredItem() {
  return JSON.parse(localStorage.getItem("cart"));
}

function storeLocally(data) {
  localStorage.setItem("cart", JSON.stringify(data));
}

const addToCartButton = document.getElementById("add");
addToCartButton.addEventListener("click", () => {
  if (!count) {
    return;
  }

  const product = {
    id: window.crypto.randomUUID(),
    name: "Fall Limited Edition Sneakers",
    price: 125,
    amount: count,
    total: 125 * count,
  };

  if (!getStoredItem()) {
    storeLocally([product]);
  } else {
    storeLocally([...getStoredItem(), product]);
  }

  renderTooltip();
  renderCartItems(product);
});

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "usd",
  }).format(value);
}

const cartContainer = document.getElementById("cart-container");

function renderCartItems(addedProduct) {
  const productContainer = document.createElement("div");
  const trashIcon = document.createElement("img");
  productContainer.classList.add("product");
  productContainer.id = addedProduct.id;
  trashIcon.src = "images/icon-delete.svg";
  trashIcon.className = "product__delete";
  trashIcon.addEventListener("click", () =>
    removeItemsFromCart(addedProduct.id)
  );

  const html = `
    <div>
      <img src="images/image-product-1-thumbnail.jpg" class="product__image">
      <div>
      <span>${addedProduct.name}</span>
      <span class="product__description">${formatCurrency(
        addedProduct.price
      )} x ${addedProduct.amount}<strong>
      ${formatCurrency(addedProduct.total)}</strong>
      </span>
      </div>
    </div>
  `;

  productContainer.innerHTML = html;
  productContainer.append(trashIcon);
  cartContainer.append(productContainer);
}

function removeItemsFromCart(id) {
  const cart = getStoredItem();
  const index = cart.findIndex((item) => {
    item.id === id;
  });
  cart.splice(index, 1);
  storeLocally([...cart]);
  const removedNode = document.getElementById(id);
  cartContainer.removeChild(removedNode);
  renderTooltip();
}

function renderTooltip() {
  const tooltip = document.querySelector(".tooltip");

  if (getStoredItem().length) {
    tooltip.classList.add("tooltip--show");
    tooltip.textContent = getStoredItem().length;
  } else {
    tooltip.classList.remove("tooltip--show");
  }
  render();
}

function render() {
  const checkoutButton = document.getElementById("checkout-button");
  const emptyCartMessage = document.querySelector(".cart__message");

  if (!getStoredItem().length) {
    checkoutButton.classList.add("button--hidden");
    emptyCartMessage.classList.add("cart__message--show");
  } else {
    checkoutButton.classList.remove("button--hidden");
    emptyCartMessage.classList.remove("cart__message--show");
  }
}

render();

window.addEventListener("load", () => {
  renderTooltip();
  getStoredItem().forEach((item) => {
    renderCartItems(item);
  });
});

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const navigation = document.querySelector(".navigation");

menu.addEventListener("click", () => {
  navigation.classList.remove("navigation--hidden--animation");
  navigation.style.display = "block";
  navigation.classList.add("navigation--animation--show");
});

close.addEventListener("click", () => {
  navigation.classList.remove("navigation--animation--show");
  navigation.classList.add("navigation--hidden--animation");
  setTimeout(() => {
    navigation.style.display = "none";
  }, 400);
});
