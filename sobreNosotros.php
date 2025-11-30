<?php 
// 1. Ruta Raíz
$ruta = './'; 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre Nosotros</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <section class="hero-section border-bottom">
        <div class="container d-flex align-items-center justify-content-center fs-1 flex-column">
            <h1>Sobre Nosotros</h1>
            <p class="fs-5 mt-3 fw-light">Aprende sin límites, suscríbete al conocimiento.</p>
        </div>
    </section>

    <div class="container">
        <div class="row my-5">
            <div class="col-md-6">
                <h2>Nuestra Misión</h2>
                <p>En EduNova, nuestra misión es democratizar la educación en línea, ofreciendo acceso ilimitado a
                    cursos de alta calidad para todos. Creemos que el aprendizaje continuo es clave para el crecimiento
                    personal y profesional, y estamos comprometidos a proporcionar una plataforma que facilite este
                    proceso.</p>
            </div>
            <div class="col-md-6">
                <h2>Nuestra Visión</h2>
                <p>Nos esforzamos por ser la plataforma líder en educación en línea, reconocida por nuestra innovación,
                    calidad y accesibilidad. Aspiramos a crear una comunidad global de aprendices y educadores que
                    colaboren para transformar la forma en que se adquiere conocimiento.</p>
            </div>
        </div>
        <div class="row my-5">
            <div class="col-12">
                <h2>Nuestros Valores</h2>
                <ul>
                    <li><strong>Calidad:</strong> Nos comprometemos a ofrecer cursos impartidos por expertos en sus
                        campos.</li>
                    <li><strong>Accesibilidad:</strong> Creemos que la educación debe estar al alcance de todos,
                        independientemente de su ubicación o situación económica.</li>
                    <li><strong>Innovación:</strong> Estamos constantemente mejorando nuestra plataforma para ofrecer la
                        mejor experiencia de aprendizaje posible.</li>
                    <li><strong>Comunidad:</strong> Fomentamos un entorno colaborativo donde los estudiantes y
                        educadores
                        pueden interactuar y crecer juntos.</li>
                </ul>
            </div>
        </div>
    </div>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="js/navbar.js"></script>

</body>

</html>