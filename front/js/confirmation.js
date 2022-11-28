// Récuperation de l'ID order dans URL
let order_id = new URLSearchParams(window.location.search).get("id");
// Affichage ID order
document.getElementById("orderId").textContent = order_id;