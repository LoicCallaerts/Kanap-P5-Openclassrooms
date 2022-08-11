let totalQuantity = 0;
let totalPrice = 0;
let previousPanier = window.localStorage.getItem("panier")

functionFetch();
function functionFetch() {
  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
      majTotaux(totalQuantity, totalPrice);
      displayCart(data);
    })
    .catch((err) => {
      throw err;
    });
}

function displayCart(recupProduct) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  console.log(recupProduct);
  const section = document.getElementById("cart__items");
  let index = 0;
  kanaps.forEach((item) => {
    var data = 0;
    recupProduct.forEach((element) => {
      if (element._id == item.idProduit) {
        data = element;
      }
    });
    section.innerHTML += `<article class="cart__item" data-id="${item.idProduit}" data-color="${item.colors}">
    <div class="cart__item__img">
      <img src=${data.imageUrl} alt=${data.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${item.colors}</p>
        <p> </p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" onchange="change(this.value, ${index})" min="1" max="100" value=${item.numb}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="supprimer(${index})">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
    value = parseInt(item.numb);
    totalQuantity += parseInt(item.numb);
    totalPrice += parseInt(item.numb) * data.price;
    index++;
  });
  majTotaux(totalQuantity, totalPrice);
}
function majTotaux(quantity, price) {
  document.getElementById("totalQuantity").textContent = quantity;
  document.getElementById("totalPrice").textContent = price;
}

function change(value, index) {

  if(previousPanier){

    let panier = JSON.parse(previousPanier)

    panier.splice(index, 1, {
      idProduit: panier[index].idProduit,
      colors: panier[index].colors,
      numb: value
    })

    localStorage.setItem("panier", JSON.stringify(panier))
    console.log(panier)
  }
}

function supprimer(index) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  kanaps.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(kanaps));
  location.reload();
}