// Déclaration de tous les variables des boutons "+","-" "like" et "supprimer" 
const increaseButtons = document.querySelectorAll(".increase");

const decreaseButtons = document.querySelectorAll(".decrease");

const deleteButtons = document.querySelectorAll(".delete");

const likeButtons = document.querySelectorAll(".like");

//Le nombre de produit
const quantityElements = document.querySelectorAll(".quantity");

//Les prix
const unitPrices = document.querySelectorAll(".unit-price");

// le prix total
const totalPriceElement = document.querySelector(".total");

/*Créez une classe d’objet pour le produit afin de stocker les propriétés pour id, name et price du produit.*/

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
  // Méthode pour calculer le prix total d'un article
  totalPrice() {
    return this.product.price * this.quantity;
  }
}
// Classe pour le panier d'achat
class ShoppingCart {
  constructor() {
    this.products = []; // Tableau pour stocker les articles du panier
  }
   // Ajouter un produit au panier
   addProduct(product, quantity) {
    // Vérifier si le produit est déjà dans le panier
    const existingArticleIndex = this.products.findIndex(
      (art) => art.product.id === product.id
    );
    if (existingArticleIndex !== -1) {
      // Si le produit existe déjà, on met à jour la quantité
      this.products[existingArticleIndex].quantity += quantity;
    } else {
      // Si le produit n'existe pas, on l'ajoute au panier
      this.products.push(new Cart(product, quantity));
    }
  }
   // Supprimer un produit du panier
   removeProduct(productId) {
    this.products = this.products.filter(
      (art) => art.product.id !== productId
    );
  }
 // Afficher les produits dans le panier
 showProducts() {
  this.products.forEach((art) => {
    console.log(
      `Product: ${art.product.name}, Quantity: ${art.quantity}, Price: ${art.totalPrice()}`
    );
  });
  console.log(`Total Price: ${this.totalPrice()} $`);
}
// Calculer le prix total du panier
totalPrice() {
  return this.products.reduce((acc, art) => acc + art.totalPrice(), 0);
}
}
// Création des produits
const maillots = new Product(1, "Maillots", 50);
const brassards = new Product(2, "Brassards", 10);
const pull = new Product(3, "Pull", 30);
// Créer un panier d'achat
const panier = new ShoppingCart();
// Ajouter des articles au panier
panier.addProduct(maillots, 2); // Ajouter 2 maillots
panier.addProduct(brassards, 5); // Ajouter 5 brassards
// Afficher les articles du panier
panier.showProducts();

// Retirer un article du panier
panier.removeProduct(2); // Retirer les brassards (id = 2)

// Afficher le panier mis à jour
panier.showProducts();

// Calculer le prix total du panier
console.log(`Prix total final: ${panier.totalPrice()} $`);




// Fonction pour mettre à jour le prix total du panier
function updateTotalPrice() {
  let totalPrice = 0; // Initialiser le prix total à 0

  // Parcourir chaque produit pour calculer son coût total
  quantityElements.forEach((quantityElement, index) => {
    const quantity = parseInt(quantityElement.textContent); // Récupérer la quantité
    const unitPrice = parseInt(unitPrices[index].textContent); // Récupérer le prix unitaire
    totalPrice += quantity * unitPrice; // Calcul du prix total
  });
  //  prix total
  totalPriceElement.textContent = `${totalPrice} $`;
}

//  bouton Ajouter "+"
increaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let quantity = parseInt(quantityElements[index].textContent); //
    quantity += 1; 
    quantityElements[index].textContent = quantity; 
    updateTotalPrice(); // Recalculer le prix total
  });
});

// bouton "-"
decreaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let quantity = parseInt(quantityElements[index].textContent); 
    if (quantity > 0) {
      quantity -= 1; // Diminuer la quantité de 1 (si elle est supérieure à 0)
      quantityElements[index].textContent = quantity; 
      updateTotalPrice(); 
    }
  });
});

//  bouton de suppression
deleteButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const Carte = button.closest(".card-body"); // Trouver la carte du produit à supprimer
    Carte.remove(); // Supprimer la carte
    updateTotalPrice();
  });
});

// boutons "like"
likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("liked"); 
    if (button.classList.contains("liked")) {
      button.style.color = "red"; // Si "liked" est présent, changer la couleur en rouge
    } else {
      button.style.color = "black"; // Sinon, remettre la couleur par défaut
    }
  });
});


