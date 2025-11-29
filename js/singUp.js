document.addEventListener("DOMContentLoaded", function () {

    // Seleccionar elementos del HTML
    const btnRegister = document.querySelector("button[type='submit']");
    const nameInput = document.getElementById("typeNameX");
    const emailInput = document.getElementById("typeEmailX");
    const passwordInput = document.getElementById("typePasswordX");
    const roleInput = document.getElementById("typeRoleX");

    // Verificamos si ya existe el popup en el HTML, si no, lo creamos al vuelo
    let popup = document.getElementById("popupAlert");
    let popupMessage = document.getElementById("popupMessage");

    if (!popup) {
        // PopUp
        const popupHTML = `
            <div id="popupAlert" class="popup-alert" style="display: none;">
                <div class="popup-content">
                    <p id="popupMessage"></p>
                    <button id="closePopup" class="btn text-black bg-white mt-2">Cerrar</button>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        popup = document.getElementById("popupAlert");
        popupMessage = document.getElementById("popupMessage");

        // Agregar evento para cerrar
        document.getElementById("closePopup").addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
    }

    // --- LÓGICA REGISTRO ---
    btnRegister.addEventListener("click", function (event) {
        event.preventDefault();

        const nombre = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        // 2. OBTENER VALOR DEL ROL
        const rol = roleInput.value;

        // 3. VALIDAR QUE HAYA ELEGIDO ROL
        if (nombre === "" || email === "" || password === "" || rol === "") {
            showPopup("Por favor completa todos los campos y selecciona tu rol.");
            return;
        }

        const data = {
            nombre: nombre,
            email: email,
            password: password,
            rol: rol // 4. ENVIAMOS EL ROL
        };

        fetch('php/signup_backend.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showPopup("¡Registro exitoso! Redirigiendo al login...");
                    setTimeout(() => { window.location.href = "login.html"; }, 2000);
                } else {
                    showPopup(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showPopup("Error al conectar con el servidor.");
            });
    });
});