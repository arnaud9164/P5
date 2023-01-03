import contactcart from "./contact_poo.js";
import Cart from "./cart_poo.js";
import { displayProductCart, Url_Api } from "./display.js";

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
async function DisplayCartApi(cart) {
  if (cart === null || cart == 0) {
    localCart.CalculTotalQuantityPrice();
  } else{
        try {
            for (let i = 0; i < cart.length; i++) {
                let api_product = null;
                await fetch(Url_Api + cart[i].id)
                .then((res) => res.json())
                .then((data) => (api_product = data));  
                localCart.cart[i].imageUrl = api_product.imageUrl;
                localCart.cart[i].altTxt = api_product.altTxt;
                localCart.cart[i].name = api_product.name;
            }
            displayProductCart(localCart.cart);
            localCart.CalculTotalQuantityPrice();
            localCart.listenQuantityEvents();
            localCart.listenDeleteEvents()
            listenOrderEvents(); 
        } catch(err){
          console.error(err);
        }
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
  fetch(Url_Api+"order", {
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
    for (let i = 0; i < localCart.length; i++) { // recupere uniquement ID
      product_cmd.push(localCart[i].id);
    }
  
    if(contact.testValidContact()){
      postDataOrder(contact, product_cmd);
    } else{
      return null;
    }
  });
}


// Récuperation du Panier local storage
let localCart = new Cart();

// Récuperation des data API et affichage
// Appel des fonction, event(quantity, delete, order)
DisplayCartApi(localCart.cart);

