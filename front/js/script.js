// Définition de l'accès au DOM
//let items_container = document.getElementById("items");   // ERRROR WHY? DOM not loaded => call script at the end of the htlm


// Récuperation des data API
fetch("http://localhost:3000/api/products")  
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then((product) => {
        console.log(product);
        displayProducts(product);  // Appel de la fonction Display
    })
    .catch(function(err) {
    // Une erreur est survenue
  });

// Création items: Boucle x items et intégration des data API
function displayProducts(product){
    for (let i = 0; i < product.length; i++) {
        document.getElementById("items").innerHTML +=`
        <a href="./product.html?_id=${product[i]._id}"> 
        <article>
            <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
            <h3 class="productName">${product[i].name}</h3> 
            <p class="productDescription">${product[i].description}</p>
        </article>
        </a>`;
    }
}
