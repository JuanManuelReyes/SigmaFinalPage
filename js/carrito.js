//Toma de Elementos
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const fragment = document.createDocumentFragment();

let carrito = {};

//Event Listener DOM
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
  }
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  btnCant(e);
});

//Toma de datos del Api
const fetchData = async () => {
  try {
    const res = await fetch("../json/api.json");
    const data = await res.json();
    mostrarCards(data);
  } catch (error) {
    console.log(error);
  }
};

//Funcion para mostrar las Cards (Productos)
const mostrarCards = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.title;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard
      .querySelector("img")
      .setAttribute("src", producto.thumbnailUrl);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

//Funcion para establecer el carrito
const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
  confirmarAgregacion();
};

//Funcion para setear el carrito
const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    title: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  mostrarCarrito();
};

//Funcion para Mostrar el Carrito
const mostrarCarrito = () => {
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  mostrarTabla();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Funcion para mostrar tabla del Carrito
const mostrarTabla = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Su Carrito est?? Vac??o - Comienza a Comprar!</th>`;

    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    mostrarCarrito();
    confirmarVaciar();
  });
};

//Funcion para agregar o quitar items al carrito
const btnCant = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    mostrarCarrito();
    confirmarAgregacion();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad == 0) {
      delete carrito[e.target.dataset.id];
    }
    mostrarCarrito();
  }

  e.stopPropagation;
};

//Funcion para alertar al sumar Items a tu carrito
function confirmarAgregacion() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });

  Toast.fire({
    icon: "success",
    title: "??Su producto fue agregado Correctamente!",
  });
}

//Funcion para alertar al vaciar todo el carrito
function confirmarVaciar() {
  Swal.fire({
    icon: "error",
    title: "Que Pena :(",
    text: "Tu carrito de Compras se ha vaciado Correctamente...",
    footer: "??Esperamos poder ayudarte la Proxima!",
  });
}

