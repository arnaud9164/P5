const Url_Api ="http://localhost:3000/api/products/";

// Récuperation id produit
let product_id = new URLSearchParams(window.location.search).get("_id");
console.log(product_id);

// Récuperation des data API
fetch(Url_Api + product_id)  
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then((product) => {
        console.log(product);
        displayProducts(product);
        listenColorsEvent();
        listenQuantityEvent();
        
    })
    .catch(function(err) {
    // Une erreur est survenue
  });

  // Création item: intégration des data API + boucle gestion colors
function displayProducts(product){
    document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector("title").innerText =  `KANAP - ${product.name}`;
        document.querySelector("#title").innerText = `${product.name}`;
        document.querySelector("#price").innerText = `${product.price}`;
        document.querySelector("#description").innerText = `${product.description}`;
        for (let i = 0; i < product.colors.length; i++) {
            document.querySelector("#colors").innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
          }
}

// Initialisation de l'object panier
let product_panier = { 
    id : product_id,
    color : "",
    quantity : 0
  };
 

// Récupere couleur on event change
function listenColorsEvent() {
    document.querySelector("#colors").addEventListener("change", (event) => {
      product_panier.color = event.target.value;
    });
  }
  
  // Récuperer la value de quantité quand elle change
  function listenQuantityEvent() {
    document.querySelector("#quantity").addEventListener("change", (event) => {
      product_panier.quantity = parseInt(event.target.value);
    });
  }

// Vérifier couleur et quantite choisi
function verifyInput(product_panier) {
    if((product_panier.color == "") && (product_panier.quantity < 1 || product_panier.quantity > 100)){
        console.log("Veuillez choisir une couleur et une quantité");
        return false;
    } else if (product_panier.color == "") {
        console.log("Veuillez choisir une couleur");
        return false;
    } else if (product_panier.quantity < 1 || product_panier.quantity > 100) {
        console.log("Veuillez choisir une quantité de produit compris entre 1 et 100");
        return false;
    } else {
        return true;
    }
  }

// Push du produit dans le panier local storage
function addCard(product_panier) {
    let card = JSON.parse(localStorage.getItem("product_panier"));
    if (card == null) {
        card = [];
        card.push(product_panier);
        localStorage.setItem("product_panier", JSON.stringify(card));
    } else {
        let get_article = card.find((card_product) => product_panier.id == card_product.id && product_panier.color == card_product.color);
 //       console.log(get_article);
        if (get_article) {
          let nb = Number(product_panier.quantity) + Number(get_article.quantity);
          if (nb < 100){
          get_article.quantity = nb;
          localStorage.setItem("product_panier", JSON.stringify(card));
          } else {
            return false
          }
        } else {
          card.push(product_panier);
          localStorage.setItem("product_panier", JSON.stringify(card));
        }
    } return true
} 

// Click sur le bouton ajouter au panier
document.getElementById("addToCart").addEventListener("click", function() {
    if(verifyInput(product_panier)){
        addCard(product_panier);
        console.log("Produit ajouter");
    }
    console.log(JSON.parse(localStorage.getItem("product_panier")));
});