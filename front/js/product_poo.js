/**
 * Produit
 * @param { String } id
 * @param { String } color
 * @param { number } quantity
 * @method listenColorsEvent() - Modify color on event
 * @method listenQuantityEvent() - Modify quantity on event
 * @method verifyInput() - Verify color and quantity imput
 */
export default class Product {
    constructor(id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;
    }
    // Récupere la couleur quand elle change
    listenColorsEvent(){
        document.querySelector("#colors").addEventListener("change", (event) => {
            this.color = event.target.value;
        });
    }
    // Récupere la quantité quand elle change
    listenQuantityEvent(){
        document.querySelector("#quantity").addEventListener("change", (event) => {
            this.quantity = parseInt(event.target.value);
        });
    }
    // Vérifie les input Quantity et color
    verifyInput(){
        if((this.color == "") && (this.quantity < 1 || this.quantity > 100)){
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
}