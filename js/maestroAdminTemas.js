document.addEventListener("DOMContentLoaded", function () {
    
    // Obtener ID del curso de la URL
    const params = new URLSearchParams(window.location.search);
    const idCurso = params.get("id");
    
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    if (!idCurso) {
        alert("Error: No se seleccionó curso.");
        window.location.href = "adminCursos.php";
        return; 
    }

    // Cargar temas al iniciar
    cargarTemas();

    // FUNCIÓN: CARGAR TEMAS
    function cargarTemas() {
        const tbody = document.getElementById("tablaTemas");
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Cargando...</td></tr>';

        fetch(path + 'php/maestro_listar_temas.php?id_curso=' + idCurso)
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";
            
            if(data.success && data.temas.length > 0){
                data.temas.forEach(tema => {
                    // Botón para ver archivo (si existe)
                    let archivoHtml = tema.archivo 
                        ? `<a href="${path + tema.archivo}" target="_blank" class="btn btn-sm btn-info text-white">Ver Archivo</a>` 
                        : '<span class="text-muted">Sin archivo</span>';

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
        });
    }

    // FUNCIÓN: GUARDAR TEMA
    const form = document.getElementById("formTema");
    if(form){
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const titulo = document.getElementById("tituloTema").value;
            const desc = document.getElementById("descTema").value;
            const archivoInput = document.getElementById("archivoTema");

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
                if(data.success) {
                    alert("Tema guardado!");
                    document.getElementById("formTema").reset();
                    cargarTemas(); // Recargar tabla
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(err => console.error(err));
        });
    }
});