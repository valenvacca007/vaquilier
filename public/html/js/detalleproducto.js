// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Elemento donde se mostrará el producto
const contenedor = document.getElementById("productoDetalle");

// Función para obtener el producto desde la API
async function cargarProducto() {
  try {
    const res = await fetch(`http://localhost:3000/api/productos/${productId}`);
    const producto = await res.json();

    contenedor.innerHTML = `
      <div class="detalle-container">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
          <h1>${producto.nombre}</h1>
          <p class="precio">$${producto.precio}</p>
          <p class="descripcion">${producto.descripcion}</p>
          <button id="btnAgregar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
        </div>
      </div>
    `;

    // Agregar funcionalidad al botón
    document.getElementById("btnAgregar").addEventListener("click", () => {
      agregarItem(producto.nombre, producto.precio);
      alert("Producto agregado al carrito!");
    });

  } catch (error) {
    contenedor.innerHTML = "<p>No se pudo cargar el producto.</p>";
    console.error(error);
  }
}

cargarProducto();

// ===== Función carrito (copiada de tu carrito.js) =====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarItem(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
