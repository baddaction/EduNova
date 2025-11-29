document.addEventListener("DOMContentLoaded", function () {

    // Referencias al HTML
    const guestLinks = document.getElementById("guest-links");
    const userLinks = document.getElementById("user-links");
    const roleContainer = document.getElementById("role-link-container");
    const userNameDisplay = document.getElementById("user-name-display");

    // Consultar al servidor quién está conectado
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {

            if (data.logged_in) {
                // Usuario logeado

                // Ocultar botones de login/registro
                if (guestLinks) guestLinks.classList.add("d-none");
                if (guestLinks) guestLinks.classList.remove("d-flex");

                // Mostrar menú de perfil
                if (userLinks) userLinks.classList.remove("d-none");

                // Poner el nombre del usuario
                if (userNameDisplay) userNameDisplay.textContent = data.nombre;

                // Agrega botones segun rol
                let roleHtml = "";

                if (data.rol === 'alumno') {
                    roleHtml = `
                    <a class="nav-link fw-bold text-primary" href="misCursos.html">
                        <i class="bi bi-journal-bookmark"></i> Mis Cursos
                    </a>`;
                }
                else if (data.rol === 'maestro') {
                    roleHtml = `
                    <a class="nav-link fw-bold text-success" href="cursosCreados.html">
                        <i class="bi bi-easel"></i> Mis Cursos Creados
                    </a>`;
                }
                else if (data.rol === 'admin') {
                    roleHtml = `
                    <a class="nav-link fw-bold text-danger" href="adminCursos.html">
                        <i class="bi bi-shield-lock"></i> Panel Admin
                    </a>`;
                }

                // Inyectar el HTML del rol
                if (roleContainer) roleContainer.innerHTML = roleHtml;

            } else {
                // Usuario visitante
                // Asegurarnos que se vea el Login
                if (guestLinks) guestLinks.classList.remove("d-none");
                if (userLinks) userLinks.classList.add("d-none");
            }
        })
        .catch(error => console.error("Error validando sesión:", error));
});