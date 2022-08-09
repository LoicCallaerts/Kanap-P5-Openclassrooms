let totalQuantity = 0;
let totalPrice = 0;

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
  let quantity = 0
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
          <input type="number" class="itemQuantity" name="itemQuantity" onchange="change" min="1" max="100" value=${item.numb}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="supprimer(${index})">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

    totalQuantity += parseInt(item.numb);
    totalPrice += parseInt(item.numb) * data.price;
    quantity++
    index++;
  });
  majTotaux(totalQuantity, totalPrice);
}
function majTotaux(quantity, price) {
  document.getElementById("totalQuantity").textContent = quantity;
  document.getElementById("totalPrice").textContent = price;
}

function supprimer(index) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  kanaps.splice(index, 1)
  localStorage.setItem("panier", JSON.stringify(kanaps))
  location.reload()
}

function change(){
  let changer = JSON.parse(localStorage.getItem("panier"))
  console.log(changer)
}
const quantityModifier = () => {
  let quantityChanger = document.querySelectorAll(".itemQuantity");
  for (let q = 0; 1 < quantityChanger.length; q++) {
    let quantityInputeValue = quantityChanger[l].valueAsNumber;
    kanaps.addQuantity = quantityInputeValue;
    productsNumbAndPrice();
    localStorage.setItem("panier", JSON.stringify(kanaps));
  }
};
quantityModifier();

