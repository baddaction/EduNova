<?php 
$ruta = './'; 
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Detalles del Curso - EduNova</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
    <link rel="stylesheet" href="<?php echo $ruta; ?>css/curso.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <div class="container my-5">

        <h1 id="cursoNombre" class="fw-bold mb-4 text-primary">Cargando curso...</h1>

        <div class="row">
            <div class="col-md-5">
                <img id="cursoImagen" class="img-fluid rounded shadow" src="https://via.placeholder.com/600x400" alt="Imagen Curso">
            </div>
            <div class="col-md-7">
                <p id="cursoDescripcion" class="fs-5 text-muted">Descripción del curso...</p>
                
                <button id="btnInscribirse" class="btn btn-primary btn-lg mt-3">
                    Inscribirse Ahora
                </button>
            </div>
        </div>

        <hr class="my-5">

        <h2 class="mb-4">Instructor</h2>

        <div class="card shadow-sm p-4 border-0">
            <div class="row align-items-center">
                <div class="col-md-3 text-center">
                    <img id="instructorImagen" class="rounded-circle shadow-sm" src="https://via.placeholder.com/150" alt="Instructor" width="150" height="150">
                </div>
                <div class="col-md-9">
                    <h4 id="instructorNombre" class="fw-bold">Nombre del Instructor</h4>
                    <p id="instructorBio" class="text-secondary">Biografía del instructor...</p>
                </div>
            </div>
        </div>

        <hr class="my-5">

        <h2 class="mb-4">Temario del Curso</h2>
        <div id="cursoTemario" class="accordion" id="accordionTemario">
            </div>

        <hr class="my-5">

        <h2 class="mb-4">Reseñas de Estudiantes</h2>
        <div id="cursoReseñas" class="row">
            </div>

    </div>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous">
        </script>
    
    <script src="<?php echo $ruta; ?>js/curso.js"></script>
    
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>

</body>

</html>