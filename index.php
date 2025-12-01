<?php 
$ruta = './'; 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduNova</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>

    <?php include 'php/navbar.php'; ?>

    <section class="hero-section border-bottom">
        <div class="container d-flex align-items-center justify-content-center fs-1 flex-column">
            <h1>Bienvenidos a EduNova</h1>
            <p class="fs-5 mt-3 fw-light">EduNova es una plataforma de pago por suscripción para cursos en línea.</p>
            <a href="<?php echo $ruta; ?>sobreNosotros.php"><button type="button"
                    class="mt-3 btn text-black border border-3 border-black">Sobre Nosotros</button></a>
        </div>
    </section>

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

                <div class="carousel-item active">
                    <div class="d-flex justify-content-center gap-3">

                        <div class="row mt-5">

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Aprende Inteligencia Artificial desde cero con este curso introductorio.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Domina los fundamentos de Python y Machine Learning.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Curso avanzado de Redes Neuronales y Deep Learning.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/CursoIa.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Automatización de procesos con IA aplicada a negocios.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="d-flex justify-content-center gap-3">
                        <div class="row mt-5">

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Desarrollo Web Full Stack con HTML, CSS y JS.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Curso completo de React y Node.js para modernos.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Bases de datos SQL y NoSQL: Diseño y optimización.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card" style="width: 18rem;">
                                    <a href="#"><img src="<?php echo $ruta; ?>img/clase.webp" class="card-img-top" alt="ImgCurso"></a>
                                    <div class="card-body">
                                        <p class="card-text">Seguridad Informática y Hacking Ético básico.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

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
    <?php include 'php/footer.php'; ?>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>
</body>

</html>