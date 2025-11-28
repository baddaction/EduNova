//CRUD Valdiación Cursos
// Cursos de prueba (esto luego vendrá de PHP)
const cursos = [
    {
        id: 101,
        titulo: "Introducción a CSS",
        maestro: "Laura Gómez",
        fecha: "2023-10-10",
        archivos: ["programa.pdf", "imagen.jpg"]
    },
    {
        id: 102,
        titulo: "Diseño UX Básico",
        maestro: "Mario Ruiz",
        fecha: "2023-10-12",
        archivos: ["temario.pdf", "portada.png"]
    }
];

const tabla = document.getElementById("lista-cursos");

function cargarCursos() {
    tabla.innerHTML = "";
    cursos.forEach(curso => {
        tabla.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.titulo}</td>
                <td>${curso.maestro}</td>
                <td>${curso.fecha}</td>
                <td>
                    <button class="btn btn-detalles" onclick="verDetalles(${curso.id})">Ver Detalles</button>
                    <button class="btn btn-aprobar" onclick="aprobar(${curso.id})">Aprobar</button>
                    <button class="btn btn-rechazar" onclick="abrirModalRechazo(${curso.id})">Rechazar</button>
                </td>
            </tr>
        `;
    });
}

cargarCursos();

// 🔵 Modal Detalles
const modalDetalles = document.getElementById("modalDetalles");
const modalRechazar = document.getElementById("modalRechazar");
let cursoActual = null;

function verDetalles(id) {
    const curso = cursos.find(c => c.id === id);
    cursoActual = curso;

    document.getElementById("det-id").textContent = curso.id;
    document.getElementById("det-titulo").textContent = curso.titulo;
    document.getElementById("det-maestro").textContent = curso.maestro;

    const listaArch = document.getElementById("det-archivos");
    listaArch.innerHTML = "";
    curso.archivos.forEach(a => {
        listaArch.innerHTML += `<li>${a}</li>`;
    });

    modalDetalles.style.display = "flex";
}

document.querySelector(".cerrar").onclick = () => {
    modalDetalles.style.display = "none";
};

//  Aprobar curso
function aprobar(id) {
    alert("Curso " + id + " aprobado ✔");

    // Aquí iría tu fetch() hacia aprobar.php
    // fetch("aprobar.php", { method: "POST", body: ... })
}

//  Rechazar curso
function abrirModalRechazo(id) {
    cursoActual = id;
    modalRechazar.style.display = "flex";
}

document.querySelector(".cerrarR").onclick = () => {
    modalRechazar.style.display = "none";
};

document.getElementById("btnConfirmarRechazo").onclick = () => {
    const motivo = document.getElementById("motivoRechazo").value;

    if (motivo.trim() === "") {
        alert("Debes escribir un motivo");
        return;
    }

    alert("Curso " + cursoActual + " rechazado por: " + motivo);

    modalRechazar.style.display = "none";

    // Aquí se enviaría a rechazo.php con fetch()
};