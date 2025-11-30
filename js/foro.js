document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idCurso = params.get("id");

    const btnVolver = document.getElementById("btnVolverCurso");
    if (btnVolver && idCurso) btnVolver.href = "curso.php?id=" + idCurso;

    if (!idCurso) {
        alert("Curso no especificado");
        window.location.href = "index.php";
        return;
    }

    // Cargar Lista de Hilos al iniciar
    cargarHilos(idCurso);

    // Evento Crear Nuevo Hilo
    document.getElementById("formNuevoHilo").addEventListener("submit", function (e) {
        e.preventDefault();
        const titulo = document.getElementById("nuevoTitulo").value;
        const mensaje = document.getElementById("nuevoMensaje").value;

        fetch(basePath + 'php/foro_crear_hilo.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_curso: idCurso, titulo: titulo, mensaje: mensaje })
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    // Cerrar modal y recargar lista
                    const modal = bootstrap.Modal.getInstance(document.getElementById('modalNuevoHilo'));
                    modal.hide();
                    document.getElementById("formNuevoHilo").reset();
                    cargarHilos(idCurso);
                }
            });
    });

    // Evento Responder en un hilo
    document.getElementById("formResponder").addEventListener("submit", function (e) {
        e.preventDefault();
        const mensaje = document.getElementById("txtRespuesta").value;
        // El ID del hilo activo lo guardamos en el contenedor al abrirlo
        const idHilo = document.getElementById("contenedorPosts").dataset.idHiloActivo;

        fetch(basePath + 'php/foro_responder.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_hilo: idHilo, mensaje: mensaje })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("txtRespuesta").value = "";
                    verHilo(idHilo); // Recargar mensajes
                }
            });
    });
});

// Cargar lista de temas
function cargarHilos(idCurso) {
    const contenedor = document.getElementById("contenedorHilos");
    contenedor.innerHTML = '<div class="text-center p-3">Cargando temas...</div>';

    fetch(basePath + 'php/foro_listar_hilos.php?id_curso=' + idCurso)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = "";
            if (data.success && data.hilos.length > 0) {
                data.hilos.forEach(h => {
                    const item = `
                    <button class="list-group-item list-group-item-action p-3" onclick="verHilo(${h.id})">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 text-primary fw-bold">${h.titulo}</h5>
                            <small class="text-muted">${h.fecha}</small>
                        </div>
                        <p class="mb-1 text-muted small">
                            <i class="bi bi-chat-left-text"></i> ${h.respuestas} mensajes
                        </p>
                    </button>
                `;
                    contenedor.innerHTML += item;
                });
            } else {
                contenedor.innerHTML = '<div class="alert alert-light text-center">No hay temas aún. ¡Crea el primero!</div>';
            }
        });
}

// Entrar a ver un hilo (Cambio de vista)
function verHilo(idHilo) {
    // Ocultar lista, mostrar conversacion
    document.getElementById("vistaLista").style.display = "none";
    document.getElementById("vistaConversacion").style.display = "block";

    // Guardar ID activo para poder responder
    const contenedorPosts = document.getElementById("contenedorPosts");
    contenedorPosts.dataset.idHiloActivo = idHilo;
    contenedorPosts.innerHTML = '<div class="text-center p-3">Cargando conversación...</div>';

    fetch(basePath + 'php/foro_ver_posts.php?id_hilo=' + idHilo)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("tituloHiloActivo").textContent = data.titulo;
                contenedorPosts.innerHTML = "";

                data.posts.forEach(p => {
                    // Diferenciar estilo si soy yo o el maestro
                    let badge = "";
                    if (p.rol === 'maestro') badge = '<span class="badge bg-warning text-dark ms-2">Instructor</span>';
                    if (p.rol === 'admin') badge = '<span class="badge bg-danger ms-2">Admin</span>';

                    const htmlPost = `
                    <div class="card mb-3 border-0">
                        <div class="card-body p-3">
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold text-primary">
                                    <i class="bi bi-person-circle"></i> ${p.autor} ${badge}
                                </h6>
                                <small class="text-muted" style="font-size:0.8rem">${p.fecha}</small>
                            </div>
                            <div class="mt-2 text-dark" style="white-space: pre-wrap;">${p.mensaje}</div>
                        </div>
                        <hr class="my-0 text-muted" style="opacity: 0.1;">
                    </div>
                `;
                    contenedorPosts.innerHTML += htmlPost;
                });

                // Scroll al fondo
                contenedorPosts.scrollTop = contenedorPosts.scrollHeight;
            }
        });
}

// Volver atras
function volverALista() {
    document.getElementById("vistaConversacion").style.display = "none";
    document.getElementById("vistaLista").style.display = "block";
    // Recargar lista por si hubo cambios
    const params = new URLSearchParams(window.location.search);
    cargarHilos(params.get("id"));
}