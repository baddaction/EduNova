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
