// Datos falsos por ahora
let cursos = [
    {
        id: 1,
        titulo: "Diseño Web",
        temas: [
            {
                id: 1,
                titulo: "Introducción al curso",
                descripcion: "Bienvenida y explicación general.",
                video: "https://www.youtube.com/embed/kt3W2kfNt74",
                recursos: ["guia.pdf", "introduccion.png"]
            },
            {
                id: 2,
                titulo: "HTML Básico",
                descripcion: "Aprende la estructura de una página web.",
                video: "https://www.youtube.com/embed/qz0aGYrrlhU",
                recursos: ["ejemplos.zip"]
            },
            {
                id: 3,
                titulo: "CSS Básico",
                descripcion: "Primeros pasos con estilos.",
                video: "https://www.youtube.com/embed/1Rs2ND1ryYc",
                recursos: ["plantillas.css"]
            }
        ]
    }
];

// -------------------------------
// OBTENER PARÁMETROS DE LA URL
// -------------------------------
const url = new URLSearchParams(window.location.search);
const cursoId = parseInt(url.get("curso"));
const temaId = parseInt(url.get("tema"));

const curso = cursos.find(c => c.id === cursoId);
const tema = curso.temas.find(t => t.id === temaId);

// Rellenar contenido
document.getElementById("temaTitulo").textContent = tema.titulo;
document.getElementById("temaDescripcion").textContent = tema.descripcion;
document.getElementById("temaVideo").src = tema.video;

// Recursos
const listaRecursos = document.getElementById("listaRecursos");
tema.recursos.forEach(r => {
    listaRecursos.innerHTML += `
        <li class="list-group-item">
            <a href="recursos/${r}" download>${r}</a>
        </li>
    `;
});

// Navegación
document.getElementById("btnAnterior").onclick = () => {
    if (temaId > 1) {
        window.location.href = `tema.html?curso=${cursoId}&tema=${temaId - 1}`;
    }
};

document.getElementById("btnSiguiente").onclick = () => {
    if (temaId < curso.temas.length) {
        window.location.href = `tema.html?curso=${cursoId}&tema=${temaId + 1}`;
    }
};
