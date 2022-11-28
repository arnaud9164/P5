const Url_Api ="http://localhost:3000/api/products";

/**
 * Récuperation des data using fetch api
 * Appel de la fonction displayProducts
 * @param { String } Url_Api
 */
fetch(Url_Api)  
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then((productApi) => {
        displayProducts(productApi);  
    })
    .catch(function(err) {
    console.error(err);
  });

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
 
function displayProducts(product){
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