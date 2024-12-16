// Array de productos
const productos = [
    { id: 1, nombre: "Laura", precio: 30.00, imagen: "imagenes/ejemplo1.jpg", descripcion: "Calzado cómodo y elegante." },
    { id: 2, nombre: "Leti", precio: 25.00, imagen: "imagenes/ejemplo2.jpg", descripcion: "Perfecto para el día a día." },
    { id: 3, nombre: "Yuya", precio: 28.00, imagen: "imagenes/ejemplo3.jpg", descripcion: "Diseño moderno y funcional." },
    { id: 4, nombre: "María", precio: 32.00, imagen: "imagenes/ejemplo4.jpg", descripcion: "Ideal para eventos especiales." }
];

// Variables de carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cartCount = document.getElementById("cart-count");
const productContainer = document.getElementById("product-container");

// Mostrar productos dinámicamente
function renderizarProductos() {
    productContainer.innerHTML = "";
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "tarjeta-producto");

        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
            <p class="fw-bold">$${producto.precio.toFixed(2)}</p>
            <button class="btn btn-dark mt-2" onclick="añadirAlCarrito(${producto.id})">Agregar al carrito</button>
        `;

        // Evento para mostrar descripción ampliada
        card.addEventListener("click", () => {
            alert(`Descripción: ${producto.descripcion}`);
        });

        productContainer.appendChild(card);
    });
}

// Actualizar el carrito
function actualizarCarrito() {
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = totalProductos;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Validar formulario de contacto
document.getElementById("contact-form").addEventListener("submit", function (e) {
    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    if (!nombre || !email || !mensaje) {
        console.error("Todos los campos son obligatorios.");
        e.preventDefault();
    } else {
        console.log("Formulario enviado correctamente.");
    }
});

// Consumir una API pública (simulado)
function obtenerDatosAPI() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => console.log("Datos de la API:", data))
        .catch(error => console.error("Error al consumir la API", error));
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    actualizarCarrito();
    obtenerDatosAPI();
});
