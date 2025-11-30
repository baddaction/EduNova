<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Curso</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/curso.css">
</head>

<body>
    <!-- Navegador -->
    <?php include 'php/navbar.php'; ?>

    <div class="container my-5">

        <!-- Nombre del curso -->
        <h1 id="cursoNombre" class="fw-bold mb-4 text-primary"></h1>

        <!-- Info principal -->
        <div class="row">
            <div class="col-md-5">
                <img id="cursoImagen" class="curso-img shadow" src="" alt="">
            </div>
            <div class="col-md-7">
                <p id="cursoDescripcion" class="fs-5"></p>
            </div>
        </div>

        <hr class="my-5">

        <!-- Instructor -->
        <h2 class="mb-4">Instructor</h2>

        <div class="card shadow-sm p-4">
            <div class="row align-items-center">
                <div class="col-md-3 text-center">
                    <img id="instructorImagen" class="instructor-img shadow" src="" alt="">
                </div>
                <div class="col-md-9">
                    <h4 id="instructorNombre"></h4>
                    <p id="instructorBio" class="text-secondary"></p>
                </div>
            </div>
        </div>

        <hr class="my-5">

        <!-- Temario -->
        <h2 class="mb-4">Temario del Curso</h2>

        <div id="cursoTemario"></div>

        <hr class="my-5">

        <!-- Reseñas -->
        <h2 class="mb-4">Reseñas</h2>

        <div id="cursoReseñas"></div>

    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5 mt-5">
        <div class="container">

            <div class="row align-items-start">

                <!-- LOGO -->
                <div class="col-md-3 mb-4 d-flex align-items-center">
                    <i class="bi bi-house m-3 " style="font-size: 2rem; color:white"></i>
                    <span class="fs-4 fw-semibold">EduNova</span>
                </div>

                <!-- NECESITAS AYUDA -->
                <div class="col-md-3 mb-4">
                    <h6 class="fw-bold mb-3">¿Necesitas ayuda?</h6>
                    <a href="contacto.html" class="text-decoration-none text-white"><button
                            class="btn btn-primary px-4">Contáctanos</button></a>
                </div>

                <!-- CORPORATE INFO -->
                <div class="col-md-3 mb-4">
                    <h6 class="fw-bold mb-3">Corporate Info</h6>
                    <a href="sobreNosotros.html" class="text-white-50 text-decoration-none d-block mb-2">Sobre
                        Nosotros</a>
                </div>

                <!-- REDES SOCIALES -->
                <div class="col-md-3 text-md-end">

                    <a href="#" class="text-white me-3 fs-5"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="text-white me-3 fs-5"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="text-white me-3 fs-5"><i class="bi bi-youtube"></i></a>
                    <a href="#" class="text-white fs-5"><i class="bi bi-twitter"></i></a>

                </div>

            </div>

        </div>
    </footer>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous">
        </script>
    <script src="js/cursoData.js"></script>
    <script src="js/curso.js"></script>
    <script src="js/navbar.js"></script>

</body>

</html>