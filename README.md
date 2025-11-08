Vaquilier – API RESTful con CRUD, MongoDB y Envío de Emails

Proyecto desarrollado con Node.js, Express y MongoDB, que permite gestionar Productos, Categorías y Usuarios.
Incluye carrito de compras, persistencia en MongoDB Atlas y envío automático de emails para confirmar pedidos al cliente y al administrador.

Arquitectura separada en:
✔ Model
✔ Service
✔ Controller
✔ Routes

| Tecnología             | Uso                                        |
| ---------------------- | ------------------------------------------ |
| **Node.js + Express**  | Servidor y endpoints REST                  |
| **MongoDB + Mongoose** | Modelado de datos y conexión a base        |
| **Nodemailer**         | Envío de emails al cliente y administrador |
| **dotenv**             | Variables de entorno (.env)                |
| **CORS**               | Comunicación entre frontend y backend      |

proyecto-crud-mongodb/
├── app.js
├── package.json
├── README.md
├── public/              (Frontend HTML + CSS + JS)
└── src/
    ├── models/
    │   ├── productModel.js
    │   ├── categoryModel.js
    │   └── userModel.js
    ├── services/
    │   ├── productService.js
    │   ├── categoryService.js
    │   └── userService.js
    ├── controllers/
    │   ├── productController.js
    │   ├── categoryController.js
    │   └── userController.js
    ├── routes/
    │   ├── productRoute.js
    │   ├── categoryRoute.js
    │   └── userRoute.js
    ├── config/
    │   └── db.js
    └── middleware/
        └── verifyToken.js   (solo si usa JWT)


| Modelo        | Campos                                             | Detalles                       |
| ------------- | -------------------------------------------------- | ------------------------------ |
| **Producto**  | nombre, descripcion, precio, stock, categoria(ref) | Referencia a Categoría         |
| **Categoría** | nombre, descripcion                                | CRUD completo                  |
| **Usuario**   | nombre, email, password                            | Password encriptada con bcrypt |

✅ Ejemplos JSON

✔ Crear Producto

{
  "nombre": "Vela Lavanda",
  "descripcion": "Relajación y limpieza energética",
  "precio": 2500,
  "stock": 5,
  "categoria": "65a8f8943ff7c9d23d11c222"
}


✔ Crear Categoría

{
  "nombre": "Velas",
  "descripcion": "Velas energéticas y aromáticas"
}


✔ Crear Usuario

{
  "nombre": "Valentina",
  "email": "valen@gmail.com",
  "password": "123456"
}

✅ 🔌 Rutas (Endpoints CRUD)
📌 Productos

| Método | Ruta               | Descripción         | Body                                                |
| ------ | ------------------ | ------------------- | --------------------------------------------------- |
| GET    | /api/productos     | Obtener todos       | —                                                   |
| GET    | /api/productos/:id | Obtener por ID      | —                                                   |
| POST   | /api/productos     | Crear producto      | `{ nombre, descripcion, precio, stock, categoria }` |
| PUT    | /api/productos/:id | Actualizar producto | `{ campos a modificar }`                            |
| DELETE | /api/productos/:id | Eliminar producto   | —                                                   |

Categorías

| Método | Ruta          | Descripción            |
| ------ | ------------- | ---------------------- |
| POST   | /api/usuarios | Crear usuario          |
| POST   | /api/login    | Login → devuelve token |

✅ 🚀 Cómo Ejecutar el Proyecto
1️⃣ Clonar el repositorio
git clone https://github.com/valenvacca007/vaquilier.git

2️⃣ Instalar dependencias
npm install

3️⃣ Crear archivo .env en la raíz del proyecto
MONGO_URI="tu_conexion_a_MongoDB"
GMAIL_USER="tu-mail@gmail.com"
GMAIL_APP_PASS="tu-app-password"
PORT=3000

4️⃣ Ejecutar el servidor
npm start

✅ 📨 Envío de Emails

Al finalizar la compra:

Se envía un email al cliente con el detalle del pedido

Se envía un email al administrador con los mismos datos

Esto se realiza mediante:

POST /api/pedidos/email

✅ Autor

Proyecto realizado por:
Valentina Vacca – UTN
2025