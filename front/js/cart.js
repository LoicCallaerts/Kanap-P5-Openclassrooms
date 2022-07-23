let objectInCart = localStorage.getItem("panier");
console.log(objectInCart);

function displayCart(kanaps) {
  const section = document.getElementById("cart__items");

  console.log(kanaps);

/*  function  retrievePrice(id) {


        fetch(http://localhost:3000/api/products/${id})
        .then(resultat => resultat.json())
        .then(resultat => price = resultat.price)
        .catch(error=> console.log(error))

    } */

  JSON.parse(kanaps).map((item) => {
    section.innerHTML += `<article class="cart__item" data-id=${item.id} data-color=${item.colors}">
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  });

  let image = document.getElementsByClassName("cart__item__img")
  console.log(image)
  image.innerHTML = `<img src=  alt="Photographie d'un canapé">`

}

displayCart(objectInCart);
