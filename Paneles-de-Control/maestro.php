<?php
$ruta = '../';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Usuario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- CORRECCIÓN DE RUTA CSS -->
    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>
    <!-- Navegador -->
    <?php include '../php/navbar.php'; ?>

    <section class="container">
        <div class="my-5 text-center">
            <h1>Perfil</h1>
            <p class="fw-light">Añade informacion sobre ti</p>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-center my-5 text-center">
            <i class="bi bi-person-circle" style="font-size: 5rem; color: #6c757d;"></i>
            <h2 class="ms-3">Nombre del usuario</h2>
        </div>


        <!-- Informacion -->
        <div class="container py-4">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-9">

                    <div class="card shadow-sm p-4 mb-5">

                        <!-- Email -->
                        <label class="form-label fw-semibold">Email</label>
                        <div class="d-flex align-items-center mb-3">
                            <span id="emailText" class="me-2">Correo@gmail.com</span>
                            <i class="bi bi-pencil-square" style="cursor: pointer;"></i>
                        </div>

                        <!-- Biografía -->
                        <label class="form-label fw-semibold ">Biografía</label>
                        <textarea class="form-control mb-3" rows="4" placeholder="Escribe tu biografia"></textarea>

                        <!-- Telefono -->
                        <label class="form-label fw-semibold">Telefono</label>
                        <div class="d-flex align-items-center mb-3">
                            <span id="phoneText" class="me-2">8126176971</span>
                            <i class="bi bi-pencil-square" style="cursor: pointer;"></i>
                        </div>

                        <!-- Especialidad -->
                        <label class="form-label fw-semibold">Especialidad</label>
                        <div class="d-flex align-items-center mb-3">
                            <textarea class="form-control mb-3" rows="2"
                                placeholder="Escribe tu especialidad"></textarea>
                        </div>
                        <button class="btn btn-primary mt-3 px-4">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup -->
        <div class="modal fade" id="popupMensaje" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-body text-center" id="popupTexto"></div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button class="btn text-black bg-white" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Footer -->
    <?php include '../php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    <script src="<?php echo $ruta; ?>js/perfilAlumno.js"></script>


    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>

</body>

</html>