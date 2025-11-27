// Restablecer contraseña

// Mostrar popup de error
function showError(msg) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = msg;
    alertBox.classList.remove("d-none");

    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 3000);
}

// PASO 1
function sendCode() {
    const email = document.getElementById("resetEmail").value.trim();

    if (email === "") {
        showError("Por favor ingresa tu correo.");
        return;
    }

    // Simula envío
    document.getElementById("step1").classList.add("d-none");
    document.getElementById("step2").classList.remove("d-none");
}

// PASO 2
function verifyCode() {
    const code = document.getElementById("resetCode").value.trim();

    if (code === "") {
        showError("Por favor ingresa el código.");
        return;
    }

    // Simula validación
    document.getElementById("step2").classList.add("d-none");
    document.getElementById("step3").classList.remove("d-none");
}

// PASO 3
function changePass() {
    const pass1 = document.getElementById("newPass").value.trim();
    const pass2 = document.getElementById("confirmPass").value.trim();

    if (pass1 === "" || pass2 === "") {
        showError("Por favor ingresa y confirma tu contraseña.");
        return;
    }

    if (pass1 !== pass2) {
        showError("Las contraseñas no coinciden.");
        return;
    }

    // Simula cambio de contraseña
    window.location.href = "login.html";
}

// Login

// Popup Login
document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.querySelector("button[type='submit']");
    const emailInput = document.getElementById("typeEmailX");
    const passwordInput = document.getElementById("typePasswordX");

    const popup = document.getElementById("popupAlert");
    const popupMessage = document.getElementById("popupMessage");
    const closePopup = document.getElementById("closePopup");

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
    }

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    btnLogin.addEventListener("click", function (event) {
        event.preventDefault(); // evita enviar formulario

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" && password === "") {
            showPopup("Por favor ingresa tu correo y contraseña.");
            return;
        }
        if (email === "") {
            showPopup("Por favor ingresa tu correo.");
            return;
        }
        if (password === "") {
            showPopup("Por favor ingresa tu contraseña.");
            return;
        }

        // ✔ Aquí luego harás la petición al backend para validar al usuario
        // Por ahora solo simulamos que se inicia sesión
        showPopup("Iniciando sesión...");
        setTimeout(() => {
            // Aquí redirigirás según rol en tu backend real
            window.location.href = "dashboard.html";
        }, 1000);
    });
});

// Perfil
// Cambio de contraseña
function validarCambioPass() {
    let actual = document.getElementById("passActual").value.trim();
    let nueva = document.getElementById("passNueva").value.trim();
    let repite = document.getElementById("passRepite").value.trim();

    if (actual === "" || nueva === "" || repite === "") {
        mostrarPopup("Por favor completa todos los campos");
        return;
    }

    if (nueva.length < 6) {
        mostrarPopup("La nueva contraseña debe tener al menos 6 caracteres");
        return;
    }

    if (nueva !== repite) {
        mostrarPopup("Las contraseñas no coinciden");
        return;
    }

    mostrarPopup("Contraseña actualizada correctamente ✔️");
}

function mostrarPopup(mensaje) {
    document.getElementById("popupTexto").innerText = mensaje;
    let popup = new bootstrap.Modal(document.getElementById("popupMensaje"));
    popup.show();
}


// CRUD USUARIOS

let usuarios = [];
const tablaUsuarios = document.getElementById("tablaUsuarios");
const formUsuario = document.getElementById("formUsuario");

formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("usuarioId").value;
    const nombre = document.getElementById("usuarioNombre").value;
    const email = document.getElementById("usuarioEmail").value;
    const rol = document.getElementById("usuarioRol").value;

    if (id === "") {
        usuarios.push({ id: Date.now(), nombre, email, rol });
    } else {
        const u = usuarios.find(x => x.id == id);
        u.nombre = nombre;
        u.email = email;
        u.rol = rol;
    }

    formUsuario.reset();
    mostrarUsuarios();
    bootstrap.Modal.getInstance(document.getElementById("modalUsuario")).hide();
});

