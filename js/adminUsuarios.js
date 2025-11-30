// js/adminUsuarios.js

document.addEventListener("DOMContentLoaded", function () {
    // Verificar que estamos en la pestaña correcta antes de llamar
    if(document.getElementById("tablaUsuarios")) {
        cargarUsuarios();
    }
});

let usuariosCache = [];

// 1. CARGAR USUARIOS
function cargarUsuarios() {
    const tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Cargando lista...</td></tr>';

    // Usamos basePath que viene desde admin.php
    fetch(basePath + 'php/admin_listar_usuarios.php')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";
            
            if (data.success && data.usuarios.length > 0) {
                usuariosCache = data.usuarios;
                
                data.usuarios.forEach(user => {
                    // Colores según el rol
                    let badgeClass = "bg-secondary";
                    if(user.rol === 'admin') badgeClass = "bg-danger";
                    if(user.rol === 'maestro') badgeClass = "bg-success";
                    if(user.rol === 'alumno') badgeClass = "bg-primary";

                    const row = `
                        <tr>
                            <td>${user.id}</td>
                            <td class="fw-bold">${user.nombre}</td>
                            <td>${user.email}</td>
                            <td><span class="badge ${badgeClass}">${user.rol}</span></td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editarUsuario(${user.id})" title="Editar">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="alert('Función eliminar pendiente')" title="Eliminar">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
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

// 2. ABRIR MODAL EDITAR
function editarUsuario(id) {
    const user = usuariosCache.find(u => u.id == id);
    if(user) {
        document.getElementById("usuarioId").value = user.id;
        document.getElementById("usuarioNombre").value = user.nombre;
        document.getElementById("usuarioEmail").value = user.email;
        document.getElementById("usuarioPassword").value = ""; 
        
        let rolSelect = document.getElementById("usuarioRol");
        // Aseguramos coincidencia minúsculas/mayúsculas
        let rolBuscado = user.rol.toLowerCase(); 
        // Mapeo simple si los values del select son Title Case
        if(rolBuscado === 'admin') rolSelect.value = 'Administrador';
        else if(rolBuscado === 'maestro') rolSelect.value = 'Instructor'; // O 'Maestro' según tu HTML
        else if(rolBuscado === 'alumno') rolSelect.value = 'Alumno';
        else rolSelect.value = rolBuscado; // Intento directo

        // Mostrar Modal Bootstrap
        const modalElement = document.getElementById('modalUsuario');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// 3. LIMPIAR MODAL (Para nuevo usuario)
function limpiarModalUsuario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("usuarioId").value = "";
}

// 4. GUARDAR USUARIO
const formUser = document.getElementById("formUsuario");
if(formUser) {
    formUser.addEventListener("submit", function(e) {
        e.preventDefault();

        const id = document.getElementById("usuarioId").value;
        const nombre = document.getElementById("usuarioNombre").value;
        const email = document.getElementById("usuarioEmail").value;
        const password = document.getElementById("usuarioPassword").value;
        
        // Convertir rol del select a valor de BD
        let rolRaw = document.getElementById("usuarioRol").value;
        let rol = 'alumno';
        if(rolRaw === 'Administrador') rol = 'admin';
        if(rolRaw === 'Instructor' || rolRaw === 'Maestro') rol = 'maestro';
        if(rolRaw === 'Alumno') rol = 'alumno';

        const datos = { id, nombre, email, password, rol };

        fetch(basePath + 'php/admin_guardar_usuario.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.success) {
                location.reload(); 
            }
        })
        .catch(err => console.error(err));
    });
}