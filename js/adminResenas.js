document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("tablaResenas")) {
        cargarResenas();
    }
});

let resenasCache = [];

// CARGAR RESEÑAS
function cargarResenas() {
    const tbody = document.getElementById("tablaResenas");
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Cargando reseñas...</td></tr>';

    fetch(basePath + 'php/admin_listar_resenas.php')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            if (data.success && data.resenas.length > 0) {
                resenasCache = data.resenas;

                data.resenas.forEach(r => {
                    // Colores para el estado
                    let estadoBadge = '';
                    if (r.estado === 'Pendiente') estadoBadge = '<span class="badge bg-warning text-dark">Pendiente</span>';
                    else if (r.estado === 'Aprobada') estadoBadge = '<span class="badge bg-success">Aprobada</span>';
                    else estadoBadge = '<span class="badge bg-danger">Rechazada</span>';

                    // Botones: Solo mostramos acciones si está Pendiente 
                    let botones = '';
                    botones = `
                            <button class="btn btn-success btn-sm me-1" onclick="estadoResena(${r.id}, 'aprobar')" title="Aprobar">
                                <i class="bi bi-check-lg"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="estadoResena(${r.id}, 'rechazar')" title="Rechazar">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        `;
                    // }

                    const row = `
                        <tr>
                            <td class="fw-bold">${r.curso}</td>
                            <td>${r.alumno}</td>
                            <td><small>${r.comentario}</small></td>
                            <td>${r.fecha}</td>
                            <td>${estadoBadge}</td>
                            <td>${botones}</td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay reseñas registradas.</td></tr>';
            }
        })
        .catch(err => console.error(err));
}

// CAMBIAR ESTADO
function estadoResena(id, accion) {
    if (!confirm(`¿Estás seguro de que deseas ${accion.toUpperCase()} esta reseña?`)) return;

    fetch(basePath + 'php/admin_estado_resena.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, accion: accion })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarResenas(); // Recargar tabla
            }
        })
        .catch(err => console.error(err));
}

// FILTROS
document.getElementById("filtrarEstado").addEventListener("change", function () {
    const filtro = this.value;
    const tbody = document.getElementById("tablaResenas");
    tbody.innerHTML = "";

    const filtradas = resenasCache.filter(r => filtro === "" || r.estado === filtro);

 
    if (filtro === "") {
        cargarResenas();
    } else {
        // Pintar solo filtradas
        filtradas.forEach(r => {
            let estadoBadge = `<span class="badge bg-secondary">${r.estado}</span>`; // Simplificado
            tbody.innerHTML += `<tr><td colspan="6">${r.curso} - ${r.estado} (Filtro activo)</td></tr>`;
        });
    }
});