// Login

// Popup Login
// document.addEventListener("DOMContentLoaded", function () {
//     const btnLogin = document.querySelector("button[type='submit']");
//     const emailInput = document.getElementById("typeEmailX");
//     const passwordInput = document.getElementById("typePasswordX");

//     const popup = document.getElementById("popupAlert");
//     const popupMessage = document.getElementById("popupMessage");
//     const closePopup = document.getElementById("closePopup");

//     function showPopup(message) {
//         popupMessage.textContent = message;
//         popup.style.display = "flex";
//     }

//     closePopup.addEventListener("click", () => {
//         popup.style.display = "none";
//     });

//     btnLogin.addEventListener("click", function (event) {
//         event.preventDefault(); // evita enviar formulario

//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();

//         if (email === "" && password === "") {
//             showPopup("Por favor ingresa tu correo y contraseña.");
//             return;
//         }
//         if (email === "") {
//             showPopup("Por favor ingresa tu correo.");
//             return;
//         }
//         if (password === "") {
//             showPopup("Por favor ingresa tu contraseña.");
//             return;
//         }

//         showPopup("Iniciando sesión...");
//         setTimeout(() => {
//             window.location.href = "dashboard.html";
//         }, 1000);
//     });
// });


// Login Lógica Real
document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.querySelector("button[type='submit']");
    const emailInput = document.getElementById("typeEmailX");
    const passwordInput = document.getElementById("typePasswordX");

    // Elementos del Popup
    const popup = document.getElementById("popupAlert");
    const popupMessage = document.getElementById("popupMessage");
    const closePopup = document.getElementById("closePopup");

    // Función para mostrar popup
    function showPopup(message) {
        if (popupMessage) popupMessage.textContent = message;
        if (popup) popup.style.display = "flex";
    }

    // Cerrar popup
    if (closePopup) {
        closePopup.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    btnLogin.addEventListener("click", function (event) {
        event.preventDefault(); // Evita recargar la página

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validaciones simples
        if (email === "" || password === "") {
            showPopup("Por favor ingresa correo y contraseña.");
            return;
        }

        // Conexion bd

        // Creamos el objeto de datos a enviar
        const data = {
            email: email,
            password: password
        };

        // FETCH para enviar datos al backend
        fetch('php/login_backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()) // Convertimos la respuesta a JSON
            .then(data => {

                if (data.success) {
                    // Si el login es correcto
                    showPopup("¡Login exitoso! Redirigiendo...");

                    setTimeout(() => {
                        // Redirigir al dashboard (o según el rol)
                        if (data.rol === 'admin') {
                            window.location.href = "Paneles-de-Control/admin.html";
                        } if(data.rol === 'alumno') {
                            window.location.href = "Paneles-de-Control/alumno.html";
                        }if(data.rol === 'maestro'){
                            window.location.href = "Paneles-de-Control/maestro.html";
                        }
                    }, 1500);

                } else {
                    // Si hubo error (contraseña mal, usuario no existe, etc)
                    showPopup(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showPopup("Ocurrió un error al conectar con el servidor.");
            });
    });
});
