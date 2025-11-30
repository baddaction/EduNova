<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador de Cursos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- Navegador -->
    <?php include 'php/navbar.php'; ?>

    <section>
        <div class="container mt-4">
            <button class="btn btn-success mb-3" onclick="mostrarFormulario()">Crear Nuevo Curso</button>

            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre del Curso</th>
                        <th>Descripción</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody id="tablaCursos"></tbody>
            </table>

            <!-- Formulario Crear/Editar -->
            <div id="formularioCurso" class="card p-4 mt-4" style="display:none;">
                <h4 id="tituloForm">Crear / Editar Curso</h4>

                <input type="hidden" id="cursoId">

                <input type="text" id="nombreCurso" class="form-control mb-3" placeholder="Nombre del curso">

                <textarea id="descripcionCurso" class="form-control mb-3" rows="3"
                    placeholder="Descripción del curso"></textarea>

                <input type="file" id="archivoCurso" class="form-control mb-3">

                <button class="btn btn-primary" onclick="guardarCurso()">Guardar Curso</button>
            </div>
        </div>

    </section>


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
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    <script src="js/maestroAdminCursos.js"></script>
    
    <script src="js/navbar.js"></script>
</body>

</html>