function mostrarUsuarios() {
    tablaUsuarios.innerHTML = "";
    usuarios.forEach(u => {
        tablaUsuarios.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.rol}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${u.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${u.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editarUsuario(id) {
    const u = usuarios.find(x => x.id == id);
    document.getElementById("usuarioId").value = u.id;
    document.getElementById("usuarioNombre").value = u.nombre;
    document.getElementById("usuarioEmail").value = u.email;
    document.getElementById("usuarioRol").value = u.rol;

    new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

function eliminarUsuario(id) {
    usuarios = usuarios.filter(x => x.id != id);
    mostrarUsuarios();
}


//CRUD Valdiación Cursos
// Cursos de prueba (esto luego vendrá de PHP)
const cursos = [
    {
        id: 101,
        titulo: "Introducción a CSS",
        maestro: "Laura Gómez",
        fecha: "2023-10-10",
        archivos: ["programa.pdf", "imagen.jpg"]
    },
    {
        id: 102,
        titulo: "Diseño UX Básico",
        maestro: "Mario Ruiz",
        fecha: "2023-10-12",
        archivos: ["temario.pdf", "portada.png"]
    }
];

const tabla = document.getElementById("lista-cursos");

function cargarCursos() {
    tabla.innerHTML = "";
    cursos.forEach(curso => {
        tabla.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.titulo}</td>
                <td>${curso.maestro}</td>
                <td>${curso.fecha}</td>
                <td>
                    <button class="btn btn-detalles" onclick="verDetalles(${curso.id})">Ver Detalles</button>
                    <button class="btn btn-aprobar" onclick="aprobar(${curso.id})">Aprobar</button>
                    <button class="btn btn-rechazar" onclick="abrirModalRechazo(${curso.id})">Rechazar</button>
                </td>
            </tr>
        `;
    });
}

cargarCursos();

// 🔵 Modal Detalles
const modalDetalles = document.getElementById("modalDetalles");
const modalRechazar = document.getElementById("modalRechazar");
let cursoActual = null;

function verDetalles(id) {
    const curso = cursos.find(c => c.id === id);
    cursoActual = curso;

    document.getElementById("det-id").textContent = curso.id;
    document.getElementById("det-titulo").textContent = curso.titulo;
    document.getElementById("det-maestro").textContent = curso.maestro;

    const listaArch = document.getElementById("det-archivos");
    listaArch.innerHTML = "";
    curso.archivos.forEach(a => {
        listaArch.innerHTML += `<li>${a}</li>`;
    });

    modalDetalles.style.display = "flex";
}

document.querySelector(".cerrar").onclick = () => {
    modalDetalles.style.display = "none";
};

//  Aprobar curso
function aprobar(id) {
    alert("Curso " + id + " aprobado ✔");

    // Aquí iría tu fetch() hacia aprobar.php
    // fetch("aprobar.php", { method: "POST", body: ... })
}

//  Rechazar curso
function abrirModalRechazo(id) {
    cursoActual = id;
    modalRechazar.style.display = "flex";
}

document.querySelector(".cerrarR").onclick = () => {
    modalRechazar.style.display = "none";
};

document.getElementById("btnConfirmarRechazo").onclick = () => {
    const motivo = document.getElementById("motivoRechazo").value;

    if (motivo.trim() === "") {
        alert("Debes escribir un motivo");
        return;
    }

    alert("Curso " + cursoActual + " rechazado por: " + motivo);

    modalRechazar.style.display = "none";

    // Aquí se enviaría a rechazo.php con fetch()
};


// Moderacion de reseñas
document.addEventListener("DOMContentLoaded", function () {
    const buscarCurso = document.getElementById("buscarCurso");
    const buscarAlumno = document.getElementById("buscarAlumno");
    const filtrarEstado = document.getElementById("filtrarEstado");

    const tabla = document.querySelectorAll("#tablaResenas tr");

    function filtrar() {
        const cursoVal = buscarCurso.value.toLowerCase();
        const alumnoVal = buscarAlumno.value.toLowerCase();
        const estadoVal = filtrarEstado.value;

        tabla.forEach(row => {
            const curso = row.children[0].textContent.toLowerCase();
            const alumno = row.children[1].textContent.toLowerCase();
            const estado = row.children[4].textContent.trim();

            const coincideCurso = curso.includes(cursoVal);
            const coincideAlumno = alumno.includes(alumnoVal);
            const coincideEstado = estadoVal === "" || estado.includes(estadoVal);

            row.style.display = (coincideCurso && coincideAlumno && coincideEstado) ? "" : "none";
        });
    }

    buscarCurso.addEventListener("input", filtrar);
    buscarAlumno.addEventListener("input", filtrar);
    filtrarEstado.addEventListener("change", filtrar);
});



// Estadisticas globales
// =============================
//     MOCK DATA (Datos falsos)
// =============================
let stats = {
    usuarios: 128,
    cursos: 34,
    suscripciones: 89,
    comentarios: 542,
    precio: 199
};

// Cargar datos falsos al iniciar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("usuariosRegistrados").innerText = stats.usuarios;
    document.getElementById("cursosActivos").innerText = stats.cursos;
    document.getElementById("suscripcionesActivas").innerText = stats.suscripciones;
    document.getElementById("comentariosTotales").innerText = stats.comentarios;
    document.getElementById("precioActual").innerText = `$${stats.precio} MXN`;
});

// =============================
//      Actualizar precio
// =============================
function actualizarPrecio() {
    const nuevo = document.getElementById("nuevoPrecio").value;

    if (!nuevo || nuevo <= 0) {
        alert("Ingresa un precio válido.");
        return;
    }

    stats.precio = nuevo;

    document.getElementById("precioActual").innerText = `$${stats.precio} MXN`;
    document.getElementById("nuevoPrecio").value = "";

    alert("Precio actualizado (dato falso, modo pruebas).");
}


// ---------------------------
// CRUD CURSOS Y RESEÑAS
// ---------------------------

