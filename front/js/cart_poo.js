/**
 * Panier
 * @method addCard() - Push product on cart (local storage)
 */
export default class Cart {
    cart = [];
    constructor(){
        let LocalCart = JSON.parse(localStorage.getItem("product_panier"));
        if (LocalCart != null) {
            this.cart = LocalCart;
        }
    }
    addCart(ProductToAdd){ // fonction a debugger- pb d'ajout multiple même produit
        if (this.cart.length == 0) {
            this.cart.push(ProductToAdd);
        } else {
            let getProduct = false;
            for (let i = 0; i < this.cart.length; i++) {
                if ((ProductToAdd.id == this.cart[i].id) && (ProductToAdd.color == this.cart[i].color)){
                    getProduct = true;
                    let newQty = Number(ProductToAdd.quantity) + Number(this.cart[i].quantity);
                    if (newQty < 100){
                        this.cart[i].quantity = newQty;
                    } else {
                        this.cart[i].quantity = 100;
                    }
                }
            }
                if (!getProduct){
                    this.cart.push(ProductToAdd);
                }   
        } 
        localStorage.setItem("product_panier", JSON.stringify(this.cart));
        return true
    } 
    // Calcul prix total et nombre article dans le panier
    CalculTotalQuantityPrice() {
        if (this.cart == null || this.cart == 0) {
        document.querySelector("#totalQuantity").innerText = "0";
        document.querySelector("#totalPrice").innerText = "0";
        document.querySelector("h1").innerText = "Vous n'avez pas d'article dans votre panier";
        }
        else {
        let total_quantity = 0;
        let total_price = 0;
        for (let i = 0; i < this.cart.length; i++) {
            total_quantity += Number(this.cart[i].quantity);
            total_price += Number(this.cart[i].quantity) * Number(this.cart[i].price);
        }
        document.querySelector("#totalPrice").innerText = total_price;
        document.querySelector("#totalQuantity").innerText = total_quantity;
        }
    }
    // Modification quantité produit
    listenQuantityEvents() {
        let input_Quantity = document.querySelectorAll(".cart__item .itemQuantity");
        for (let i = 0; i < input_Quantity.length; i++) {
            input_Quantity[i].addEventListener("change", (event) => {
                let QuantityToModify = input_Quantity[i].closest("article"); // Return le DOM de l'article à modifier
                let QuantityToModify_id = QuantityToModify.getAttribute("data-id");
                let QuantityToModify_color = QuantityToModify.getAttribute("data-color");
                console.log(this.cart);
                for (let j = 0; j < this.cart.length; j++) {
                    if(this.cart[i].color === QuantityToModify_color && this.cart[i].id === QuantityToModify_id){
                        if(event.target.value < 1){
                            event.target.value = 1;
                            this.cart[i].quantity = 1;
                        } else if(event.target.value > 100){
                            event.target.value = 100;
                            this.cart[i].quantity = 100;
                        }else{
                            this.cart[i].quantity = parseInt(event.target.value);
                        }
                    localStorage.setItem("product_panier", JSON.stringify(this.cart));
                    this.CalculTotalQuantityPrice(); // On recalcul la quantité et le prix totaux 
                    }
                }
            });
        }
    }
    // Suppresion d'article au click
    listenDeleteEvents() {
        let btn_delete = document.querySelectorAll(".cart__item .deleteItem"); // Recuperation de tout les boutons du DOM
        for (let i = 0; i < btn_delete.length; i++) { // Ecoute de chaque bouton
            btn_delete[i].addEventListener("click", () => {
                let articleToRemove = btn_delete[i].closest("article"); // Return le DOM de l'article à supprimer
                articleToRemove.remove(); // supprime article du DOM
                this.cart.splice(i, 1); // supprime article de cart
                localStorage.setItem("product_panier", JSON.stringify(this.cart));
                this.CalculTotalQuantityPrice(); // On recalcul la quantité et le prix totaux 
            });
        }
    }
}