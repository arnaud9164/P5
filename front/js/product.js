import displayProductApi from './display.js';
import Cart from "./cart_poo.js";
import Product from "./product_poo.js";

// Récuperation id produit dans URL
let productId = new URLSearchParams(window.location.search).get("_id");

// Récuperation données API et affichage du produit
displayProductApi(productId, "single");

// Initialisation de l'object produit à ajouter au panier
let product = new Product(productId,"",0);

// Initialisation de l'object panier
let cartLocal = new Cart();

// Click sur le bouton ajouter au panier
document.getElementById("addToCart").addEventListener("click", function() {
    product.getColor();
    product.getQuantity();
    if(product.verifyInput()){
        cartLocal.addCart(product);
        location.reload();
    }
});