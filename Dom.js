// Déclaration des boutons et éléments du DOM
const increaseButtons = document.querySelectorAll(".increase");
const decreaseButtons = document.querySelectorAll(".decrease");
const deleteButtons = document.querySelectorAll(".delete");
const likeButtons = document.querySelectorAll(".like");
const quantityElements = document.querySelectorAll(".quantity");
const unitPrices = document.querySelectorAll(".unit-price");
const totalPriceElement = document.querySelector(".total");

// Classe pour le produit
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Classe pour représenter un article dans le panier
class Cart {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  totalPrice() {
    return this.product.price * this.quantity;
  }
}

// Classe pour le panier d'achat
class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product, quantity) {
    const existingArticleIndex = this.products.findIndex(
      (art) => art.product.id === product.id
    );

    if (existingArticleIndex !== -1) {
      this.products[existingArticleIndex].quantity += quantity;
    } else {
      this.products.push(new Cart(product, quantity));
    }
  }

  removeProduct(productId) {
    this.products = this.products.filter(
      (art) => art.product.id !== productId
    );
  }

  showProducts() {
    this.products.forEach((art) => {
      console.log(
        `Product: ${art.product.name}, Quantity: ${art.quantity}, Price: ${art.totalPrice()}`
      );
    });
    console.log(`Total Price: ${this.totalPrice()} $`);
  }

  totalPrice() {
    return this.products.reduce((acc, art) => acc + art.totalPrice(), 0);
  }
}

// Création des produits (simuler à partir des données DOM)
const panier = new ShoppingCart();

quantityElements.forEach((quantityElement, index) => {
  const id = index + 1; // Générer des IDs fictifs
  const name = `Produit ${id}`;
  const price = parseInt(unitPrices[index].textContent);
  const product = new Product(id, name, price);

  const quantity = parseInt(quantityElement.textContent);
  panier.addProduct(product, quantity);
});

// Mettre à jour le prix total
function updateTotalPrice() {
  totalPriceElement.textContent = `${panier.totalPrice()} $`;
}

// Gestion des boutons "+"
increaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantity = parseInt(quantityElements[index].textContent);
    quantityElements[index].textContent = quantity + 1;

    const price = parseInt(unitPrices[index].textContent);
    const product = new Product(index + 1, `Produit ${index + 1}`, price);
    panier.addProduct(product, 1);

    updateTotalPrice();
  });
});

// Gestion des boutons "-"
decreaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let quantity = parseInt(quantityElements[index].textContent);
    if (quantity > 0) {
      quantityElements[index].textContent = quantity - 1;

      const price = parseInt(unitPrices[index].textContent);
      const product = new Product(index + 1, `Produit ${index + 1}`, price);

      panier.addProduct(product, -1);
      updateTotalPrice();
    }
  });
});

// Gestion des boutons "supprimer"
deleteButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productId = index + 1;
    panier.removeProduct(productId);

    const card = button.closest(".card-body");
    card.remove();

    updateTotalPrice();
  });
});

// Gestion des boutons "like"
likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("liked");
    button.style.color = button.classList.contains("liked") ? "red" : "black";
  });
});

// Affichage initial du prix total
updateTotalPrice();
