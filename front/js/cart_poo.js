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
}