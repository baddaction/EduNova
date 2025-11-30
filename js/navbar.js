document.addEventListener("DOMContentLoaded", function () {
    
    const guestLinks = document.getElementById("guest-links");
    const userLinks = document.getElementById("user-links");
    const roleContainer = document.getElementById("role-link-container");
    const userNameDisplay = document.getElementById("user-name-display");

    // Definimos la ruta base (si no existe, usa la raíz ./)
    const path = (typeof basePath !== 'undefined') ? basePath : './';

    fetch(path + 'php/check_session.php')
    .then(response => response.json())
    .then(data => {
        
        if (data.logged_in) {
            // Ocultar botones de visitante y mostrar perfil
            if(guestLinks) guestLinks.classList.add("d-none");
            if(guestLinks) guestLinks.classList.remove("d-flex");
            if(userLinks) userLinks.classList.remove("d-none");
            
            // Mostrar nombre del usuario
            if(userNameDisplay) userNameDisplay.textContent = data.nombre;

            let roleHtml = "";

            // --- AQUÍ ESTÁN LOS CAMBIOS DE ENLACES ---
            
            if (data.rol === 'alumno') {
               
                roleHtml = `
                    <a class="nav-link fw-bold text-primary" href="${path}misCursos.php">
                        <i class="bi bi-journal-bookmark"></i> Mis Cursos
                    </a>`;
            } 
            else if (data.rol === 'maestro') {
              
                roleHtml = `
                    <a class="nav-link fw-bold text-success" href="${path}cursosCreados.php">
                        <i class="bi bi-easel"></i> Mis Cursos Creados
                    </a>`;
            } 
            else if (data.rol === 'admin') {
               
                roleHtml = `
                    <a class="nav-link fw-bold text-danger" href="${path}Paneles-de-Control/admin.php">
                        <i class="bi bi-shield-lock"></i> Panel Admin
                    </a>`;
            }

            // Inyectar el botón en el menú
            if(roleContainer) roleContainer.innerHTML = roleHtml;

        } else {
            // Si no está logueado, mostrar botones de visitante
            if(guestLinks) guestLinks.classList.remove("d-none");
            if(userLinks) userLinks.classList.add("d-none");
        }
    })
    .catch(error => console.error("Error validando sesión:", error));
});