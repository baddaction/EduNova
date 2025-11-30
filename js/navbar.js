document.addEventListener("DOMContentLoaded", function () {

    const guestLinks = document.getElementById("guest-links");
    const userLinks = document.getElementById("user-links");
    const roleContainer = document.getElementById("role-link-container");
    const userNameDisplay = document.getElementById("user-name-display");
    const profileLink = document.getElementById("profile-link");

    // Definimos la ruta base
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    fetch(path + 'php/check_session.php')
        .then(response => response.json())
        .then(data => {

            if (data.logged_in) {
                // Ocultar visitante / Mostrar usuario
                if (guestLinks) guestLinks.classList.add("d-none");
                if (guestLinks) guestLinks.classList.remove("d-flex");
                if (userLinks) userLinks.classList.remove("d-none");

                // Poner nombre
                if (userNameDisplay) userNameDisplay.textContent = data.nombre;

                let roleHtml = "";

                // LÓGICA DE ROLES Y REDIRECCIÓN 

                if (data.rol === 'alumno') {
                    // Botón del Navbar
                    roleHtml = `
                    <a class="nav-link fw-bold text-primary me-3" href="${path}misCursos.php">
                        <i class="bi bi-journal-bookmark"></i> Mis Cursos
                    </a>
                    <a class="nav-link fw-bold text-warning" href="${path}suscripcion.php">
                        <i class="bi bi-gem"></i> Premium
                    </a>`;

                    // Enlace de "Mi Perfil" en el dropdown
                    if (profileLink) {
                        profileLink.href = path + "Paneles-de-Control/alumno.php";
                        profileLink.style.display = "block"; // Aseguramos que se vea
                    }
                }
                else if (data.rol === 'maestro') {
                    // Botón del Navbar
                    roleHtml = `
                    <a class="nav-link fw-bold text-success" href="${path}cursosCreados.php">
                        <i class="bi bi-easel"></i> Mis Cursos Creados
                    </a>`;

                    // Enlace de "Mi Perfil" en el dropdown
                    if (profileLink) {
                        profileLink.href = path + "Paneles-de-Control/maestro.php";
                        profileLink.style.display = "block";
                    }
                }
                else if (data.rol === 'admin') {
                    // Botón del Navbar
                    roleHtml = `
                    <a class="nav-link fw-bold text-danger" href="${path}Paneles-de-Control/admin.php">
                        <i class="bi bi-shield-lock"></i> Panel Admin
                    </a>`;

                    // El Admin NO necesita "Mi Perfil", así que lo ocultamos
                    if (profileLink) {
                        profileLink.style.display = "none";
                    }
                }

                if (roleContainer) roleContainer.innerHTML = roleHtml;

            } else {
                // Modo Visitante
                if (guestLinks) guestLinks.classList.remove("d-none");
                if (userLinks) userLinks.classList.add("d-none");
            }
        })
        .catch(error => console.error("Error validando sesión:", error));
});