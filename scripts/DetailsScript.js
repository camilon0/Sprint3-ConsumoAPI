const containerItems = document.getElementById("items");
const urlApi = "http://localhost:3000/apartments";

let apartments = [];
//General

const getData = async () => {
  try {
    let response = await fetch(`${urlApi}`);
    let data = await response.json();
    apartments = data;
    printCards();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
getData();

const printCards = (apartments) => {
  containerItems.innerHTML = "";
  apartments.forEach((item) => {
    containerItems.innerHTML += `
        <article class="card">
                    <figure>
                        <img src="${item.image}" alt="propiedad" class="card__image">
                    </figure>
                    <div class="card__description">
                        <div class="description__name">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <div class="description__details">
                            <p>${item.nombre}</p>
                            <p>Ubicacion:${item.ubicacion}</p>
                            <p>Precio de Venta:${item.precioVenta}</p>
                            <p>Area total:${item.area}</p>
                            <p>Numero de habitaciones:${item.habitaciones}</p>
                            <p>Nombre de baños:${item.banios}</p>
                            <p>Contacto:${item.nombrePropietario}</p>
                            <p>${item.contactoPropietario}</p>
                            <p>${item.descripcion}</p>
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
const idVer = JSON.parse(localStorage.getItem("idVer"));

//Capturamos los elementos del HTML
const main = document.getElementById("main");
//Vamos a escuchar al evento DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
  getData(urlApi)
    .then(() => {
      //   let c = apartments;
      //   console.log(c);

      const character = apartments.filter(
        (item) => item.id === parseInt(idVer)
      );
      console.log(character);
      printCards(character);
    })
    .catch((error) => console.log(error));
});
