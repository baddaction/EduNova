document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("misCursosContainer");
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    // Mensaje de carga
    contenedor.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Cargando tus cursos...</p></div>';

    fetch(path + 'php/alumno_listar_cursos.php')
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ""; // Limpiar

            if (data.success && data.cursos.length > 0) {
                
                data.cursos.forEach(curso => {
                    const imgUrl = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/300x200?text=Curso';

                    // Plantilla de Tarjeta
                    const htmlCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${imgUrl}" class="card-img-top" alt="${curso.titulo}" style="height: 200px; object-fit: cover;">
                                
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold">${curso.titulo}</h5>
                                    <p class="card-text text-muted small">
                                        ${curso.descripcion.substring(0, 80)}...
                                    </p>
                                    
                                    <div class="mt-auto">
                                        <a href="curso.php?id=${curso.id}" class="btn btn-primary w-100">
                                            <i class="bi bi-play-circle"></i> Ir a Clases
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    contenedor.innerHTML += htmlCard;
                });

            } else {
                contenedor.innerHTML = `
                    <div class="col-12 text-center mt-5">
                        <div class="alert alert-light">
                            <h4>Aún no tienes cursos inscritos.</h4>
                            <p>Explora nuestro catálogo y empieza a aprender hoy.</p>
                            <a href="masCursos.php" class="btn btn-outline-primary text-black mt-2">Ver Catálogo</a>
                        </div>
                    </div>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<p class="text-danger text-center">Error al cargar tus cursos.</p>';
        });
});