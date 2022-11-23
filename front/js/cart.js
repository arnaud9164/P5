// Recuperation du panier
let cart = JSON.parse(localStorage.getItem("product_panier"));
//console.log(cart);

let api_products = [];

getAPIProducts(cart);
// Recuperation des data API
async function getAPIProducts(products) {
  if (products !== null || products != 0) {
        try {
            for (let i = 0; i < products.length; i++) {
                let api_product = null;
                await fetch(`http://localhost:3000/api/products/` + products[i].id)
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
        } catch(err){
            console.error(err);
        }
    }      
}
// Affichage des produits
  function displayProducts() {
    let cart_items = document.querySelector("#cart__items");
    cart_items.innerHTML = api_products.map((product) => {
        return `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" >Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      })
  }

// Calcul prix total et nombre article dans le panier
function CalculTotalQuantityPrice() {
 // console.log("CalculTotalQuantityPrice");
  if (cart === null || cart == 0) {
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
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
    document.querySelector("#totalPrice").innerHTML = total_price;
    document.querySelector("#totalQuantity").innerHTML = total_quantity;
  }
}


// Suppresion d'article au click
function listenDeleteEvents() {
  let btn_delete = document.querySelectorAll(".cart__item .deleteItem"); // Recuperation de tout les boutons du DOM
//  console.log(btn_delete);
  for (let i = 0; i < btn_delete.length; i++) { // Ecoute de chaque bouton
    btn_delete[i].addEventListener("click", function() {
      let articleToRemove = btn_delete[i].closest("article"); // Return le DOM de l'article à supprimer
//      console.log(articleToRemove);
      articleToRemove.remove(); // supprime article du DOM
      let articleToRemove_id = articleToRemove.getAttribute("data-id"); // On récupere ID et color à supprimer pour faire une recherche dans local storage
      let articleToRemove_color = articleToRemove.getAttribute("data-color");
      for (let j = 0; j < api_products.length; j++) {
        if (articleToRemove_id == api_products[j]._id && articleToRemove_color == api_products[j].color){
//          console.log(cart);
          cart = cart.filter(element => element._id !== api_products[j]._id && element.color !== api_products[j].color);// supprime le produit 
//          console.log(cart);
        }
//        console.log(localStorage.getItem("product_panier", JSON.stringify(cart)));
        localStorage.setItem("product_panier", JSON.stringify(cart));
        CalculTotalQuantityPrice(); // On recalcul la quantité et le prix totaux 
//        console.log(localStorage.getItem("product_panier", JSON.stringify(cart)));
      }
    });
  }
}


// Modification quantité produit
function listenQuantityEvents() {
  let input_Quantity = document.querySelectorAll(".cart__item .itemQuantity");
  console.log(input_Quantity);
  for (let i = 0; i < input_Quantity.length; i++) {
    input_Quantity[i].addEventListener("change", function(event) {
      let QuantityToModify = input_Quantity[i].closest("article"); // Return le DOM de l'article à modifier
      console.log(QuantityToModify);
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


// Fonction passer commande
// Récupérer et analyser les données saisies par l’utilisateur dans le formulaire
// Afficher un message d’erreur si besoin (par exemple lorsqu’un utilisateur renseigne “bonjour” dans le champ “e-mail”)
// Constituer un objet contact (à partir des données du formulaire) et un tableau de produits
document.querySelector("#order").addEventListener("click", (event) => {
  event.preventDefault();
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  console.log(contact);
  let product_cmd =[];
  for (let i = 0; i < cart.length; i++) { // recupere uniquement ID, doit on push x fois id en fonction du nombre de produit panier ??
    product_cmd.push(cart[i].id);
  }
  console.log(cart);
  console.log(product_cmd);
  // function test contact data + message erreur 

  // function POST API + confirmation id
});