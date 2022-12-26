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
        if (this.cart == null) {
        this.cart.push(ProductToAdd);
        } else {
            let get_article = this.cart.find((cart_product) => ProductToAdd.id == cart_product.id && ProductToAdd.color == cart_product.color);
            if (get_article) {
                let nb = Number(ProductToAdd.quantity) + Number(get_article.quantity);
                if (nb < 100){
                    get_article.quantity = nb;
                } else {
                    return false
                }
            } else {
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
            //let current_index = api_products.findIndex((product) => {
            //return product._id == cart[i].id;
            //});
            total_quantity += this.cart[i].quantity;
            //total_price += cart[i].quantity * api_products[current_index].price;
        }
        //document.querySelector("#totalPrice").innerText = total_price;
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