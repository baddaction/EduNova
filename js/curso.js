document.addEventListener("DOMContentLoaded", function () {
    
    const params = new URLSearchParams(window.location.search);
    const idCurso = params.get("id");
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    if (!idCurso) {
        window.location.href = "masCursos.php";
        return;
    }

    // Referencias al botón
    const btnInscribir = document.getElementById("btnInscribirse");

    // CARGAR DATOS
    fetch(path + 'php/public_detalle_curso.php?id=' + idCurso)
        .then(response => response.json())
        .then(data => {
            if (!data.success) return;

            const curso = data.curso;
            const temas = data.temas;
            const estaInscrito = data.inscrito; // true o false

            // Llenar info básica
            document.getElementById("cursoNombre").textContent = curso.titulo;
            document.getElementById("cursoDescripcion").textContent = curso.descripcion;
            const imgElement = document.getElementById("cursoImagen");
            imgElement.src = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/600x400';
            document.getElementById("instructorNombre").textContent = curso.instructor;

            // LÓGICA DEL BOTÓN DE INSCRIPCIÓN
            if (estaInscrito) {
               // Si ya está inscrito
                btnInscribir.textContent = "Ya estás inscrito ✔";
                btnInscribir.classList.remove("btn-primary");
                btnInscribir.classList.add("btn-success");
                btnInscribir.disabled = true; 
                const btnForo = document.createElement("a");
                btnForo.href = path + "foro.php?id=" + idCurso; // Enlace al foro con ID
                btnForo.className = "btn btn-outline-primary text-black ms-2 mt-3";
                btnForo.innerHTML = '<i class="bi bi-chat-dots"></i> Foro del Curso';
                
                // Lo insertamos después del botón de inscripción
                btnInscribir.parentNode.appendChild(btnForo);
                // --------------------------------------
            } else {
                // Si no está inscrito, activamos el evento click
                btnInscribir.textContent = "Inscribirse Ahora";
                btnInscribir.onclick = function() {
                    inscribirseCurso(idCurso, path);
                };
            }

            // Llenar Temario
            const divTemario = document.getElementById("cursoTemario");
            divTemario.innerHTML = ""; 
            if (temas.length > 0) {
                let htmlTemas = '<div class="accordion" id="accordionTemas">';
                temas.forEach((tema, index) => {
                    // OJO: Podrías ocultar el botón 'Ver Material' aquí si !estaInscrito
                    // Por ahora lo dejamos visible.
                    let botonArchivo = tema.archivo ? 
                        `<div class="mt-2"><a href="${path + tema.archivo}" target="_blank" class="btn btn-sm btn-outline-primary text-black">Ver Material</a></div>` : '';

                    htmlTemas += `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                                    ${tema.titulo}
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse">
                                <div class="accordion-body text-muted">
                                    ${tema.descripcion}
                                    ${botonArchivo}
                                </div>
                            </div>
                        </div>`;
                });
                divTemario.innerHTML = htmlTemas + '</div>';
            } else {
                divTemario.innerHTML = '<p class="text-muted">Sin temas.</p>';
            }
        });
});

// FUNCIÓN PARA INSCRIBIRSE
function inscribirseCurso(idCurso, path) {
    fetch(path + 'php/alumno_inscribir.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_curso: idCurso })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("¡Felicidades! Te has inscrito al curso.");
            location.reload(); // Recargamos para que el botón cambie a "Inscrito"
        } else {
            alert(data.message);
            // Si dice que debe iniciar sesión, lo mandamos al login
            if(data.message.includes("iniciar sesión")) {
                window.location.href = "login.html";
            }
        }
    })
    .catch(err => console.error(err));
}