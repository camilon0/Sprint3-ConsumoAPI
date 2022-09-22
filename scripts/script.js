const containerItems = document.getElementById("items");
const btnFind = document.getElementById("search");
const selectType = document.getElementById("select1");
const selectLocation = document.getElementById("select2");

const urlApi = "http://localhost:3000/apartments";

let apartments = [];

const getData = async () => {
  try {
    let response = await fetch(`${urlApi}`);
    let data = await response.json();
    apartments = data;
    printCards();
    //console.log(data);
  } catch (error) {
    console.log(error);
  }
};
getData();

const printCards = () => {
  containerItems.innerHTML = "";
  apartments.forEach((item) => {
    containerItems.innerHTML += `
        <article class="card">
                    <figure>
                        <img src="${item.image}" alt="propiedad" class="card__image">
                    </figure>
                    <div class="card__description">
                        <div class="description__name">
                            <p>Tipo:</p>
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
const main = document.getElementById("main");

let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  getData(urlApi)
    .then((apartments) => {
      //console.log(apartments);
      printCards(apartments, main);
    })
    .catch((error) => console.log(error));
});

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btn-show")) {
    localStorage.setItem("idVer", JSON.stringify(target.name));
    window.location.href = "../pages/seeDetails.html";
  }
  if (target.classList.contains("btn-fav")) {
    const confirmarFavorito = confirm(
      `Desea agregar ${target.name} a favoritos?`
    );

    if (confirmarFavorito) {
      getData(urlApi)
        .then(() => {
          const character = apartments.find(
            (item) => item.id === parseInt(target.name)
          );
          favorites.push(character);

          localStorage.setItem("favorite", JSON.stringify(favorites));

          const btnFav = document.getElementById(target.id);

          btnFav.setAttribute("disabled", "");
          console.log(btnFav);
          // addFavorites(character, favorites, target);
        })
        .catch((error) => console.log(error));
    }
  }

  const filterArray = (tp, lc) => {
    let newhouses = apartments.filter(
      (object) => object.nombre.includes(tp) && object.ubicacion.includes(lc)
    );
    apartments = newhouses;
    printCards();
  };

  const handle = () => {
    let infoType = selectType.value;
    //console.log(infoType);
    let infoLocation = selectLocation.value;
    //console.log(infoLocation);
    filterArray(infoType, infoLocation);
  };

  btnFind.addEventListener("click", handle);
});
