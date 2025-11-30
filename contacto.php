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

    <!-- Contact Form -->
    <section class="contact-section py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h2 class="mb-4 text-center">Contáctanos</h2>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name" placeholder="Tu nombre completo">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="email" placeholder="Tu correo electrónico">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Mensaje</label>
                            <textarea class="form-control" id="message" rows="4"
                                placeholder="Escribe tu mensaje aquí"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
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
    <script src="js/navbar.js"></script>
</body>

</html>