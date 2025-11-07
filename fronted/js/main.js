document.querySelectorAll(".btnAgregar").forEach(boton => {
    boton.addEventListener("click", () => {
        let nombre = boton.dataset.nombre;
        let precio = parseInt(boton.dataset.precio);

        carrito.push({ nombre, precio });
        total += precio;

        actualizarCarrito();
    });
});

function actualizarCarrito() {
    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);
    });
    document.getElementById("totalCarrito").innerText = total;
}

document.getElementById("abrirCarrito").onclick = () => {
    document.getElementById("carritoModal").style.display = "flex";
};

document.getElementById("cerrarCarrito").onclick = () => {
    document.getElementById("carritoModal").style.display = "none";
};
/* ---------------------------
  Datos adicionales: mazos, posts y lógica de tirada
----------------------------*/

const mazos = [
  { id:'m1', title:'Ritual Arcano', price:4200, img:'img/tarot1.jpg', desc:'Mazo clásico con ilustraciones doradas.' },
  { id:'m2', title:'Luna Nueva', price:3800, img:'img/mazo2.jpg', desc:'Mazo floral, notas suaves.' },
  { id:'m3', title:'Sombras y Luz', price:5000, img:'img/mazo3.jpg', desc:'Edición limitada, alto contraste.' }
];

const posts = [
  { id:'r1', title:'Significado: La Sacerdotisa', excerpt:'Intuición, secretos y escucha interior.' },
  { id:'r2', title:'Ritual de limpieza con palo santo', excerpt:'Cómo realizar un sahumerio para limpiar la energía.' },
];

/* Render mazos y posts */
function renderMazos(){
  const grid = document.getElementById('mazosGrid');
  if(!grid) return;
  grid.innerHTML = '';
  mazos.forEach(m=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${m.img}" style="width:100%;height:140px;object-fit:cover;border-radius:8px" />
      <h4 style="margin:10px 0 6px">${m.title}</h4>
      <div class="small">${m.desc}</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn" onclick="addToCartMazo('${m.id}')">Agregar al carrito</button>
        <button class="btn secondary" onclick="openMazoDetail('${m.id}')">Ver</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

function renderPosts(){
  const grid = document.getElementById('ritualGrid');
  if(!grid) return;
  grid.innerHTML = '';
  posts.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h4>${p.title}</h4><div class="small">${p.excerpt}</div><div style="margin-top:8px"><button class="btn secondary">Leer más</button></div>`;
    grid.appendChild(el);
  });
}

/* Agregar mazo al carrito */
function addToCartMazo(id){
  const m = mazos.find(x=>x.id==id);
  if(!m) return alert('Mazo no encontrado');
  addToCartGeneric(m.title || m.id, m.price, m.img);
}

/* Agregar servicio (tirada) al carrito */
function addServiceToCart(name, price){
  addToCartGeneric(name, price, null, true);
  alert(`${name} agregado al carrito`);
}

/* Helper genérico para agregar al carrito (compatible con tu carrito previo) */
function addToCartGeneric(name, price, img, isService=false){
  // si tu carrito es objeto, adaptá o reutilizá addToCart
  const id = 's_' + Date.now();
  const item = { _id:id, name, price, image: img || '', isService };
  // suponemos arreglo `products` para render; si tu carrito distinto adaptalo:
  if(!products) products = [];
  products.push(item);
  addToCart(id,1); // usa función ya existente para sumar a carrito por id
  renderGrid(products); // opcional: refrescar
}

/* Demo: Tirada interactiva */
function setupTiradaDemo(){
  document.querySelectorAll('.demoTirada').forEach(btn=>{
    btn.addEventListener('click', ()=> openTiradaModal(btn.dataset.type));
  });
  document.getElementById('tiradaAuto').addEventListener('click', ()=> autoSelectCards());
  document.getElementById('tiradaConfirmar').addEventListener('click', ()=> confirmTiradaSelection());
  document.getElementById('tiradaCerrar').addEventListener('click', ()=> closeTiradaModal());
}

function openTiradaModal(type = 3){
  const modal = document.getElementById('tiradaModal');
  document.getElementById('tiradaTitle').textContent = `Demo: Tirada de ${type} cartas`;
  modal.classList.add('open');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
  renderTiradaCards(type);
}

function closeTiradaModal(){
  const modal = document.getElementById('tiradaModal');
  modal.classList.remove('open');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
  document.getElementById('tiradaResult').innerHTML = '';
}

let tiradaSelected = [];

function renderTiradaCards(count){
  const area = document.getElementById('tiradaArea');
  area.innerHTML = '';
  tiradaSelected = [];
  // simulamos mazo con 12 cartas
  for(let i=1;i<=12;i++){
    const card = document.createElement('div');
    card.className = 'tiradaCard';
    card.dataset.card = `C${i}`;
    card.innerHTML = `<div style="text-align:center"><div style="font-size:14px;font-weight:700">C${i}</div><div class="small">Arcano ${i}</div></div>`;
    card.addEventListener('click', ()=> toggleSelectCard(card, count));
    area.appendChild(card);
  }
}

/* seleccionar hasta N cartas */
function toggleSelectCard(cardEl, maxCount){
  const id = cardEl.dataset.card;
  if(cardEl.classList.contains('selected')){
    cardEl.classList.remove('selected');
    tiradaSelected = tiradaSelected.filter(x=>x!=id);
  } else {
    if(tiradaSelected.length >= maxCount){
      alert(`Podés seleccionar hasta ${maxCount} cartas`);
      return;
    }
    cardEl.classList.add('selected');
    tiradaSelected.push(id);
  }
  document.getElementById('tiradaSub').textContent = `Seleccionadas: ${tiradaSelected.join(', ') || '—'}`;
}

function autoSelectCards(){
  // seleccionar aleatorio según la cantidad indicada en el título
  const title = document.getElementById('tiradaTitle').textContent;
  const n = parseInt(title.match(/\d+/)?.[0] || 3);
  const cards = Array.from(document.querySelectorAll('#tiradaArea .tiradaCard'));
  const chosen = [];
  while(chosen.length < n){
    const rand = cards[Math.floor(Math.random()*cards.length)];
    if(!chosen.includes(rand)){
      chosen.push(rand);
    }
  }
  cards.forEach(c=>c.classList.remove('selected'));
  tiradaSelected = [];
  chosen.forEach(c=>{
    c.classList.add('selected');
    tiradaSelected.push(c.dataset.card);
  });
  document.getElementById('tiradaSub').textContent = `Seleccionadas: ${tiradaSelected.join(', ')}`;
}

function confirmTiradaSelection(){
  if(tiradaSelected.length === 0) return alert('Seleccioná al menos una carta');
  // generamos un resultado simple
  const resBox = document.getElementById('tiradaResult');
  resBox.innerHTML = `<strong>Resultado:</strong><div class="small" style="margin-top:8px">Tus cartas: ${tiradaSelected.join(', ')} — interpretación brevemente: energías en movimiento, invitación a la acción y cuidado personal.</div>`;
  // opcional: agregar "reserva" al carrito
  // addServiceToCart(`Demo Tirada (${tiradaSelected.length} cartas)`, 0);
}

/* Init extras */
document.addEventListener('DOMContentLoaded', ()=>{
  renderMazos();
  renderPosts();
  setupTiradaDemo();
});
document.querySelector("#contactoForm").addEventListener("submit", e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  fetch("https://formsubmit.co/TU_EMAIL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  }).then(() => alert("Mensaje enviado correctamente 💫"));
});
function filtrar(categoria) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    if(categoria === 'todos' || item.classList.contains(categoria)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
