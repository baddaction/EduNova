// CRUD USUARIOS

// CRUD USUARIOS

let usuarios = [
    {
        id: 1,
        nombre: "Carlos Mendoza",
        email: "carlos.mendoza@example.com",
        rol: "Administrador"
    },
    {
        id: 2,
        nombre: "Laura Gómez",
        email: "laura.gomez@example.com",
        rol: "Maestro"
    },
    {
        id: 3,
        nombre: "Jorge Ramírez",
        email: "jorge.ramirez@example.com",
        rol: "Alumno"
    },
    {
        id: 4,
        nombre: "Ana Torres",
        email: "ana.torres@example.com",
        rol: "Maestro"
    }
];

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

// Mostrar datos al cargar
document.addEventListener("DOMContentLoaded", mostrarUsuarios);

