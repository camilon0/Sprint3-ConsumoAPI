const containerItems = document.getElementById("items");
const urlApi = "http://localhost:3000/apartments";

let apartments = [];

const printCards = (apartments) => {
  //containerItems.innerHTML = "";
  apartments.forEach((item) => {
    containerItems.innerHTML += `
        <article class="card">
                    <figure>
                        <img src="${item.image}" alt="propiedad" class="card__image">
                    </figure>
                    <div class="card__description">
                        <div class="description__name">
                            <p>Nombre:</p>
                            <p>Ubicacion:</p>
                            <p>Precio:</p>
                            <p>Area:</p>                            
                        </div>
                        <div class="description__details">
                            <p>${item.nombre}</p>
                            <p>${item.ubicacion}</p>
                            <p>${item.precioVenta}</p>
                            <p>${item.area}</p>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-fav" name="${item.id}" id="fav${item.id}">Favoritos</button>
                        <button class="btn btn-show" name="${item.id}">Ver</button>
                    </div>
        </article>
        `;

    //containerItems.appendChild(article);
  });
};

const myFavorites = JSON.parse(localStorage.getItem("favorite")) || [];

console.log(myFavorites);

const main = document.getElementById("main");

document.addEventListener("DOMContentLoaded", () => {
  if (myFavorites !== []) {
    printCards(myFavorites, main);
  }

  if (myFavorites === []) {
    const h5 = document.createElement("h5");
    h5.innerText = "Usted no tiene favoritos guardados";
    main.appendChild(h5);
  }
});
