document.addEventListener("DOMContentLoaded", function () {
    cargarCursos();
});

// Variable global para guardar los cursos cargados temporalmente (para poder editarlos visualmente)
let cursosCargados = [];

const path = (typeof basePath !== 'undefined') ? basePath : './';

// CARGAR TABLA (READ)
function cargarTabla() {
    cargarCursos(); 
}

function cargarCursos() {
    const tabla = document.getElementById("tablaCursos");
    
    // Mostrar mensaje de carga
    tabla.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Cargando cursos...</td></tr>';

    fetch(path + 'php/maestro_listar_cursos.php')
        .then(response => response.json())
        .then(data => {
            tabla.innerHTML = ""; // Limpiar tabla

            if (data.success && data.cursos.length > 0) {
                
                // Guardamos en memoria para usar al dar click en editar
                cursosCargados = data.cursos;

                data.cursos.forEach(curso => {
                    // Color según si está aprobado o no
                    let estadoBadge = '';
                    if(curso.estado === 'activo') estadoBadge = '<span class="badge bg-success">Aprobado</span>';
                    else if(curso.estado === 'pendiente') estadoBadge = '<span class="badge bg-warning text-dark">Pendiente</span>';
                    else estadoBadge = '<span class="badge bg-danger">Rechazado</span>';

                    const row = `
                        <tr>
                            <td>
                                <strong>${curso.titulo}</strong>
                            </td>
                            <td>${curso.descripcion.substring(0, 60)}...</td>
                            <td>${curso.fecha_creacion}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="administrar_curso.php?id=${curso.id}" class="btn btn-info btn-sm text-white" title="Gestionar Temas">
                                        <i class="bi bi-gear"></i> Temas
                                    </a>
                                    
                                    <button class="btn btn-warning btn-sm" onclick="editarCurso(${curso.id})">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    
                                    <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${curso.id})">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                <div class="mt-1">${estadoBadge}</div>
                            </td>
                        </tr>
                    `;
                    tabla.innerHTML += row;
                });
            } else {
                tabla.innerHTML = '<tr><td colspan="4" class="text-center">No has creado cursos aún.</td></tr>';
            }
        })
        .catch(error => {
            console.error("Error:", error);
            tabla.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error de conexión con el servidor.</td></tr>';
        });
}

// MOSTRAR FORMULARIO
function mostrarFormulario() {
    const form = document.getElementById("formularioCurso");
    form.style.display = "block";
    
    // Limpiar campos para crear uno nuevo
    document.getElementById("tituloForm").innerText = "Crear Nuevo Curso";
    document.getElementById("cursoId").value = ""; // ID vacío = Crear
    document.getElementById("nombreCurso").value = "";
    document.getElementById("descripcionCurso").value = "";
    document.getElementById("archivoCurso").value = "";
}

// GUARDAR (CREATE / UPDATE)
function guardarCurso() {
    const id = document.getElementById("cursoId").value;
    const nombre = document.getElementById("nombreCurso").value.trim();
    const descripcion = document.getElementById("descripcionCurso").value.trim();
    const archivoInput = document.getElementById("archivoCurso");

    if (nombre === "" || descripcion === "") {
        alert("Por favor completa el nombre y la descripción.");
        return;
    }

    // enviar archivos (imágenes)
    const formData = new FormData();
    formData.append('titulo', nombre);
    formData.append('descripcion', descripcion);
    
    if (archivoInput.files.length > 0) {
        formData.append('imagen', archivoInput.files[0]);
    }

    // Lógica para saber si es CREAR o EDITAR
    let url = path + 'php/maestro_crear_curso.php'; // Por defecto Crear

    if (id) {
        alert("La función de editar se implementará en el siguiente paso.");
        return;
    }

    // Enviar al Backend
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            document.getElementById("formularioCurso").style.display = "none";
            cargarCursos(); // Recargar la tabla para ver el nuevo curso
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al intentar guardar.");
    });
}

// FUNCIONES EXTRA (EDITAR / ELIMINAR)
function editarCurso(id) {
    // Buscamos los datos en el array que cargamos al principio
    const curso = cursosCargados.find(c => c.id == id);

    if (curso) {
        document.getElementById("tituloForm").innerText = "Editar Curso";
        document.getElementById("cursoId").value = curso.id;
        document.getElementById("nombreCurso").value = curso.titulo;
        document.getElementById("descripcionCurso").value = curso.descripcion;
        document.getElementById("formularioCurso").style.display = "block";
        
        // Hacemos scroll hacia el formulario
        document.getElementById("formularioCurso").scrollIntoView({ behavior: 'smooth' });
    }
}

function eliminarCurso(id) {
    if(confirm("¿Estás seguro de que quieres eliminar este curso?")) {
        // Aquí conectaremos con php/maestro_eliminar_curso.php más adelante
        alert("La función de eliminar se implementará en el siguiente paso.");
    }
}