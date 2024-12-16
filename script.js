// Array de productos disponibles
const productos = [
    { id: 1, nombre: "Laura", precio: 30.00, imagen: "imagenes/ejemplo1.jpg" },
    { id: 2, nombre: "Leti", precio: 25.00, imagen: "imagenes/ejemplo2.jpg" },
    { id: 3, nombre: "Yuya", precio: 28.00, imagen: "imagenes/ejemplo3.jpg" },
    { id: 4, nombre: "María", precio: 32.00, imagen: "imagenes/ejemplo4.jpg" }
];

// Variables del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Función para renderizar productos en el contenedor
function renderizarProductos() {
    const productContainer = document.getElementById("product-container");
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
        productContainer.appendChild(card);
    });
}

// Función para actualizar el contador del carrito
function actualizarContador() {
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = totalProductos;
}

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                ${producto.cantidad}
                <button class="btn btn-sm btn-success" onclick="modificarCantidad(${producto.id}, 1)">+</button>
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </td>
        `;
        cartItemsContainer.appendChild(fila);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para añadir un producto al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContador();
    mostrarCarrito();
}

// Función para modificar cantidad de un producto
function modificarCantidad(id, cantidad) {
    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        }
    }
    mostrarCarrito();
    actualizarContador();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    mostrarCarrito();
    actualizarContador();
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    mostrarCarrito();
    actualizarContador();
});
