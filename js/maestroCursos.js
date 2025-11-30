document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("misCursosContainer");
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    contenedor.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div><p>Cargando tus cursos...</p></div>';

    fetch(path + 'php/maestro_listar_mis_cursos.php')
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ""; // Limpiar spinner

            if (data.success && data.cursos.length > 0) {

                data.cursos.forEach(curso => {
                    const imgUrl = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/300x200?text=Curso';

                    // Lógica de colores para el estado
                    let badgeColor = "bg-secondary";
                    let estadoTexto = curso.estado; // pendiente, activo, rechazado

                    if (curso.estado === 'activo') {
                        badgeColor = "bg-success";
                        estadoTexto = "Publicado";
                    } else if (curso.estado === 'pendiente') {
                        badgeColor = "bg-warning text-dark";
                        estadoTexto = "En Revisión";
                    } else if (curso.estado === 'rechazado') {
                        badgeColor = "bg-danger";
                        estadoTexto = "Rechazado";
                    }

                    const htmlCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm border-0">
                                <div class="position-relative">
                                    <img src="${imgUrl}" class="card-img-top" alt="${curso.titulo}" style="height: 200px; object-fit: cover;">
                                    <span class="position-absolute top-0 end-0 m-2 badge ${badgeColor}">
                                        ${estadoTexto}
                                    </span>
                                </div>
                                
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold">${curso.titulo}</h5>
                                    <p class="card-text text-muted small">
                                        ${curso.descripcion ? curso.descripcion.substring(0, 80) + '...' : 'Sin descripción'}
                                    </p>
                                    
                                    <div class="mt-auto d-flex gap-2">
                                        <a href="administrar_curso.php?id=${curso.id}" class="btn btn-dark flex-grow-1">
                                            <i class="bi bi-gear-fill"></i> Administrar
                                        </a>
                                        <a href="curso.php?id=${curso.id}" class="btn btn-outline-secondary text-black">
                                            <i class="bi bi-eye"></i>
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
                        <div class="alert alert-light border">
                            <h4>No has creado ningún curso aún.</h4>
                            <p>¡Anímate a compartir tu conocimiento!</p>
                            <a href="crearCurso.php" class="btn btn-primary mt-2">+ Crear Nuevo Curso</a>
                        </div>
                    </div>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<p class="text-danger text-center">Ocurrió un error al cargar tus cursos.</p>';
        });
});