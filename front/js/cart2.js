let objectInCart = localStorage.getItem("panier")

var recupProduct = functionFetch() 
async function functionFetch() {
    var min = await fetch("http://localhost:3000/api/products/")
    .then(res => { return res.json() })
    .catch(err => { throw err });
    console.log(min)
    return min
    }

console.log(recupProduct)


function displayCart(kanaps){

    const section = document.getElementById("cart__items")
    JSON.parse(kanaps).map(item => {
      var data = 0
        recupProduct.forEach(element => {
          if(element._id == item.id){
          data = element
          }
          
        });

    section.innerHTML +=
    `<article class="cart__item" data-id="${item.id}" data-color="${item.colors}">
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
});
}

displayCart(objectInCart)

