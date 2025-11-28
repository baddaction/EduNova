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
