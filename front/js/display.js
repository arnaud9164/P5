export const Url_Api ="http://localhost:3000/api/products/";

/**
 * Récuperation des data du produit via son ID (fetch api)
 * Appel fonction displayDom
 * @param { String } Url_Api
 * @param { String } page: type de page à afficher ("all","single")
 */
export default async function displayProductApi(UrlApi, page){
    try{
        let productApi = null;
        await fetch(Url_Api + UrlApi)  
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => (productApi = data));
        switch (page){
            case 'all':
                displayAll(productApi);
                break;
            case 'single':
                displaySingle(productApi);
                break;
            default:
                console.log(`Sorry, we are out of Product.`);       
        }
    }catch(err) {
        console.error(err);
    }
}

/**
 * Affichage de tout les produits
 * Boucle x items - créations des elements à afficher
 * @param { Object[] } product
 * @param { String } product[]._id
 * @param { String } product[].imageUrl
 * @param { String } product[].altTxt
 * @param { String } product[].name
 * @param { String } product[].description
 */
function displayAll(product){
    const items_container = document.getElementById("items");
    for (let i = 0; i < product.length; i++) { 
        let newItem = document.createElement("a");
        newItem.href="./product.html?_id=" + product[i]._id;
            
        let newArticle = document.createElement("article");
            
        let newImg = document.createElement("img");
        newImg.src = product[i].imageUrl;
        newImg.alt = product[i].altTxt;
        newArticle.appendChild(newImg);
            
        let newTitle = document.createElement("h3");
        newTitle.className ="productName";
        let content = document.createTextNode(product[i].name);
        newTitle.appendChild(content);
        newArticle.appendChild(newTitle);

        let newDescription = document.createElement("p");
        newDescription.className ="productDescription";
        let contentDescription = document.createTextNode(product[i].description);
        newDescription.appendChild(contentDescription);
        newArticle.appendChild(newDescription);
            
        newItem.appendChild(newArticle);
        items_container.appendChild(newItem);
    }
}

/**
 * Affichage d'un produit
 * créations des elements à afficher - Boucle x colors
 * @param { Object } product
 * @param { String } product.imageUrl
 * @param { String } product.altTxt
 * @param { String } product.name
 * @param { String } product.description
 * @param { String } product.price
 * @param { String } product.colors[]
 */
function displaySingle(product){
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
 * Affichage des produit du panier
 * @param { Object } productToDisplay
 * @param { String } productToDisplay.imageUrl
 * @param { String } productToDisplay.altTxt
 * @param { String } productToDisplay.name
 * @param { String } productToDisplay.colors
 * @param { String } productToDisplay.price
 * @param { String } productToDisplay.quantity
 */
export function displayProductCart(productToDisplay) {
    const cart_items = document.querySelector("#cart__items");
    for (let i = 0; i < productToDisplay.length; i++) { 
        console.log(productToDisplay[i]);
        let newArticle = document.createElement("article");
        newArticle.className = "cart__item";
        newArticle.dataset.id = productToDisplay[i].id;
        newArticle.dataset.color = productToDisplay[i].color;
        cart_items.appendChild(newArticle);

        let imgContainer = document.createElement("div");
        imgContainer.className = "cart__item__img";
        newArticle.appendChild(imgContainer);
        let newImg = document.createElement("img");
        newImg.src = productToDisplay[i].imageUrl;
        newImg.alt = productToDisplay[i].altTxt;
        imgContainer.appendChild(newImg);

        let contentContainer = document.createElement("div");
        contentContainer.className = "cart__item__content";
        newArticle.appendChild(contentContainer);
        let descriptionContainer = document.createElement("div");
        descriptionContainer.className = "cart__item__content__description";
        contentContainer.appendChild(descriptionContainer);
        let newName = document.createElement("h2");
        let nameContent = document.createTextNode(productToDisplay[i].name);
        newName.appendChild(nameContent);
        descriptionContainer.appendChild(newName);
        let newColor = document.createElement("p");
        let colorContent = document.createTextNode(productToDisplay[i].color);
        newColor.appendChild(colorContent);
        descriptionContainer.appendChild(newColor);

        let newPrice = document.createElement("p");
        newPrice.className = "itemPrice";
        let priceContent = document.createTextNode(productToDisplay[i].price + " €");
        newPrice.appendChild(priceContent);
        descriptionContainer.appendChild(newPrice);

        let settingContainer = document.createElement("div");
        settingContainer.className = "cart__item__content__settings";
        contentContainer.appendChild(settingContainer);
        let settingQty = document.createElement("div");
        settingQty.className = "cart__item__content__settings__quantity";
        settingContainer.appendChild(settingQty);
        let newQtyLabel = document.createElement("p");
        let QtyLabelContent = document.createTextNode("Qté : ");
        newQtyLabel.appendChild(QtyLabelContent);
        settingQty.appendChild(newQtyLabel);
        let newQtyInput = document.createElement("input")
        newQtyInput.type = "number";
        newQtyInput.className = "itemQuantity";
        newQtyInput.name = "itemQuantity";
        newQtyInput.min = "1";
        newQtyInput.max = "100";
        newQtyInput.value = productToDisplay[i].quantity;
        settingQty.appendChild(newQtyInput);

        let settingDelete = document.createElement("div");
        settingDelete.className = "cart__item__content__settings__delete";
        settingContainer.appendChild(settingDelete);
        let newDeleteBtn = document.createElement("p");
        newDeleteBtn.className = "deleteItem";
        let DeleteBtnContent = document.createTextNode("Supprimer");
        newDeleteBtn.appendChild(DeleteBtnContent);
        settingDelete.appendChild(newDeleteBtn); 
    }
}