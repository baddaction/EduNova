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
