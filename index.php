<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduNova</title>
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
            <h1>Bienvenidos a EduNova</h1>
            <p class="fs-5 mt-3 fw-light">EduNova es una plataforma de pago por suscripción para cursos en línea.</p>
            <a href="sobreNosotros.html"><button type="button"
                    class="mt-3 btn text-black border border-3 border-black">Sobre Nosotros</button></a>
        </div>
    </section>

    <!-- Contenido Principal -->
    <div class="container">

        <div class="row">
            <div class="col-6">
                <h4>¡Cursos más populares!</h4>
            </div>
            <div class="col-6 text-end">
                <a href="#" class="text-black fw-bold">Ver más cursos</a>
            </div>

        </div>

        <div id="carouselCursos" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">

                <!-- SLIDE 1 -->
                <div class="carousel-item active">
                    <div class="d-flex justify-content-center gap-3">

                        <div class="row mt-5">

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- SLIDE 2 (puedes duplicarlo para más cursos) -->
                <div class="carousel-item">
                    <div class="d-flex justify-content-center gap-3">
                        <div class="row mt-5">

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk
                                            of the card’s content.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <!-- BOTÓN SIGUIENTE -->

            <button class="carousel-control-prev " type="button" data-bs-target="#carouselCursos" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next " type="button" data-bs-target="#carouselCursos" data-bs-slide="next">
                <span class="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                <span class="visually-hidden">Next</span>
            </button>

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