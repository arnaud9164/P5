import contactcart from "./contact_poo.js";
import Cart from "./cart_poo.js";

const Url_Api = "http://localhost:3000/api/products/";
const Url_Api_Order = "http://localhost:3000/api/products/order";


let cart = new Cart();

// Initialisation des data produits du panier
let api_products = [];

getAPIProducts(cart.cart);
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
    cart.CalculTotalQuantityPrice();
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
            cart.CalculTotalQuantityPrice();
            cart.listenQuantityEvents();
            cart.listenDeleteEvents()
            listenOrderEvents(); 
        } catch(err){
          console.log("err");
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
      console.log(api_products[i]);
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