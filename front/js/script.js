const Url_Api ="http://localhost:3000/api/products";

// Récuperation des data API
fetch(Url_Api)  
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then((product) => {
        //console.log(product);
        displayProducts(product);  // Appel de la fonction Display
    })
    .catch(function(err) {
    // Une erreur est survenue
  });

// Création items: Boucle x items et intégration des data API
function displayProducts(product){
    // Définition de l'accès au DOM
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
