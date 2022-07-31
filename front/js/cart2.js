functionFetch();
function functionFetch() {
  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.numb}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  });
}
