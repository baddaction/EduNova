document.addEventListener("DOMContentLoaded", function () {
    // Cargar pendientes al entrar
    cargarPendientes();
});

const path = (typeof basePath !== 'undefined') ? basePath : './';
let idCursoSeleccionado = null; // Para saber cuál vamos a rechazar

// CARGAR CURSOS PENDIENTES
function cargarPendientes() {
    const tbody = document.getElementById("lista-cursos");
    if(!tbody) return; // Si no estamos en la pestaña correcta, salir

    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Buscando cursos pendientes...</td></tr>';

    fetch(path + 'php/admin_listar_pendientes.php')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            if (data.success && data.cursos.length > 0) {
                data.cursos.forEach(curso => {
                    const row = `
                        <tr>
                            <td>${curso.id}</td>
                            <td class="fw-bold text-primary">
                                ${curso.titulo}
                                <br>
                                <a href="curso.php?id=${curso.id}" target="_blank" class="small text-muted text-decoration-underline">Ver detalles</a>
                            </td>
                            <td>${curso.instructor}</td>
                            <td>${curso.fecha_creacion}</td>
                            <td>
                                <button class="btn btn-success btn-sm me-2" onclick="cambiarEstado(${curso.id}, 'aprobar')" title="Aprobar">
                                    <i class="bi bi-check-lg"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="abrirModalRechazo(${curso.id})" title="Rechazar">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-success"><i class="bi bi-check-circle"></i> No hay cursos pendientes de revisión.</td></tr>';
            }
        })
        .catch(err => console.error(err));
}

// 2. APROBAR CURSO (Directo)
function cambiarEstado(id, accion) {
    if(!confirm(`¿Estás seguro de que deseas ${accion.toUpperCase()} este curso?`)) return;

    fetch(path + 'php/admin_estado_curso.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, accion: accion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            cargarPendientes(); // Recargar tabla
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(err => console.error(err));
}

// 3. RECHAZAR CURSO (Con Modal)
function abrirModalRechazo(id) {
    idCursoSeleccionado = id;
    const modal = document.getElementById("modalRechazar");
    modal.style.display = "block";
}

// Cerrar Modal
document.querySelector(".cerrarR").onclick = function() {
    document.getElementById("modalRechazar").style.display = "none";
}

// Confirmar Rechazo
document.getElementById("btnConfirmarRechazo").onclick = function() {
    const motivo = document.getElementById("motivoRechazo").value;
    
    cambiarEstado(idCursoSeleccionado, 'rechazar');
    
    document.getElementById("modalRechazar").style.display = "none";
    document.getElementById("motivoRechazo").value = ""; // Limpiar
}

// Cerrar modal al dar clic fuera
window.onclick = function(event) {
    const modal = document.getElementById("modalRechazar");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}