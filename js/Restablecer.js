// Variable para recordar el correo durante los pasos
let currentEmail = "";

// Mostrar popup de error o éxito
function showMessage(msg, isError = true) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = msg;
    alertBox.classList.remove("d-none", "alert-danger", "alert-success");

    // Color según tipo de mensaje
    if (isError) {
        alertBox.classList.add("alert-danger");
    } else {
        alertBox.classList.add("alert-success");
    }

    alertBox.classList.remove("d-none");

    // Ocultar a los 5 segundos
    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 5000);
}

// ENVIAR CÓDIGO
function sendCode() {
    const emailInput = document.getElementById("resetEmail");
    const email = emailInput.value.trim();

    if (email === "") {
        showMessage("Por favor ingresa tu correo.");
        return;
    }

    fetch('php/enviar_codigo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                currentEmail = email; // Guardamos el correo 
                showMessage(data.message, false); // Muestra el código en verde

                // Cambiar de pantalla
                document.getElementById("step1").classList.add("d-none");
                document.getElementById("step2").classList.remove("d-none");
            } else {
                showMessage(data.message);
            }
        })
        .catch(err => showMessage("Error de conexión."));
}

// VERIFICAR CÓDIGO
function verifyCode() {
    const codeInput = document.getElementById("resetCode");
    const code = codeInput.value.trim();

    if (code === "") {
        showMessage("Por favor ingresa el código.");
        return;
    }

    fetch('php/verificar_codigo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, code: code })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showMessage("Código validado.", false);
                document.getElementById("step2").classList.add("d-none");
                document.getElementById("step3").classList.remove("d-none");
            } else {
                showMessage(data.message);
            }
        })
        .catch(err => showMessage("Error de conexión."));
}

// CAMBIAR CONTRASEÑA
function changePass() {
    const pass1 = document.getElementById("newPass").value.trim();
    const pass2 = document.getElementById("confirmPass").value.trim();

    if (pass1 === "" || pass2 === "") {
        showMessage("Por favor ingresa y confirma tu contraseña.");
        return;
    }

    if (pass1 !== pass2) {
        showMessage("Las contraseñas no coinciden.");
        return;
    }

    fetch('php/cambiar_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, password: pass1 })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showMessage("¡Contraseña cambiada! Redirigiendo...", false);
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                showMessage(data.message);
            }
        })
        .catch(err => showMessage("Error de conexión."));
}