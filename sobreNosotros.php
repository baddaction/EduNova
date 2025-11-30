<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre Nosotros</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- Navegador -->
    <?php include 'php/navbar.php'; ?>

    <!-- Hero section -->
    <section class="hero-section border-bottom">
        <div class="container d-flex align-items-center justify-content-center fs-1 flex-column">
            <h1>Sobre Nosotros</h1>
            <p class="fs-5 mt-3 fw-light">Aprende sin límites, suscríbete al conocimiento.</p>
        </div>
    </section>

    <!-- Contenido Principal -->
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
    <script src="js/navbar.js"></script>

</body>

</html>