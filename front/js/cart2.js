let objectInCart = localStorage.getItem("panier");
console.log(objectInCart);

fetch('http://localhost:3000/api/products/')
.then(resultat => resultat.json())
.then(Display => displayCart(Display))
.catch(error=> console.log(error))

function displayCart(kanaps) {
    const section = document.getElementById("cart__items"); }