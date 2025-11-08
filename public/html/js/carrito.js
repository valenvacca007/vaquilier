// ===== CARGAR CARRITO =====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===== RENDER PRINCIPAL =====
function renderCarrito() {
  const tbody = document.getElementById("carritoItems");
  const totalSpan = document.getElementById("totalCarrito");
  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio}</td>
      <td><input type="number" min="1" value="${item.cantidad}" data-index="${index}"></td>
      <td>$${subtotal}</td>
      <td><button class="btnEliminar" data-index="${index}">X</button></td>
    `;
    tbody.appendChild(fila);
  });

  totalSpan.textContent = total;
  guardarCarrito();
}

// ===== AGREGAR PRODUCTO =====
function agregarItem(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  renderCarrito();
  actualizarMiniCarrito();
}

// ===== ELIMINAR / EDITAR CANTIDADES =====
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnEliminar")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    renderCarrito();
    actualizarMiniCarrito();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.type === "number") {
    const index = e.target.dataset.index;
    carrito[index].cantidad = parseInt(e.target.value);
    renderCarrito();
    actualizarMiniCarrito();
  }
});

// ===== MINI CARRITO =====
function actualizarMiniCarrito() {
  const lista = document.getElementById("miniListaCarrito");
  const miniTotal = document.getElementById("miniTotal");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  miniTotal.textContent = total;
  document.getElementById("miniCarrito").style.display = carrito.length ? "block" : "none";
}

// ===== BOTONES AGREGAR PRODUCTO =====
document.querySelectorAll(".btnAgregar").forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    agregarItem(nombre, precio);
  });
});

// ===== FINALIZAR COMPRA =====
document.getElementById("btnFinalizar")?.addEventListener("click", async () => {
  if (carrito.length === 0) return alert("Tu carrito está vacío 💫");

  const nombre = prompt("Tu nombre:");
  const email = prompt("Tu correo:");
  if (!nombre || !email) return alert("Debes ingresar nombre y email");

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const data = { nombre, email, items: carrito, total };

  try {
    const res = await fetch("http://localhost:3000/api/pedidos/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Compra enviada 💌 En breve recibirás un correo✨");
      carrito = [];
      renderCarrito();
      actualizarMiniCarrito();
      guardarCarrito();
    } else {
      alert("Ocurrió un error al enviar el pedido 😢");
    }
  } catch (err) {
    console.error(err);
    alert("Ocurrió un error al enviar el pedido 😢");
  }
});

// ===== INICIO =====
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
  actualizarMiniCarrito();
});
