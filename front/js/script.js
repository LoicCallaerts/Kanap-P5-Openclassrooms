fetch('http://localhost:3000/api/products/')
.then(resultat => resultat.json())
.then(Display => displayKanap(Display))
.catch(error=> console.log(error))

function displayKanap(kanaps){
    const section = document.getElementById("items")
    kanaps.forEach(items => {
    section.innerHTML +=
    `<a href="./product.html?id=${items._id}">
    <article>
      <img src = ${items.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3>  ${items.name}</h3>
      <p> ${items.description}</p>
    </article>
  </a>`
});
}
