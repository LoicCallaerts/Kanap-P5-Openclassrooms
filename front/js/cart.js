/* async function fetch() {
  var mm = null
  var min = await fetch("http://localhost:3000/api/products/")
        .then(res => { return res.json() })
        .catch(err => { throw err });

    console.log(min)

    if (localStorage.getItem("panier") == undefined) {
        localStorage.setItem("panier", JSON.stringify({}));
    }
}
 */
function displayCart(kanapes) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  const section = document.getElementById("cart__items");

  kanaps.forEach((item) => {
    var kanap = ""
    kanapes.forEach(element => {
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
  return displayCart
}

//Instauration formulaire avec regex
function recupForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function() {
      validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener('change', function() {
      validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener('change', function() {
      validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener('change', function() {
      validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener('change', function() {
      validEmail(this);
  });

  //validation du prénom
  const validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = '';
      } else {
          firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation du nom
  const validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = '';
      } else {
          lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de l'adresse
  const validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = '';
      } else {
          addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de la ville
  const validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = '';
      } else {
          cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de l'email
  const validEmail = function(inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailRegExp.test(inputEmail.value)) {
          emailErrorMsg.innerHTML = '';
      } else {
          emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
      }
  };
  }
recupForm();

//Envoi des informations client au localstorage
function sendForm(){
  const btnOrder = document.getElementById("order");

  //Ecouter le panier
  btnOrder.addEventListener("click", (event)=>{
  
      //Récupération des coordonnées du formulaire client
      let inputName = document.getElementById('firstName');
      let inputLastName = document.getElementById('lastName');
      let inputAdress = document.getElementById('address');
      let inputCity = document.getElementById('city');
      let inputMail = document.getElementById('email');

      //Construction d'un array depuis le local storage
      let idProducts = [];
      for (let i = 0; i<produitLocalStorage.length;i++) {
          idProducts.push(produitLocalStorage[i].idProduit);
      }
      console.log(idProducts);

      const order = {
          contact : {
              firstName: inputName.value,
              lastName: inputLastName.value,
              address: inputAdress.value,
              city: inputCity.value,
              email: inputMail.value,
          },
          products: idProducts,
      } 

      const options = {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
              'Accept': 'application/json', 
              "Content-Type": "application/json" 
          },
      };

      fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);

          document.location.href = "confirmation.html";
      })
      .catch((err) => {
          alert ("Problème avec fetch : " + err.message);
      });
      })
}
sendForm();