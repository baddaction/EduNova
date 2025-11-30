<?php
$ruta = './';
session_start();

// Seguridad: Solo Maestros
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Mis Cursos Creados - EduNova</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <section class="container my-5" style="min-height: 60vh;">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Mis Cursos Creados</h2>
            <a href="adminCursos.php" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i> Nuevo Curso
            </a>
        </div>

        <div id="misCursosContainer" class="row">
        </div>

    </section>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="js/navbar.js"></script>

    <script src="js/maestroCursos.js"></script>
</body>

</html>