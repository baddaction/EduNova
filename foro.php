<?php
$ruta = './';
session_start();
// Si no hay sesión, al login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Foro de Discusión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="bg-light">
    <?php include 'php/navbar.php'; ?>

    <div class="container mt-4" style="min-height: 80vh;">

        <div id="vistaLista">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 id="tituloForo">Foro del Curso</h2>
                <div>
                    <a href="#" id="btnVolverCurso" class="btn btn-outline-secondary text-black me-2">Volver al Curso</a>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevoHilo">
                        <i class="bi bi-plus-lg"></i> Nuevo Tema
                    </button>
                </div>
            </div>

            <div class="list-group shadow-sm" id="contenedorHilos">
            </div>
        </div>

        <div id="vistaConversacion" style="display: none;">
            <div class="mb-3">
                <button class="btn btn-sm btn-outline-dark" onclick="volverALista()">
                    <i class="bi bi-arrow-left text-black"></i> Volver a los temas
                </button>
            </div>

            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0" id="tituloHiloActivo">Cargando...</h4>
                </div>
                <div class="card-body bg-light" id="contenedorPosts" style="max-height: 60vh; overflow-y: auto;">
                </div>
                <div class="card-footer bg-white">
                    <form id="formResponder">
                        <div class="input-group">
                            <textarea id="txtRespuesta" class="form-control" rows="2"
                                placeholder="Escribe una respuesta..."></textarea>
                            <button class="btn btn-primary" type="submit">
                                <i class="bi bi-send"></i> Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="modalNuevoHilo" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear Nuevo Tema</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="formNuevoHilo">
                        <div class="mb-3">
                            <label>Título del tema</label>
                            <input type="text" id="nuevoTitulo" class="form-control" required
                                placeholder="Ej: Duda sobre la clase 3">
                        </div>
                        <div class="mb-3">
                            <label>Mensaje inicial</label>
                            <textarea id="nuevoMensaje" class="form-control" rows="4" required
                                placeholder="Explica tu duda o comentario..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Publicar Tema</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <?php include 'php/footer.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="js/navbar.js"></script>
    <script src="js/foro.js"></script>
</body>

</html>