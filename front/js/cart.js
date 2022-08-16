let totalQuantity = 0;
let totalPrice = 0;

// Recuperation de panierdans le local storage
let previousPanier = window.localStorage.getItem("panier");

// Fonction permetant de récuperer les informations qui ne sont pas contenues dans le local storage en appelent l'API
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
// Fonction qui affichera à la fois les informations du local storage et du fetch directement dans le HTML
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

// fonction qui calculera le prix total des articles du panier
function majTotaux(quantity, price) {
  document.getElementById("totalQuantity").textContent = quantity;
  document.getElementById("totalPrice").textContent = price;
}
// Focntion permetant de pouvoir incrémenter, diminuer ou mettre une nouvelle valeur dans l'input quantité
function change(value, index) {
  if (previousPanier) {
    let panier = JSON.parse(previousPanier);
    if (value > 100) {
      value = 100;
    } else if (value < 1) {
      value = 1;
    }

    panier.splice(index, 1, {
      idProduit: panier[index].idProduit,
      colors: panier[index].colors,
      numb: value,
    });

    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload();
  }
}
// Fonction permettant de supprimer un élément du panier et du local storage
function supprimer(index) {
  let kanaps = JSON.parse(localStorage.getItem("panier"));
  kanaps.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(kanaps));
  location.reload();
}
// Fonction destinée à récuperer les informations du formulaire
function recupForm() {
  let form = document.querySelector(".cart__order__form");
  
  // Mise en place des expression régulière pour géré les caractères autorisés
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Utilisation de la fonction change pour récuperer les inputs
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  form.email.addEventListener("change", function () {
    validEmail(this);
  });
  // Mise en place des tests pour savoir si les élément rentrés dans les input sont correct
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
recupForm();

// Fonction qui renvera les information du formulaire avec les méthode POST
function sendForm() {
  const btnOrder = document.getElementById("order");
  // Récuperation de information (prenom, nom, etc...) au moment du click
  btnOrder.addEventListener("click", (event) => {
    event.preventDefault();
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");
    // Création d'un ID unique au moment du click
    let idProducts = [];
    JSON.parse(previousPanier).forEach((element) => {
      idProducts.push(element.idProduit);
    });
    // Création de l'objet formulaire avec les informations précédement récuperée
    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    };
    // Mise en place de l'objet post qui va stringify l'object order
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    // Fetch qui va renvoyer les information du formulaire à l'API avec la méthode POST + Ajoute de l'ID de l'utilisateur dans le local storage et envois sur la page de confirmation
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
sendForm();
