import contactcart from "./contact_poo.js";

const Url_Api ="http://localhost:3000/api/products/";
const Url_Api_Order = "http://localhost:3000/api/products/order";

// Recuperation du panier - Local Storage
let cart = JSON.parse(localStorage.getItem("product_panier"));

// Initialisation des data produits du panier
let api_products = [];

getAPIProducts(cart);
/**
 * Récuperation des data using fetch api
 * A partir du panier local storage on viens construire le tableau 
 * contenant les data des produits du panier.
 * Appel des fonctions: displayProducts()
 *                      CalculTotalQuantityPrice()
 *                      listenDeleteEvents()
 *                      listenQuantityEvents()
 * @param { String } Url_Api
 * @param { Object[] } products
 * @param { String } product[]._id
 * @param { String } product[].color
 * @param { String } product[].quantity
 */
async function getAPIProducts(products) {
  if (products === null || products == 0) {
    CalculTotalQuantityPrice();
  } else{
        try {
            for (let i = 0; i < products.length; i++) {
                let api_product = null;
                await fetch(Url_Api + products[i].id)
                .then((res) => res.json())
                .then((data) => (api_product = data));
        
                api_product.color = products[i].color;
                api_product.quantity = products[i].quantity;
                api_products.push(api_product);
            }
            displayProducts();
            CalculTotalQuantityPrice();
            listenDeleteEvents();
            listenQuantityEvents();
            listenOrderEvents(); 
        } catch(err){
            console.error(err);
        }
    }      
}

/**
 * Affichage des produits du panier
 * Boucle x items - créations des elements à afficher
 * { Object[] } api_products
 */
function displayProducts() {
  const cart_items = document.querySelector("#cart__items");
    for (let i = 0; i < api_products.length; i++) { 
      let newArticle = document.createElement("article");
      newArticle.className = "cart__item";
      newArticle.dataset.id = api_products[i]._id;
      newArticle.dataset.color = api_products[i].color;
      cart_items.appendChild(newArticle);

      let imgContainer = document.createElement("div");
      imgContainer.className = "cart__item__img";
      newArticle.appendChild(imgContainer);
      let newImg = document.createElement("img");
      newImg.src = api_products[i].imageUrl;
      newImg.alt = api_products[i].altTxt;
      imgContainer.appendChild(newImg);

      let contentContainer = document.createElement("div");
      contentContainer.className = "cart__item__content";
      newArticle.appendChild(contentContainer);
      let descriptionContainer = document.createElement("div");
      descriptionContainer.className = "cart__item__content__description";
      contentContainer.appendChild(descriptionContainer);
      let newName = document.createElement("h2");
      let nameContent = document.createTextNode(api_products[i].name);
      newName.appendChild(nameContent);
      descriptionContainer.appendChild(newName);
      let newColor = document.createElement("p");
      let colorContent = document.createTextNode(api_products[i].color);
      newColor.appendChild(colorContent);
      descriptionContainer.appendChild(newColor);
      let newPrice = document.createElement("p");
      let priceContent = document.createTextNode(api_products[i].price + " €");
      newPrice.appendChild(priceContent);
      descriptionContainer.appendChild(newPrice);

      let settingContainer = document.createElement("div");
      settingContainer.className = "cart__item__content__settings";
      contentContainer.appendChild(settingContainer);
      let settingQty = document.createElement("div");
      settingQty.className = "cart__item__content__settings__quantity";
      settingContainer.appendChild(settingQty);
      let newQtyLabel = document.createElement("p");
      let QtyLabelContent = document.createTextNode("Qté : ");
      newQtyLabel.appendChild(QtyLabelContent);
      settingQty.appendChild(newQtyLabel);
      let newQtyInput = document.createElement("input")
      newQtyInput.type = "number";
      newQtyInput.className = "itemQuantity";
      newQtyInput.name = "itemQuantity";
      newQtyInput.min = "1";
      newQtyInput.max = "100";
      newQtyInput.value = api_products[i].quantity;
      settingQty.appendChild(newQtyInput);

      let settingDelete = document.createElement("div");
      settingDelete.className = "cart__item__content__settings__delete";
      settingContainer.appendChild(settingDelete);
      let newDeleteBtn = document.createElement("p");
      newDeleteBtn.className = "deleteItem";
      let DeleteBtnContent = document.createTextNode("Supprimer");
      newDeleteBtn.appendChild(DeleteBtnContent);
      settingDelete.appendChild(newDeleteBtn); 
    }
}

