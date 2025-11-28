// Usuario actual simulado
let usuarioActual = {
    id: 1,
    nombre: "Carlos Maestro",
    rol: "maestro"  // cambiar a "alumno" para probar permisos
};

// Datos falsos del foro
let mensajes = [
    {
        id: 1,
        autorId: 1,
        autorNombre: "Carlos Maestro",
        rol: "maestro",
        texto: "Bienvenidos al curso, aquí pueden dejar sus dudas.",
        fijado: true,
        respuestas: []
    },
    {
        id: 2,
        autorId: 2,
        autorNombre: "Ana Alumna",
        rol: "alumno",
        texto: "Gracias profesor, emocionada por comenzar.",
        fijado: false,
        respuestas: []
    }
];

const contenedor = document.getElementById("foroContainer");
const btnPublicar = document.getElementById("btnPublicar");
const nuevoMensaje = document.getElementById("nuevoMensaje");

// Publicar mensaje
btnPublicar.addEventListener("click", () => {
    if (nuevoMensaje.value.trim() === "") return;

    mensajes.push({
        id: Date.now(),
        autorId: usuarioActual.id,
        autorNombre: usuarioActual.nombre,
        rol: usuarioActual.rol,
        texto: nuevoMensaje.value,
        fijado: false,
        respuestas: []
    });

    nuevoMensaje.value = "";
    mostrarMensajes();
});

// Renderizar mensajes
function mostrarMensajes() {
    // Primero los fijados
    const ordenados = [
        ...mensajes.filter(m => m.fijado),
        ...mensajes.filter(m => !m.fijado)
    ];

    contenedor.innerHTML = "";

    ordenados.forEach(m => {
        contenedor.innerHTML += crearMensajeHTML(m);
    });
}

// Crear mensaje principal
function crearMensajeHTML(m) {
    return `
        <div class="card mb-3 ${m.fijado ? 'border-warning' : ''}">
            <div class="card-body">
                
                <div class="d-flex justify-content-between">
                    <h6>
                        <strong>${m.autorNombre}</strong> 
                        <span class="text-muted">(${m.rol})</span>
                        ${m.fijado ? '<span class="badge bg-warning text-dark ms-2">Fijado</span>' : ''}
                    </h6>
                    
                    <div>
                        ${botonesMensaje(m)}
                    </div>
                </div>

                <p>${m.texto}</p>

                <button class="btn btn-sm btn-link" onclick="responder(${m.id})">Responder</button>

                <div id="respuestas-${m.id}" class="mt-3 ms-4">
                    ${m.respuestas.map(r => crearRespuestaHTML(m.id, r)).join('')}
                </div>
            </div>
        </div>
    `;
}

// Botones disponibles para cada mensaje
function botonesMensaje(m) {
    let html = "";

    if (usuarioActual.id === m.autorId) {
        html += `<button class="btn btn-sm btn-outline-primary text-black" onclick="editar(${m.id})">Editar</button>`;
        html += `<button class="btn btn-sm btn-outline-danger ms-1 text-black" onclick="eliminar(${m.id})">Eliminar</button>`;
    }

    if (usuarioActual.rol === "maestro") {
        html += `<button class="btn btn-sm btn-outline-warning ms-1 text-black" onclick="fijar(${m.id})">${m.fijado ? "Quitar" : "Fijar"}</button>`;
    }

    return html;
}

// Crear respuesta HTML
function crearRespuestaHTML(idMensaje, r) {
    return `
        <div class="border-start ps-3 mb-2">
            <strong>${r.autorNombre}</strong> <span class="text-muted">(${r.rol})</span>
            <p>${r.texto}</p>

            ${r.autorId === usuarioActual.id ?
            `<button class="btn btn-sm btn-outline-primary text-black" onclick="editarRespuesta(${idMensaje}, ${r.id})">Editar</button>
                 <button class="btn btn-sm btn-outline-danger ms-1 text-black" onclick="eliminarRespuesta(${idMensaje}, ${r.id})">Eliminar</button>`
            : ""}
        </div>
    `;
}

// Responder
function responder(id) {
    let texto = prompt("Escribe tu respuesta:");
    if (!texto) return;

    const m = mensajes.find(x => x.id === id);

    m.respuestas.push({
        id: Date.now(),
        autorId: usuarioActual.id,
        autorNombre: usuarioActual.nombre,
        rol: usuarioActual.rol,
        texto
    });

    mostrarMensajes();
}

// Editar mensaje
function editar(id) {
    const m = mensajes.find(x => x.id === id);
    let nuevoTexto = prompt("Edita tu mensaje:", m.texto);
    if (!nuevoTexto) return;

    m.texto = nuevoTexto;
    mostrarMensajes();
}

// Editar respuesta
function editarRespuesta(idMensaje, idRespuesta) {
    const m = mensajes.find(x => x.id === idMensaje);
    const r = m.respuestas.find(x => x.id === idRespuesta);

    let nuevo = prompt("Edita tu respuesta:", r.texto);
    if (!nuevo) return;

    r.texto = nuevo;
    mostrarMensajes();
}

// Eliminar mensaje
function eliminar(id) {
    mensajes = mensajes.filter(x => x.id !== id);
    mostrarMensajes();
}

// Eliminar respuesta
function eliminarRespuesta(idMensaje, idRespuesta) {
    const m = mensajes.find(x => x.id === idMensaje);
    m.respuestas = m.respuestas.filter(r => r.id !== idRespuesta);
    mostrarMensajes();
}

// Fijar mensaje
function fijar(id) {
    const m = mensajes.find(x => x.id === id);
    m.fijado = !m.fijado;
    mostrarMensajes();
}

// Inicial
mostrarMensajes();
