document.addEventListener("DOMContentLoaded", function () {
    
    // Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    if (!id) {
        alert("No se especificó ningún curso.");
        window.location.href = "masCursos.php";
        return;
    }

    // Pedir datos al servidor
    fetch(path + 'php/public_detalle_curso.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                document.querySelector(".container").innerHTML = `<h2 class='text-center mt-5'>${data.message}</h2>`;
                return;
            }

            const curso = data.curso;
            const temas = data.temas;
            const resenas = data.resenas;

            // Llenar la información en el HTML
            // Título y Descripción
            document.getElementById("cursoNombre").textContent = curso.titulo;
            document.getElementById("cursoDescripcion").textContent = curso.descripcion;
            
            // Imagen
            const imgElement = document.getElementById("cursoImagen");
            // Si la imagen viene de BD usa esa ruta, si no, usa un placeholder
            const rutaImagen = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/600x400?text=Curso';
            imgElement.src = rutaImagen;

            // Instructor
            document.getElementById("instructorNombre").textContent = curso.instructor;
            document.getElementById("instructorBio").textContent = "Instructor de EduNova";
            // Imagen instructor por defecto
            document.getElementById("instructorImagen").src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

            // Llenar Temario (Dinámico)
            const divTemario = document.getElementById("cursoTemario");
            divTemario.innerHTML = ""; // Limpiar

            if (temas.length > 0) {
                let htmlTemas = '<div class="accordion" id="accordionTemas">';
                temas.forEach((tema, index) => {
                    htmlTemas += `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                                    ${tema.titulo}
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#accordionTemas">
                                <div class="accordion-body">
                                    ${tema.descripcion || 'Sin descripción.'}
                                </div>
                            </div>
                        </div>
                    `;
                });
                htmlTemas += '</div>';
                divTemario.innerHTML = htmlTemas;
            } else {
                divTemario.innerHTML = '<div class="alert alert-light border">El maestro aún no ha publicado el temario de este curso.</div>';
            }

            // Llenar Reseñas
            const divResenas = document.getElementById("cursoReseñas");
            divResenas.innerHTML = "";

            if (resenas.length > 0) {
                // Aquí iría el loop de reseñas
            } else {
                divResenas.innerHTML = '<p class="text-muted">Aún no hay reseñas para este curso.</p>';
            }

        })
        .catch(error => {
            console.error(error);
            alert("Error al cargar los detalles del curso.");
        });
});