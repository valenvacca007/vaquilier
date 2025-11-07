const API_URL = "/api/products";
const contenedor = document.getElementById("productos");

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();

  contenedor.innerHTML = productos.map(p => `
    <div class="producto">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>$${p.precio}</strong></p>
      <button onclick="agregarAlCarrito('${p._id}', '${p.nombre}', ${p.precio})">Agregar</button>
    </div>
  `).join("");
}

function agregarAlCarrito(id, nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const item = carrito.find(p => p.id === id);

  if (item) item.cantidad++;
  else carrito.push({ id, nombre, precio, cantidad: 1 });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito 🛒");
}

cargarProductos();
