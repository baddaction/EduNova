// ============================
//   DATOS FALSOS (SIMULACIÓN)
// ============================
let resenas = [
    {
        id: 1,
        curso: "Diseño Web",
        alumno: "Carlos Méndez",
        comentario: "Muy buen curso, pero faltó profundidad en Bootstrap.",
        fecha: "2025-10-15",
        estado: "Pendiente"
    },
    {
        id: 2,
        curso: "JavaScript Básico",
        alumno: "Lucía Torres",
        comentario: "Excelente explicación, muy claro todo.",
        fecha: "2025-10-16",
        estado: "Aprobada"
    },
    {
        id: 3,
        curso: "Cocina Mexicana",
        alumno: "Roberto Silva",
        comentario: "Me gustó, pero los videos están algo pixelados.",
        fecha: "2025-10-17",
        estado: "Rechazada"
    },
    {
        id: 4,
        curso: "Python Intermedio",
        alumno: "Mariela Álvarez",
        comentario: "De los mejores cursos que he tomado.",
        fecha: "2025-10-18",
        estado: "Pendiente"
    }
];

// ============================
//       RENDER DE TABLA
// ============================

function mostrarResenas(lista = resenas) {
    const tabla = document.getElementById("tablaResenas");
    tabla.innerHTML = "";

    lista.forEach(r => {
        let badgeClass =
            r.estado === "Aprobada" ? "bg-success" :
            r.estado === "Rechazada" ? "bg-danger" :
            "bg-warning text-dark";

        tabla.innerHTML += `
            <tr>
                <td>${r.curso}</td>
                <td>${r.alumno}</td>
                <td>${r.comentario}</td>
                <td>${r.fecha}</td>
                <td><span class="badge ${badgeClass}">${r.estado}</span></td>
                <td>
                    <button class="btn btn-primary btn-sm me-1">Ver Curso</button>
                    <button class="btn btn-success btn-sm me-1" onclick="aprobarResena(${r.id})">Aprobar</button>
                    <button class="btn btn-warning btn-sm me-1" onclick="cambiarEstado(${r.id})">Editar Estado</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarResena(${r.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// ============================
//      ACCIONES TEMPORALES
// ============================

function aprobarResena(id) {
    const r = resenas.find(x => x.id === id);
    r.estado = "Aprobada";
    mostrarResenas();
}

function cambiarEstado(id) {
    const r = resenas.find(x => x.id === id);

    const nuevo = prompt("Nuevo estado: Pendiente / Aprobada / Rechazada", r.estado);
    if (!nuevo) return;

    const estadoValido = ["Pendiente", "Aprobada", "Rechazada"];
    if (!estadoValido.includes(nuevo)) {
        alert("Estado inválido");
        return;
    }
    r.estado = nuevo;
    mostrarResenas();
}

function eliminarResena(id) {
    resenas = resenas.filter(r => r.id !== id);
    mostrarResenas();
}

// ============================
//         FILTROS
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const buscarCurso = document.getElementById("buscarCurso");
    const buscarAlumno = document.getElementById("buscarAlumno");
    const filtrarEstado = document.getElementById("filtrarEstado");

    function filtrar() {
        const cursoVal = buscarCurso.value.toLowerCase();
        const alumnoVal = buscarAlumno.value.toLowerCase();
        const estadoVal = filtrarEstado.value;

        const filtrados = resenas.filter(r => {
            const coincideCurso = r.curso.toLowerCase().includes(cursoVal);
            const coincideAlumno = r.alumno.toLowerCase().includes(alumnoVal);
            const coincideEstado = estadoVal === "" || r.estado === estadoVal;

            return coincideCurso && coincideAlumno && coincideEstado;
        });

        mostrarResenas(filtrados);
    }

    buscarCurso.addEventListener("input", filtrar);
    buscarAlumno.addEventListener("input", filtrar);
    filtrarEstado.addEventListener("change", filtrar);

    // Render inicial
    mostrarResenas();
});
