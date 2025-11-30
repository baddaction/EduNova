<?php
$ruta = './';
session_start();

// Seguridad: Solo Alumnos
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'alumno') {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Cursos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <section class="container">
        <h2 class="text-center py-4">Mis Cursos</h2>
        <div class="row d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center gap-3">

                <div class="row mt-5 ">

                    <div class="col-3 margin-cards">
                        <div class="card" style="width: 18rem;">
                            <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso">
                            </a>
                            <div class="card-body text-center">
                                <p class="fw-bold">Curso de Programacion</p>
                                <p class="fw-semibold">Informacion breve del curso</p>
                                <button type="button" class="btn btn-dark">Ver mas</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 margin-cards">
                        <div class="card" style="width: 18rem;">
                            <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                            <div class="card-body text-center">
                                <p class="fw-bold">Curso de Programacion</p>
                                <p class="fw-semibold">Informacion breve del curso</p>
                                <button type="button" class="btn btn-dark">Ver mas</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 margin-cards">
                        <div class="card" style="width: 18rem;">
                            <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                            <div class="card-body text-center">
                                <p class="fw-bold">Curso de Programacion</p>
                                <p class="fw-semibold">Informacion breve del curso</p>
                                <button type="button" class="btn btn-dark">Ver mas</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 margin-cards">
                        <div class="card" style="width: 18rem;">
                            <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                            <div class="card-body text-center">
                                <p class="fw-bold">Curso de Programacion</p>
                                <p class="fw-semibold">Informacion breve del curso</p>
                                <button type="button" class="btn btn-dark">Ver mas</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="js/navbar.js"></script>

</body>

</html>