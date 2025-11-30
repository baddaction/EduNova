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
            const estaInscrito = data.inscrito;
            const resenas = data.resenas;

            // Llenar info básica
            document.getElementById("cursoNombre").textContent = curso.titulo;
            document.getElementById("cursoDescripcion").textContent = curso.descripcion;
            const imgElement = document.getElementById("cursoImagen");
            imgElement.src = curso.imagen ? path + curso.imagen : 'https://via.placeholder.com/600x400';
            document.getElementById("instructorNombre").textContent = curso.instructor;

            // LÓGICA DEL BOTÓN DE INSCRIPCIÓN Y FORO
            const formResena = document.getElementById("formResenaContainer");

            if (estaInscrito) {
                // Si ya está inscrito
                btnInscribir.textContent = "Ya estás inscrito ✔";
                btnInscribir.classList.remove("btn-primary");
                btnInscribir.classList.add("btn-success");
                btnInscribir.disabled = true;

                // Botón Foro
                const btnForo = document.createElement("a");
                btnForo.href = path + "foro.php?id=" + idCurso;
                btnForo.className = "btn btn-outline-primary text-black ms-2 mt-3";
                btnForo.innerHTML = '<i class="bi bi-chat-dots"></i> Foro del Curso';
                btnInscribir.parentNode.appendChild(btnForo);

                // Mostrar formulario de reseña
                if (formResena) formResena.style.display = "block";
            } else {
                // Si no está inscrito
                btnInscribir.textContent = "Inscribirse Ahora";
                btnInscribir.onclick = function () {
                    inscribirseCurso(idCurso, path);
                };
                // Ocultar formulario de reseña
                if (formResena) formResena.style.display = "none";
            }

            // EVENTO ENVIAR RESEÑA 
            const btnEnviarR = document.getElementById("btnEnviarResena");
            if (btnEnviarR) {
                const newBtn = btnEnviarR.cloneNode(true);
                btnEnviarR.parentNode.replaceChild(newBtn, btnEnviarR);

                newBtn.addEventListener("click", function () {
                    const comentario = document.getElementById("txtResena").value;

                    fetch(path + 'php/alumno_guardar_resena.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_curso: idCurso, comentario: comentario })
                    })
                        .then(res => res.json())
                        .then(data => {
                            alert(data.message);
                            if (data.success) {
                                document.getElementById("txtResena").value = "";
                            }
                        });
                });
            }

            // LLENAR TEMARIO
            const divTemario = document.getElementById("cursoTemario");
            divTemario.innerHTML = "";
            if (temas.length > 0) {
                let htmlTemas = '<div class="accordion" id="accordionTemas">';
                temas.forEach((tema, index) => {
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

            // LLENAR RESEÑAS 
            const divResenas = document.getElementById("cursoReseñas");
            divResenas.innerHTML = "";

            if (resenas && resenas.length > 0) {
                resenas.forEach(r => {
                    const fecha = new Date(r.fecha).toLocaleDateString();

                    const cardHtml = `
                        <div class="col-12 mb-3">
                            <div class="card border-0 shadow-sm bg-light">
                                <div class="card-body">
                                    <h6 class="card-subtitle mb-2 fw-bold text-primary">
                                        <i class="bi bi-person-circle"></i> ${r.usuario}
                                        <small class="text-muted ms-2 fw-light" style="font-size: 0.8rem;">${fecha}</small>
                                    </h6>
                                    <p class="card-text text-dark">${r.comentario}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    divResenas.innerHTML += cardHtml;
                });
            } else {
                divResenas.innerHTML = '<div class="col-12"><p class="text-muted fst-italic">Aún no hay reseñas aprobadas para este curso.</p></div>';
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
                location.reload();
            } else {
                alert(data.message);
                if (data.message.includes("iniciar sesión")) {
                    window.location.href = "login.html";
                }
            }
        })
        .catch(err => console.error(err));
}