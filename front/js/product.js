const Url_Api ="http://localhost:3000/api/products/";

// Récuperation id produit dans URL
let product_id = new URLSearchParams(window.location.search).get("_id");

/**
 * Affichage du produit
 * créations des elements à afficher - Boucle x colors
 * @param { Object } product
 * @param { String } product.imageUrl
 * @param { String } product.altTxt
 * @param { String } product.name
 * @param { String } product.description
 * @param { String } product.price
 * @param { String } product.colors[]
 */
function displayProducts(product){
  const img_container = document.querySelector(".item__img");
  let newImg = document.createElement("img");
  newImg.src = product.imageUrl;
  newImg.alt = product.altTxt;
  img_container.appendChild(newImg);
        
  document.querySelector("title").innerText =  `KANAP - ${product.name}`;
  document.querySelector("#title").innerText = `${product.name}`;
  document.querySelector("#price").innerText = `${product.price}`;
  document.querySelector("#description").innerText = `${product.description}`;
  
  for (let i = 0; i < product.colors.length; i++) {
    const color_container = document.querySelector("#colors");
    let newColor = document.createElement("option");
    newColor.value = product.colors[i];
    let colorDescription = document.createTextNode(product.colors[i]);
    newColor.appendChild(colorDescription);
    color_container.appendChild(newColor);
  }
}

/**
 * Produit à ajouter au panier
 * @param { String } id
 * @param { String } color
 * @param { number } quantity
 * @method listenColorsEvent() - Modify color on event
 * @method listenQuantityEvent() - Modify quantity on event
 * @method verifyInput() - Verify color and quantity imput
 * @method addCard() - Push product on cart (local storage)
 */
class productcart {
  constructor(id, color, quantity) {
      this.id = id;
      this.color = color;
      this.quantity = quantity;
  }
  // Récupere la couleur quand elle change
  listenColorsEvent(){document.querySelector("#colors").addEventListener("change", (event) => {
                      this.color = event.target.value;});
  }
  // Récupere la quantité quand elle change
  listenQuantityEvent(){document.querySelector("#quantity").addEventListener("change", (event) => {
                        this.quantity = parseInt(event.target.value);});
  }
  // Vérifie les input Quantity et color
  verifyInput(){if((this.color == "") && (this.quantity < 1 || this.quantity > 100)){
                  console.log("Veuillez choisir une couleur et une quantité");
                  return false;
                } else if (this.color == "") {
                  console.log("Veuillez choisir une couleur");
                  return false;
                } else if (this.quantity < 1 || this.quantity > 100) {
                  console.log("Veuillez choisir une quantité de produit compris entre 1 et 100");
                  return false;
                } else {
                  return true;
                }
  }
  // Ajoute le produit dans le panier local storage
  addCard() {let card = JSON.parse(localStorage.getItem("product_panier"));
            if (card == null) {
                card = [];
                card.push(this);
                localStorage.setItem("product_panier", JSON.stringify(card));
            } else {
                let get_article = card.find((card_product) => this.id == card_product.id && this.color == card_product.color);
                if (get_article) {
                  let nb = Number(this.quantity) + Number(get_article.quantity);
                  if (nb < 100){
                  get_article.quantity = nb;
                  localStorage.setItem("product_panier", JSON.stringify(card));
                  } else {
                    return false
                  }
                } else {
                  card.push(this);
                  localStorage.setItem("product_panier", JSON.stringify(card));
                }
            } return true
  } 
}

// Initialisation de l'object produit à ajouter au panier
let product_panier = new productcart(product_id,"",0);

/**
 * Récuperation des data du produit via son ID (fetch api)
 * Appel des fonction displayProducts et listenEvent 
 * @param { String } Url_Api
 * @param { String } product_id
 */
 fetch(Url_Api + product_id)  
 .then(function(res) {
     if (res.ok) {
     return res.json();
     }
 })
 .then((productApi) => {
     displayProducts(productApi);
     product_panier.listenColorsEvent();
     product_panier.listenQuantityEvent();
 })
 .catch(function(err) {
 console.error(err);
});

/**
 * Click sur le bouton ajouter au panier
 */
document.getElementById("addToCart").addEventListener("click", function() {
    if(product_panier.verifyInput()){
      product_panier.addCard();
        console.log("Produit ajouter");
    }
    console.log(JSON.parse(localStorage.getItem("product_panier")));
});