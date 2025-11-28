const temas = [
    {
        id: 1,
        titulo: "Introducción a HTML",
        descripcion: "Aprende la estructura básica de una página web moderna.",
        instructor: "Carlos Ramírez",
        imagen: "img/clase.webp"
    },
    {
        id: 2,
        titulo: "Estilos con CSS",
        descripcion: "Domina CSS para crear diseños visuales profesionales.",
        instructor: "Laura Suárez",
        imagen: "img/CursoIa.webp"
    },
    {
        id: 3,
        titulo: "JavaScript Básico",
        descripcion: "Agrega lógica e interactividad a tus sitios web.",
        instructor: "Miguel Torres",
        imagen: "img/js.png"
    }
];

const contenedor = document.getElementById("temasContainer");

temas.forEach(tema => {
    contenedor.innerHTML += `
        <div class="row align-items-center mb-4 pb-4 border-bottom">
            
            <div class="col-md-4">
                <img src="${tema.imagen}" class="img-fluid rounded" alt="${tema.titulo}">
            </div>

            <div class="col-md-8">
                <h4>${tema.titulo}</h4>

                <p class="text-muted">${tema.descripcion}</p>

                <p><strong>Impartido por:</strong> ${tema.instructor}</p>

                <div class="d-flex gap-3">
                    <a href="ver_tema.html?id=${tema.id}" class="btn btn-primary">Ver Tema</a>
                    <a href="recursos.html?id=${tema.id}" class="btn btn-outline-secondary text-black">Recursos</a>
                </div>
            </div>
        </div>
    `;
});