// Calcul prix total et nombre article dans le panier
function CalculTotalQuantityPrice() {
  if (cart == null || cart == 0) {
    document.querySelector("#totalQuantity").innerText = "0";
    document.querySelector("#totalPrice").innerText = "0";
    document.querySelector("h1").innerText = "Vous n'avez pas d'article dans votre panier";
  }
  else {
    let total_quantity = 0;
    let total_price = 0;
    for (let i = 0; i < cart.length; i++) {
      let current_index = api_products.findIndex((product) => {
        return product._id == cart[i].id;
      });
      total_quantity += cart[i].quantity;
      total_price += cart[i].quantity * api_products[current_index].price;
    }
    document.querySelector("#totalPrice").innerText = total_price;
    document.querySelector("#totalQuantity").innerText = total_quantity;
  }
}


// Suppresion d'article au click
function listenDeleteEvents() {
  let btn_delete = document.querySelectorAll(".cart__item .deleteItem"); // Recuperation de tout les boutons du DOM
  for (let i = 0; i < btn_delete.length; i++) { // Ecoute de chaque bouton
    btn_delete[i].addEventListener("click", function() {
      let articleToRemove = btn_delete[i].closest("article"); // Return le DOM de l'article à supprimer
      articleToRemove.remove(); // supprime article du DOM
      let articleToRemove_id = articleToRemove.getAttribute("data-id"); // On récupere ID et color à supprimer pour faire une recherche dans local storage
      let articleToRemove_color = articleToRemove.getAttribute("data-color");
      for (let j = 0; j < api_products.length; j++) {
        if (articleToRemove_id == api_products[j]._id && articleToRemove_color == api_products[j].color){
          cart = cart.filter(element => element._id !== api_products[j]._id && element.color !== api_products[j].color);// supprime le produit 
        }
        localStorage.setItem("product_panier", JSON.stringify(cart));
        CalculTotalQuantityPrice(); // On recalcul la quantité et le prix totaux 
      }
    });
  }
}

// Modification quantité produit
function listenQuantityEvents() {
  let input_Quantity = document.querySelectorAll(".cart__item .itemQuantity");
  for (let i = 0; i < input_Quantity.length; i++) {
    input_Quantity[i].addEventListener("change", function(event) {
      let QuantityToModify = input_Quantity[i].closest("article"); // Return le DOM de l'article à modifier
      let QuantityToModify_id = QuantityToModify.getAttribute("data-id");
      let QuantityToModify_color = QuantityToModify.getAttribute("data-color");
      for (let j = 0; j < cart.length; j++) {
        if(cart[i].color === QuantityToModify_color && cart[i].id === QuantityToModify_id){
          if(event.target.value < 1){
            event.target.value = 1;
            cart[i].quantity = 1;
          } else if(event.target.value > 100){
            event.target.value = 100;
            cart[i].quantity = 100;
          }else{
            cart[i].quantity = parseInt(event.target.value);
          }
          localStorage.setItem("product_panier", JSON.stringify(cart));
          CalculTotalQuantityPrice(); // On recalcul la quantité et le prix totaux 
        }
      }
    });
  }
}


/**
 * Function POST API 
 * Recupere ID de confirmation
 * Renvoi sur la page confirmation.html avec passage de ID dans URL 
 * @param { Object } contact
 * @param { Object } products
 */ 
 function postDataOrder(contact, products){
  fetch(Url_Api_Order, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contact: contact,
    products: products,
  }),
}).then(async (response) => {
  try {
    const POST_ORDER = await response.json();
    let orderId = POST_ORDER.orderId;
    localStorage.clear();
    window.location.assign("confirmation.html?id=" + orderId);
  } catch (error) {
    console.log(error);
  }
});
}

/** 
* Fonction passer commande
* Récupére et fabrique un objet contact(formulaire) et un tableau des id produits
* Test les données saisies formulaire 
* True = post sur API les donnée 
* False = Afficher un message d’erreur
*/
function listenOrderEvents() {
  document.querySelector("#order").addEventListener("click", (event) => {
    event.preventDefault();
    let contact = new contactcart(document.querySelector("#firstName").value, 
    document.querySelector("#lastName").value, 
    document.querySelector("#address").value, document.querySelector("#city").value, 
    document.querySelector("#email").value); 
  
    let product_cmd =[];
    for (let i = 0; i < cart.length; i++) { // recupere uniquement ID
      product_cmd.push(cart[i].id);
    }
  
    if(contact.testValidContact()){
      postDataOrder(contact, product_cmd);
    } else{
      return null;
    }
  });
}
