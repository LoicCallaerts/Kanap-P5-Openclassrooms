// Appel à l'API pour récuperer TOUT les information de TOUT les canapés

fetch("http://localhost:3000/api/products/")
  .then((resultat) => resultat.json())
  .then((Display) => displayKanap(Display))
  .catch((error) => console.log(error));

// Fonction qui servira à récuperer les différentes informations du fetch et de les injecter directement dans le HTML
function displayKanap(kanaps) {

  const section = document.getElementById("items");

  // Utilisation du forEach pour que l'évenement ai lieu pour tout les 8 éléments
  kanaps.forEach((items) => {
    
    section.innerHTML += `<a href="./product.html?id=${items._id}">
    <article>
      <img src = ${items.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3>  ${items.name}</h3>
      <p> ${items.description}</p>
    </article>
  </a>`;
  });
}
