fetch('http://localhost:3000/api/products/:id')
.then(resultat => resultat.json())
.then(Display => displayOneProduct(Display))
.catch(error=> console.log(error))

function displayOneProduct(Kanaps){
    const section = document.getElementById("item")
    section.innerHTML = 
    ` <article>
            <div class="item__img">
            <img src= ${item.imageUrl} alt="Photographie d'un canapé">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title"> ${item.name} </h1>
                <p>Prix : <span id="price"> $(item.price) </span>€</p>
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
                    <option value= ${item.colors[0]}
                  </select>`
}