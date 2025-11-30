<?php
$ruta = './';
session_start();

// solo usuarios registrados vean el foro
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foro - EduNova</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
    <link rel="stylesheet" href="<?php echo $ruta; ?>css/login.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <section>
        <div class="container my-4">

            <h2 class="mb-4">Foro del Curso</h2>

            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <textarea class="form-control mb-3" id="nuevoMensaje" rows="3"
                        placeholder="Escribe un nuevo mensaje..."></textarea>
                    <button class="btn btn-primary" id="btnPublicar">Publicar</button>
                </div>
            </div>

            <div id="foroContainer">
            </div>

        </div>
    </section>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script src="<?php echo $ruta; ?>js/foro.js"></script>

    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>

</body>

</html>