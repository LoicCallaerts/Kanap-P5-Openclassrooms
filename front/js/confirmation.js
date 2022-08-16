// Récuperation de l'ID unique de la commande dans le local storage
const id = window.localStorage.getItem("orderId")
localStorage.clear()
// Ajoute de l'ID directement dans le HTML
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;
