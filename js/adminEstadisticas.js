// Estadisticas globales
// =============================
//     MOCK DATA (Datos falsos)
// =============================
let stats = {
    usuarios: 128,
    cursos: 34,
    suscripciones: 89,
    comentarios: 542,
    precio: 199
};

// Cargar datos falsos al iniciar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("usuariosRegistrados").innerText = stats.usuarios;
    document.getElementById("cursosActivos").innerText = stats.cursos;
    document.getElementById("suscripcionesActivas").innerText = stats.suscripciones;
    document.getElementById("comentariosTotales").innerText = stats.comentarios;
    document.getElementById("precioActual").innerText = `$${stats.precio} MXN`;
});

// =============================
//      Actualizar precio
// =============================
function actualizarPrecio() {
    const nuevo = document.getElementById("nuevoPrecio").value;

    if (!nuevo || nuevo <= 0) {
        alert("Ingresa un precio válido.");
        return;
    }

    stats.precio = nuevo;

    document.getElementById("precioActual").innerText = `$${stats.precio} MXN`;
    document.getElementById("nuevoPrecio").value = "";

    alert("Precio actualizado (dato falso, modo pruebas).");
}