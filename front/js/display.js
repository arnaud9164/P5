const Url_Api ="http://localhost:3000/api/products/";

/**
   * Récuperation des data du produit via son ID (fetch api)
   * Appel fonction displayDom
   * @param { String } Url_Api
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
            case 'cart':
                console.log(`code to do`);
               
                break;
            default:
                console.log(`Sorry, we are out of Product.`);       
        }
    }catch(err) {
      console.error(err);
    }
  }

  /**
 * Affichage des produits
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