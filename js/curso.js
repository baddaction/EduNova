document.addEventListener("DOMContentLoaded", function () {
    
    // Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // Definimos path base
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

            // Llenar la información Principal
            document.getElementById("cursoNombre").textContent = curso.titulo;
            document.getElementById("cursoDescripcion").textContent = curso.descripcion;
            
            // Imagen del curso
            const imgElement = document.getElementById("cursoImagen");
            const rutaImagen = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/600x400?text=Curso';
            imgElement.src = rutaImagen;

            // Datos del Instructor
            document.getElementById("instructorNombre").textContent = curso.instructor;
            document.getElementById("instructorBio").textContent = "Instructor certificado de EduNova"; 
            document.getElementById("instructorImagen").src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

            // LLENAR TEMARIO (CON ARCHIVOS)
            const divTemario = document.getElementById("cursoTemario");
            divTemario.innerHTML = ""; 

            if (temas.length > 0) {
                let htmlTemas = '<div class="accordion" id="accordionTemas">';
                
                temas.forEach((tema, index) => {
                    // Lógica para mostrar botón de archivo si existe
                    let botonArchivo = '';
                    if (tema.archivo) {
                        botonArchivo = `
                            <div class="mt-3 pt-3 border-top">
                                <h6 class="fw-bold text-primary"><i class="bi bi-paperclip"></i> Recursos:</h6>
                                <a href="${path + tema.archivo}" target="_blank" class="btn btn-outline-primary text-black btn-sm">
                                    <i class="bi bi-eye"></i> Ver Material
                                </a>
                            </div>
                        `;
                    }

                    htmlTemas += `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                                    ${index + 1}. ${tema.titulo}
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#accordionTemas">
                                <div class="accordion-body">
                                    <p class="text-muted mb-2">${tema.descripcion || 'Sin descripción.'}</p>
                                    ${botonArchivo}
                                </div>
                            </div>
                        </div>
                    `;
                });
                htmlTemas += '</div>';
                divTemario.innerHTML = htmlTemas;
            } else {
                divTemario.innerHTML = '<div class="alert alert-light border text-center">El maestro aún no ha publicado contenido.</div>';
            }

            // Llenar Reseñas
            const divResenas = document.getElementById("cursoReseñas");
            divResenas.innerHTML = "";

            if (resenas.length > 0) {
                // Aquí iría el loop de reseñas (pendiente hasta que hagamos esa parte)
            } else {
                divResenas.innerHTML = '<p class="text-muted">Aún no hay reseñas para este curso.</p>';
            }

        })
        .catch(error => {
            console.error(error);
            // alert("Error al cargar los detalles del curso."); // Comentado para no molestar si hay error menor
        });
});