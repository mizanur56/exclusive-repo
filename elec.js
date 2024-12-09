const menuToggle = document.getElementById("menu_bar");
const navLinks = document.getElementById("nav_link");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const body = document.getElementById("body");
const darkBtn = document.getElementById("dark");
const lightBtn = document.getElementById("light");

const darkMode = () => {
  body.style.backgroundColor = "black";
  body.style.color = "white";
  darkBtn.style.display = "none";
  lightBtn.style.display = "flex";
  const shoppingCartContainer = document.getElementById(
    "shopping_cart-container"
  );
  shoppingCartContainer.style.color = "white";
};
const lightMode = () => {
  body.style.backgroundColor = "white";
  body.style.color = "black";
  darkBtn.style.display = "flex";
  lightBtn.style.display = "none";
};
let cart = [];
let total = 0;
const addToCart = (button) => {
  const product = button.parentElement;
  const id = product.getAttribute("data-id");
  const name = product.getAttribute("data-name");
  const price = parseInt(product.getAttribute("data-price"));

  const hasItems = cart.find((item) => item.id === id);
  if (hasItems) {
    hasItems.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  document.getElementById("cart_count").innerText = cart.length;
};

const openCart = () => {
  const cartItems = document.getElementById("cart_items");
  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    const name = document.createElement("div");
    name.textContent = `Name: ${item.name}`;
    const price = document.createElement("div");
    price.textContent = `Price: ${item.price.toFixed(2) * item.quantity}`;

    const quantityContainer = document.createElement("div");
    const reduceBtn = document.createElement("button");
    reduceBtn.textContent = "-";
    reduceBtn.onclick = () => updateQuantity(index, -1);

    const displayQuantity = document.createElement("span");
    displayQuantity.textContent = `${item.quantity} `;
    displayQuantity.style.margin = "0 5px";

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.onclick = () => updateQuantity(index, 1);

    quantityContainer.appendChild(reduceBtn);
    quantityContainer.appendChild(displayQuantity);
    quantityContainer.appendChild(increaseBtn);

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(quantityContainer);
    li.classList.add("border");

    cartItems.appendChild(li);

    total += item.price * item.quantity;
  });
  document.getElementById("total_price").textContent = total.toFixed(2);
  const shoppingCartContainer = document.getElementById(
    "shopping_cart-container"
  );
  shoppingCartContainer.classList.add("active");
};

const updateQuantity = (index, change) => {
  const item = cart[index];
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      // Remove item if quantity goes to 0
      cart.splice(index, 1);
    }
  }
  openCart();
};
const closeCart = () => {
  const shoppingCartContainer = document.getElementById(
    "shopping_cart-container"
  );
  shoppingCartContainer.classList.remove("active");
};
