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
                
                // ACTUALIZAR PRECIO VISUAL
                if (data.stats.precio) {
                    document.getElementById("precioActual").innerText = `$${data.stats.precio} MXN`;
                }
            }
        })
        .catch(err => console.error("Error cargando stats:", err));
}

// Lógica del Precio
function actualizarPrecio() {
    const nuevoPrecio = document.getElementById("nuevoPrecio").value;
    if (nuevoPrecio) {
        fetch(basePath + 'php/admin_estadisticas.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ precio: nuevoPrecio })
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                cargarEstadisticas(); // Recargar para ver el cambio
                document.getElementById("nuevoPrecio").value = "";
            });
    }
}