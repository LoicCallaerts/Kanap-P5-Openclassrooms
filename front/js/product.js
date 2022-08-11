const params = new URL(document.location).searchParams;
const id = params.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((resultat) => resultat.json())
  .then((Display) => displayOneProduct(Display))
  .catch((error) => console.log(error));

function displayOneProduct(item) {
  const section = document.getElementsByClassName("item");
  console.log(section[0]);
  let idColor;
  let btnPanier;
  let quantity;

  section[0].innerHTML = `<article>
            <div class="item__img">
            <img src= ${item.imageUrl} alt="Photographie d'un canapé">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title"> ${item.name} </h1>
                <p>Prix : <span id="price"> ${item.price} </span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description"> ${item.description} </p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>
                      ${item.colors.map(function (color) {
                        return `<option value=${color}>
                              ${color}
                           </option>`;
                      })}
                  </select>
                  </div>

                  <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                  </div>
                </div>
  
                <div class="item__content__addButton">
                  <button id="addToCart">Ajouter au panier</button>
                </div>
  
              </div>
            </article>
          </section>`;
  idColor = document.getElementById("colors");

  btnPanier = document.getElementById("addToCart");

  quantity = document.getElementById("quantity");

  btnPanier.addEventListener("click", (event) => {
    event.preventDefault();

    if (idColor.value === "") {
      console.log("No color selected")
      return
     }

    let previousPanier = window.localStorage.getItem("panier");

    let panier = [];

    if (previousPanier) {
      panier = JSON.parse(previousPanier);
      // console.log("previous", panier);
    }

    let optionProduit = {
      idProduit: item._id,
      colors: idColor.value,
      numb: quantity.value,
    };

    // panier = [...panier, optionProduit];

    let index = 0;
    let add = false;
    let diffColor = false;
    let insertion = 0;

    panier.forEach((commande) => {
      if (optionProduit.idProduit === commande.idProduit) {
        if (optionProduit.colors === commande.colors) {
          add = true;
          diffColor = false;
          commande.numb =
            parseInt(commande.numb) + parseInt(optionProduit.numb);
        } else {
          diffColor = true;
          insertion = index;
        }
      }
      index++;
    });

    if (!add) {
      if (diffColor) {
        panier.splice(insertion +1 , 0, optionProduit);
      } else {
        panier.push(optionProduit);
      }
    }

    window.localStorage.setItem("panier", JSON.stringify(panier));
  });
}
