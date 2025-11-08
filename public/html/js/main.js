// main.js
console.log("main.js cargado");

// ============================
// Mostrar/Ocultar mini carrito
// ============================
const iconoCarrito = document.getElementById("iconoCarrito");
if (iconoCarrito) {
  iconoCarrito.addEventListener("click", () => {
    const mini = document.getElementById("miniCarrito");
    if (mini) {
      mini.style.display = mini.style.display === "block" ? "none" : "block";
    }
  });
}

// ============================
// Formulario de contacto
// ============================
const formContacto = document.getElementById("formContacto");
if (formContacto) {
  formContacto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreContacto")?.value || "";
    const email = document.getElementById("emailContacto")?.value || "";
    const mensaje = document.getElementById("mensajeContacto")?.value || "";

    if (!nombre || !email || !mensaje) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      // Enviar datos al backend real (ejemplo)
      const res = await fetch("http://localhost:3000/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje })
      });

      if (res.ok) {
        alert("Mensaje enviado correctamente 💌");
        formContacto.reset();
      } else {
        alert("Ocurrió un error 😢");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error 😢");
    }
  });
}

// ============================
// Cargar productos desde backend
// ============================
async function cargarProductos() {
  try {
    const res = await fetch("http://localhost:3000/api/productos");
    if (!res.ok) throw new Error("Error al cargar productos");
    const productos = await res.json();
    mostrarProductos(productos);
  } catch (err) {
    console.error(err);
  }
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button class="btnAgregar" data-nombre="${prod.nombre}" data-precio="${prod.precio}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// ============================
// Inicialización al cargar la página
// ============================
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  console.log("Página lista y main.js inicializado");
});
fetch("http://localhost:3000/api/pedidos/email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data) // { nombre, email, items, total }
});
