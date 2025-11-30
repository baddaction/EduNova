<?php
$ruta = './';
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Suscripción Premium</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .card-pago {
            max-width: 500px;
            margin: 0 auto;
        }

        .credit-card-form .form-control {
            border-radius: 0;
        }
    </style>
</head>

<body class="bg-light">
    <?php include 'php/navbar.php'; ?>

    <div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="fw-bold">Hazte Premium</h1>
            <p class="lead">Accede a todos los cursos sin límites.</p>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg card-pago">
                    <div class="card-header bg-primary text-white text-center py-3">
                        <h3 class="mb-0">Resumen de Compra</h3>
                    </div>
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <span class="h5">Suscripción Mensual</span>
                            <span class="h3 fw-bold text-primary" id="precioDisplay">Cargando...</span>
                        </div>

                        <hr>

                        <h5 class="mb-3">Método de Pago (Simulado)</h5>
                        <form id="formPago">
                            <div class="mb-3">
                                <label>Nombre en la tarjeta</label>
                                <input type="text" class="form-control" placeholder="Juan Pérez" required>
                            </div>
                            <div class="mb-3">
                                <label>Número de tarjeta</label>
                                <input type="text" class="form-control" placeholder="0000 0000 0000 0000" maxlength="19"
                                    required>
                            </div>
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label>Expira (MM/AA)</label>
                                    <input type="text" class="form-control" placeholder="01/28" maxlength="5" required>
                                </div>
                                <div class="col-6 mb-3">
                                    <label>CVV</label>
                                    <input type="password" class="form-control" placeholder="123" maxlength="3"
                                        required>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-success w-100 py-2 fs-5" id="btnPagar">
                                Confirmar Pago
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="js/navbar.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Cargar el precio real desde la BD usando admin_estadisticas.php
            fetch('php/admin_estadisticas.php')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.stats.precio) {
                        document.getElementById("precioDisplay").textContent = `$${data.stats.precio} MXN`;
                    } else {
                        document.getElementById("precioDisplay").textContent = "$199 MXN"; // Default
                    }
                });

            // Simular Pago
            document.getElementById("formPago").addEventListener("submit", function (e) {
                e.preventDefault();
                const btn = document.getElementById("btnPagar");

                // Efecto de carga
                btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Procesando...';
                btn.disabled = true;

                // Esperar 2 segundos para simular conexión bancaria
                setTimeout(() => {
                    fetch('php/alumno_pagar_suscripcion.php')
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                btn.className = "btn btn-primary w-100 py-2 fs-5";
                                btn.innerHTML = "¡Pago Exitoso! ✅";
                                alert(data.message);
                                window.location.href = "misCursos.php"; // Redirigir a mis cursos
                            } else {
                                btn.innerHTML = "Error. Intentar de nuevo";
                                btn.disabled = false;
                                alert(data.message);
                            }
                        });
                }, 2000);
            });
        });
    </script>
</body>

</html>