// js/adminUsuarios.js

document.addEventListener("DOMContentLoaded", function () {
    // Verificar que estamos en la pestaña correcta antes de llamar
    if (document.getElementById("tablaUsuarios")) {
        cargarUsuarios();
    }
});

let usuariosCache = [];

// CARGAR USUARIOS
function cargarUsuarios() {
    const tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Cargando lista...</td></tr>';

    fetch(basePath + 'php/admin_listar_usuarios.php')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            if (data.success && data.usuarios.length > 0) {
                usuariosCache = data.usuarios;

                data.usuarios.forEach(user => {
                    // dentro del forEach user
                    let badgeClass = "bg-secondary";
                    if (user.rol === 'admin') badgeClass = "bg-danger";
                    if (user.rol === 'maestro') badgeClass = "bg-success";
                    if (user.rol === 'alumno') badgeClass = "bg-primary";

                    let estadoBadge = (user.estado && user.estado === 'inactivo')
                        ? '<span class="badge bg-warning text-dark">Inactivo</span>'
                        : '<span class="badge bg-success">Activo</span>';

                    let acciones = '';
                    if (user.estado && user.estado === 'inactivo') {
                        acciones = `
                                    <button class="btn btn-success btn-sm" onclick="reactivarUsuario(${user.id})" title="Reactivar">
                                        <i class="bi bi-arrow-clockwise"></i>
                                    </button> `;
                    } else {
                        acciones = `
                                    <button class="btn btn-primary btn-sm" onclick="editarUsuario(${user.id})" title="Editar">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})" title="Desactivar">
                                        <i class="bi bi-trash"></i>
                                    </button> `;
                    }

                    const row = `
                                <tr>
                                    <td>${user.id}</td>
                                    <td class="fw-bold">${user.nombre}</td>
                                    <td>${user.email}</td>
                                    <td><span class="badge ${badgeClass}">${user.rol}</span></td>
                                    <td>${estadoBadge}</td>
                                    <td>
                                        ${acciones}
                                    </td>
                                </tr> `;
                    tbody.innerHTML += row;

                });
            } else {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay usuarios registrados.</td></tr>';
            }
        })
        .catch(err => {
            console.error(err);
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error de conexión (404 o 500). Revisa consola.</td></tr>';
        });
}

// ABRIR MODAL EDITAR
function editarUsuario(id) {
    const user = usuariosCache.find(u => u.id == id);
    if (user) {
        document.getElementById("usuarioId").value = user.id;
        document.getElementById("usuarioNombre").value = user.nombre;
        document.getElementById("usuarioEmail").value = user.email;
        document.getElementById("usuarioPassword").value = "";

        let rolSelect = document.getElementById("usuarioRol");

        switch (user.rol) {
            case "admin":
                rolSelect.value = "Administrador";
                break;

            case "maestro":
                rolSelect.value = "Instructor"; // coincide con tu <option>
                break;

            case "alumno":
                rolSelect.value = "Alumno";
                break;

            default:
                rolSelect.value = "Alumno";
                break;
        }

        // Mostrar Modal
        const modalElement = document.getElementById('modalUsuario');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// LIMPIAR MODAL 
function limpiarModalUsuario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("usuarioId").value = "";
}

// GUARDAR USUARIO
const formUser = document.getElementById("formUsuario");
if (formUser) {
    formUser.addEventListener("submit", function (e) {
        e.preventDefault();

        const id = document.getElementById("usuarioId").value;
        const nombre = document.getElementById("usuarioNombre").value;
        const email = document.getElementById("usuarioEmail").value;
        const password = document.getElementById("usuarioPassword").value;

        // Convertir rol del select a valor de BD
        let rolRaw = document.getElementById("usuarioRol").value;

        let rol = "alumno"; // default

        switch (rolRaw) {
            case "Administrador":
                rol = "admin";
                break;

            case "Instructor":
                rol = "maestro";
                break;

            case "Alumno":
                rol = "alumno";
                break;
        }


        const datos = { id, nombre, email, password, rol };

        fetch(basePath + 'php/admin_guardar_usuario.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    location.reload();
                }
            })
            .catch(err => console.error(err));
    });
}

// ELIMINAR USUARIO
function eliminarUsuario(id) {
    if (!confirm("¿Seguro que deseas desactivar este usuario? Podrás reactivarlo después.")) return;

    fetch(basePath + 'php/admin_eliminar_usuario.php', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarUsuarios();
            }
        })
        .catch(err => console.error("Error eliminando usuario:", err));
}

// REACTIVAR USUARIO
function reactivarUsuario(id) {
    if (!confirm("¿Deseas reactivar este usuario?")) return;

    fetch(basePath + 'php/admin_reactivar_usuario.php', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarUsuarios();
            }
        })
        .catch(err => console.error("Error reactivando usuario:", err));
}
