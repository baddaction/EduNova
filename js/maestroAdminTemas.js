document.addEventListener("DOMContentLoaded", function () {
    
    // Verificación de la variable global (solo por seguridad)
    if (typeof cursoId === 'undefined' || !cursoId) {
        alert("Error: ID de curso no disponible. Por favor, vuelva a Mis Cursos.");
        return; 
    }
    
    const idCurso = cursoId;
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    // Cargar temas al iniciar
    cargarTemas();

    // CARGAR TEMAS
    function cargarTemas() {
        const tbody = document.getElementById("tablaTemas");
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Cargando...</td></tr>';

        // Usamos idCurso
        fetch(path + 'php/maestro_listar_temas.php?id_curso=' + idCurso)
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";
            
            if(data.success && data.temas && data.temas.length > 0){
                data.temas.forEach(tema => {
                    // Botón para ver archivo (si existe)
                    let archivoHtml = tema.archivo 
                        ? `<a href="${path + tema.archivo}" target="_blank" class="btn btn-sm btn-info text-white"><i class="bi bi-file-earmark-arrow-down-fill"></i> Ver Material</a>` 
                        : '<span class="text-muted small">Sin material</span>';

                    tbody.innerHTML += `
                        <tr>
                            <td class="fw-bold">${tema.titulo}</td>
                            <td>${tema.descripcion}</td>
                            <td>${archivoHtml}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="alert('Pendiente de implementar eliminar')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center">Este curso no tiene temas aún.</td></tr>';
            }
        })
        .catch(err => {
            console.error('Error al cargar los temas:', err);
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error de conexión al cargar temas.</td></tr>';
        });
    }

    // GUARDAR TEMA
    const form = document.getElementById("formTema");
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    if(form){
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Desactivar botón y mostrar carga
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';

            const titulo = document.getElementById("tituloTema").value;
            const desc = document.getElementById("descTema").value;
            const archivoInput = document.getElementById("archivoTema");

            // Validación mínima
            if (!titulo.trim()) {
                 alert("El título del tema es obligatorio.");
                 submitButton.disabled = false;
                 submitButton.innerHTML = 'Guardar Tema';
                 return;
            }

            const formData = new FormData();
            formData.append("id_curso", idCurso);
            formData.append("titulo", titulo);
            formData.append("descripcion", desc);
            
            if(archivoInput.files.length > 0) {
                formData.append("archivo", archivoInput.files[0]);
            }

            fetch(path + 'php/maestro_agregar_tema.php', {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                // Reactivar botón
                submitButton.disabled = false;
                submitButton.innerHTML = 'Guardar Tema';

                if(data.success) {
                    alert("Tema guardado exitosamente!");
                    document.getElementById("formTema").reset();
                    cargarTemas(); // Recargar tabla
                } else {
                    alert("Error al guardar tema: " + (data.message || 'Error desconocido.'));
                }
            })
            .catch(err => {
                console.error(err);
                // Reactivar botón en caso de fallo de red
                submitButton.disabled = false;
                submitButton.innerHTML = 'Guardar Tema';
                alert("Error de conexión al servidor.");
            });
        });
    }
});