import displayProductApi from './display.js';
import Cart from "./cart_poo.js";
import Product from "./product_poo.js";

// Récuperation id produit dans URL
let product_id = new URLSearchParams(window.location.search).get("_id");

// Récuperation données API et affichage du produit
displayProductApi(product_id, "single");

// Initialisation de l'object produit à ajouter au panier
let product = new Product(product_id,"",0);
product.listenColorsEvent();
product.listenQuantityEvent();

// Initialisation de l'object panier
let cartLocal = new Cart();

// Click sur le bouton ajouter au panier
document.getElementById("addToCart").addEventListener("click", function() {
    if(product.verifyInput()){
        cartLocal.addCart(product);
        console.log("Produit ajouter");
    }
});