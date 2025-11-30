document.addEventListener("DOMContentLoaded", function () {
    cargarPendientes();
});

const path = (typeof basePath !== 'undefined') ? basePath : './';
let idCursoSeleccionado = null; // Para el manejo de rechazo

// CARGAR CURSOS PENDIENTES 
function cargarPendientes() {
    const tbody = document.getElementById("lista-cursos");
    if(!tbody) return; 

    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted"><i class="bi bi-arrow-clockwise"></i> Buscando cursos pendientes...</td></tr>';

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
                                <button class="btn btn-link btn-sm p-0 text-decoration-underline" 
                                    onclick="mostrarDetallesCurso(${curso.id})"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetallesCurso">
                                    Ver detalles
                                </button>
                            </td>
                            <td>${curso.instructor}</td>
                            <td>${curso.fecha_creacion}</td>
                            <td>
                                <button class="btn btn-success btn-sm me-2" onclick="cambiarEstado(${curso.id}, 'activo')" title="Aprobar">
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
        .catch(err => {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error al cargar la lista.</td></tr>';
            console.error('Error al cargar pendientes:', err);
        });
}

//  CARGAR DATOS DEL CURSO AL MODAL (AJAX)
function mostrarDetallesCurso(idCurso) {
    const contenidoDiv = document.getElementById('detalles-contenido');
    const footerDiv = document.getElementById('modal-footer-acciones');

    // Resetear contenido y mostrar spinner
    contenidoDiv.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"></div><p>Cargando detalles...</p></div>';
    footerDiv.innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';

    // Llamada Fetch
    fetch(path + 'php/admin_obtener_curso_detalle.php?id=' + idCurso)
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const curso = data.curso;
            const temario = data.temario;
            
            // CONSTRUCCIÓN DEL CONTENIDO 
            let htmlContenido = `
                <h4 class="mb-3">${curso.titulo}</h4>
                <p><strong>Maestro:</strong> ${curso.nombre_maestro}</p>
                <p><strong>Estado:</strong> <span class="badge bg-${curso.estado === 'pendiente' ? 'warning' : 'success'}">${curso.estado.toUpperCase()}</span></p>
                
                <h6 class="mt-4">Descripción:</h6>
                <p>${curso.descripcion.replace(/\n/g, '<br>')}</p>
                
                <h5 class="mt-4">Temario y Archivos (${temario.length} temas)</h5>
                <hr>`;
            
            // Construir el temario
            if (temario.length > 0) {
                htmlContenido += `<div class="accordion" id="temarioAccordion">`;
                temario.forEach((tema, index) => {
                    const archivoLink = tema.archivo 
                        ? `<p><i class="bi bi-file-earmark-fill"></i> Archivo: <a href="${path}archivos/${tema.archivo}" target="_blank">Ver/Descargar Archivo</a></p>`
                        : `<p class="text-muted">No hay archivo adjunto.</p>`;
                        
                    htmlContenido += `
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idCurso}_${index}" aria-expanded="false">
                                    Tema ${index + 1}: ${tema.titulo}
                                </button>
                            </h2>
                            <div id="collapse${idCurso}_${index}" class="accordion-collapse collapse" data-bs-parent="#temarioAccordion">
                                <div class="accordion-body">
                                    ${archivoLink}
                                </div>
                            </div>
                        </div>`;
                });
                htmlContenido += `</div>`;
            } else {
                 htmlContenido += `<div class="alert alert-info">El maestro no ha subido temas.</div>`;
            }

            // INYECTAR CONTENIDO y BOTONES
            contenidoDiv.innerHTML = htmlContenido;
            
            // Si el curso está PENDIENTE, se incluyen los botones de acción en el footer del modal
            if (curso.estado === 'pendiente') {
                footerDiv.innerHTML = `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar Revisión</button>
                    <button type="button" class="btn btn-success" onclick="cambiarEstado(${idCurso}, 'activo')" data-bs-dismiss="modal">Aprobar</button>
                `;
            }

        } else {
            contenidoDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    })
    .catch(error => {
        contenidoDiv.innerHTML = `<div class="alert alert-danger">Error de red al cargar detalles.</div>`;
        console.error('Error:', error);
    });
}


// APROBAR/RECHAZAR CURSO
function cambiarEstado(id, accion, motivo = '') {
    // Si la acción es aprobar, pedimos confirmación simple
    if (accion === 'activo' && !confirm(`¿Estás seguro de que deseas APROBAR este curso?`)) return;

    // Si es rechazar, usamos el motivo
    if (accion === 'rechazado' && motivo === '') {
        alert("El motivo de rechazo es obligatorio.");
        return;
    }

    fetch(path + 'php/admin_validar_curso.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id_curso: id, 
            estado: accion, // 'activo' o 'rechazado'
            motivo: motivo // Solo se usa si es 'rechazado'
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            cargarPendientes(); // Recargar tabla
            // forzamos el cierre
            const modalDetalles = bootstrap.Modal.getInstance(document.getElementById('modalDetallesCurso'));
            if(modalDetalles) modalDetalles.hide(); 
        }
    })
    .catch(err => {
        alert("Error de conexión al cambiar estado.");
        console.error(err);
    });
}

// RECHAZAR CURSO

function abrirModalRechazo(id) {
    idCursoSeleccionado = id;

    const motivo = prompt("Escribe el motivo del rechazo del curso:");
    
    if (motivo) {
        cambiarEstado(idCursoSeleccionado, 'rechazado', motivo);
    } else if (motivo === "") {
         alert("La operación fue cancelada o el motivo estaba vacío.");
    }
}
