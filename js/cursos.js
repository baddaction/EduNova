document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("temasContainer");
    
    // Ruta base segura
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    // Mensaje de carga
    contenedor.innerHTML = '<p class="text-center text-muted">Cargando catálogo...</p>';

    fetch(path + 'php/public_listar_cursos.php')
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ""; // Limpiar

            if (data.success && data.cursos.length > 0) {
                
                data.cursos.forEach(curso => {
                    // Ruta de imagen segura
                    const imgUrl = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/300x200?text=Curso';
                    // Nombre del instructor
                    const instructor = curso.instructor || "Instructor EduNova";

                    const htmlCurso = `
                        <div class="row align-items-center mb-4 pb-4 border-bottom">
                            
                            <div class="col-md-4">
                                <img src="${imgUrl}" class="img-fluid rounded shadow-sm" alt="${curso.titulo}" style="object-fit: cover; width:100%; max-height: 250px;">
                            </div>

                            <div class="col-md-8">
                                <h4 class="fw-bold">${curso.titulo}</h4>

                                <p class="text-muted">${curso.descripcion}</p>

                                <p><strong>Impartido por:</strong> ${instructor}</p>

                                <div class="d-flex gap-3">
                                    <a href="curso.php?id=${curso.id}" class="btn btn-primary">Ver Detalles</a>
                                    <a href="curso.php?id=${curso.id}" class="btn btn-outline-secondary text-black">Ver Temario</a>
                                </div>
                            </div>
                        </div>
                    `;

                    contenedor.innerHTML += htmlCurso;
                });

            } else {
                contenedor.innerHTML = '<div class="alert alert-info text-center">No hay cursos disponibles por ahora.</div>';
            }
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<p class="text-danger text-center">Ocurrió un error al cargar los cursos.</p>';
        });
});