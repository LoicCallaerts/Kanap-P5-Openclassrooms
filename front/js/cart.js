async function main() {
  var mm = null
  var min = await fetch("http://localhost:3000/api/products/")
  .then(res => { return res.json() })
        .catch(err => { throw err });

    console.log(min)

    if (localStorage.getItem("panier") == undefined) {
        localStorage.setItem("panier", JSON.stringify({}));
    }
}

function displayCart(kanapes) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  const section = document.getElementById("cart__items");

  kanaps.forEach((item) => {
    var kanap = ""
    kanapes.forEach(element => {
      if (element["_id"] == item.id){
        kanap = element
      }
    });
    console.log(kanapes)
    section.innerHTML += `<article class="cart__item" data-id=${item.id} data-color=${item.colors}">
    <div class="cart__item__img">
    <img src= ${kanap.imageUrl} alt= ${kanap.altTxt} >
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${kanap.name}</h2>
      <p> ${item.colors}</p>
      <p> ${kanap.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= ${item.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
  });

}
