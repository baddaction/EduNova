document.addEventListener("DOMContentLoaded", function () {
    // Solo ejecutar si estamos en la vista de estadísticas
    if (document.getElementById("usuariosRegistrados")) {
        cargarEstadisticas();
    }
});

function cargarEstadisticas() {
    fetch(basePath + 'php/admin_estadisticas.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Actualizar los textos con los números reales
                document.getElementById("usuariosRegistrados").innerText = data.stats.usuarios;
                document.getElementById("cursosActivos").innerText = data.stats.cursos;
                document.getElementById("suscripcionesActivas").innerText = data.stats.inscripciones;
                document.getElementById("comentariosTotales").innerText = data.stats.comentarios;
            }
        })
        .catch(err => console.error("Error cargando stats:", err));
}

// Lógica del Precio (Simulada por ahora usando LocalStorage del navegador)
function actualizarPrecio() {
    const nuevoPrecio = document.getElementById("nuevoPrecio").value;
    if (nuevoPrecio) {
        document.getElementById("precioActual").innerText = `$${nuevoPrecio} MXN`;
        localStorage.setItem("precioSuscripcion", nuevoPrecio); // Guardar en navegador
        document.getElementById("nuevoPrecio").value = "";
        alert("Precio actualizado (Localmente)");
    }
}

// Cargar precio guardado al iniciar
const precioGuardado = localStorage.getItem("precioSuscripcion");
if (precioGuardado && document.getElementById("precioActual")) {
    document.getElementById("precioActual").innerText = `$${precioGuardado} MXN`;
}