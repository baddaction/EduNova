<?php
$ruta = './'; 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduNova - Cursos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>

    <?php include 'php/navbar.php'; ?>

    <main class="container my-4">

        <div class="container my-4">
            <h2 class="mb-4">Catálogo de Cursos</h2>

            <div id="temasContainer"></div>

        </div>
    </main>

    <?php include 'php/footer.php'; ?>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    
    <script src="<?php echo $ruta; ?>js/cursos.js"></script>
    
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>
</body>

</html>