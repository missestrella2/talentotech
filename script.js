//aca definimos los productos con precios (asignados arbitrariamente) para poder agregar al carrito
const productos = [
    { nombre: "Laura", precio: 30.00 },
    { nombre: "Leti", precio: 25.00 },
    { nombre: "Yuya", precio: 28.00 },
    { nombre: "María", precio: 32.00 }
];

//aca cargamos el carrito desde localstorage o lo iniciamos vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cartCount = document.getElementById("cart-count");

//aca actualizamos el ícono con la cantidad total
function actualizarCarrito() {
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = totalProductos;
}

//aca guardamos el carrito en localstorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//aca agregamos un producto al carrito
function añadirAlCarrito(nombreProducto) {
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (!producto) return;

    const productoEnCarrito = carrito.find(p => p.nombre === nombreProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
}

//aca mostramos el carrito en el modal
function mostrarCarrito() {
    const cartTableBody = document.getElementById("cart-table-body");
    const cartTotal = document.getElementById("cart-total");
    cartTableBody.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="modificarCantidad('${producto.nombre}', -1)">-</button>
                ${producto.cantidad}
                <button class="btn btn-sm btn-success" onclick="modificarCantidad('${producto.nombre}', 1)">+</button>
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
            </td>
        `;
        cartTableBody.appendChild(fila);    
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

//aca modificamos la cantidad de un producto en el carrito
function modificarCantidad(nombreProducto, cantidad) {
    const producto = carrito.find(p => p.nombre === nombreProducto);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(nombreProducto);
        }
        actualizarCarrito();
        guardarCarrito();
        mostrarCarrito();
    }
}

//aca eliminamos un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    carrito = carrito.filter(p => p.nombre !== nombreProducto);
    actualizarCarrito();
    guardarCarrito();
    mostrarCarrito();
}

//aca abrimos el modal del carrito al hacer clic en el ícono
document.getElementById("cart-icon").addEventListener("click", () => {
    mostrarCarrito();
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});

//inicializamos el contador del carrito
actualizarCarrito();

//aca reseteamos el form después de enviarlo
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
    setTimeout(() => {
        form.reset();
    }, 100); 
});
