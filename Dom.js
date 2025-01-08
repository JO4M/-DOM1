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


