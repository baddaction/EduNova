// Administrador de Cursos
let cursosArchivos = [
    {
        id: 1,
        nombre: "Diseño Web",
        descripcion: "Curso introductorio sobre HTML, CSS y Bootstrap.",
        fecha: "2025-10-01",
        archivos: ["temario.pdf"]
    },
    {
        id: 2,
        nombre: "JavaScript Intermedio",
        descripcion: "Funciones, eventos, DOM y lógica de interacción.",
        fecha: "2025-09-20",
        archivos: ["ejercicios.zip"]
    }
];

// Mostrar cursos en tabla
function cargarTabla() {
    let tabla = document.getElementById("tablaCursos");
    tabla.innerHTML = "";

    cursosArchivos.forEach(curso => {
        let fila = `
            <tr>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${curso.fecha}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarCurso(${curso.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${curso.id})">Eliminar</button>
                </td>
            </tr>
        `;

        tabla.innerHTML += fila;
    });
}

// Mostrar formulario para crear nuevo curso
function mostrarFormulario() {
    document.getElementById("tituloForm").innerText = "Crear Curso";
    document.getElementById("cursoId").value = "";
    document.getElementById("nombreCurso").value = "";
    document.getElementById("descripcionCurso").value = "";
    document.getElementById("archivoCurso").value = "";
    document.getElementById("formularioCurso").style.display = "block";
}

// Guardar nuevo o editar existente
function guardarCurso() {
    let id = document.getElementById("cursoId").value;
    let nombre = document.getElementById("nombreCurso").value;
    let descripcion = document.getElementById("descripcionCurso").value;
    let archivoInput = document.getElementById("archivoCurso");
    let archivoNombre = archivoInput.files.length > 0 ? archivoInput.files[0].name : null;

    if (id) {
        // Editar curso existente
        let curso = cursosArchivos.find(c => c.id == id);
        curso.nombre = nombre;
        curso.descripcion = descripcion;

        if (archivoNombre) {
            curso.archivos.push(archivoNombre);
        }

    } else {
        // Crear nuevo curso
        let nuevoCurso = {
            id: Date.now(),
            nombre,
            descripcion,
            fecha: new Date().toISOString().split("T")[0],
            archivos: archivoNombre ? [archivoNombre] : []
        };

        cursosArchivos.push(nuevoCurso);
    }

    document.getElementById("formularioCurso").style.display = "none";
    cargarTabla();
}

// Editar curso
function editarCurso(id) {
    let curso = cursosArchivos.find(c => c.id == id);

    document.getElementById("tituloForm").innerText = "Editar Curso";
    document.getElementById("cursoId").value = curso.id;
    document.getElementById("nombreCurso").value = curso.nombre;
    document.getElementById("descripcionCurso").value = curso.descripcion;
    document.getElementById("archivoCurso").value = "";
    document.getElementById("formularioCurso").style.display = "block";
}

// Eliminar curso
function eliminarCurso(id) {
    cursosArchivos = cursosArchivos.filter(c => c.id !== id);
    cargarTabla();
}

// Inicializar tabla al cargar
document.addEventListener("DOMContentLoaded", cargarTabla);
