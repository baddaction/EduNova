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
