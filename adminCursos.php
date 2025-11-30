<?php
$ruta = './';
session_start();

// Seguridad: Solo maestros
// Si intentan entrar sin ser maestro, los mandamos al login
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador de Cursos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <section>
        <div class="container mt-4">
            <h2 class="mb-4">Gestión de Mis Cursos</h2>

            <button class="btn btn-success mb-3" onclick="mostrarFormulario()">
                <i class="bi bi-plus-lg"></i> Crear Nuevo Curso
            </button>

            <table class="table table-bordered table-hover shadow-sm bg-white">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre del Curso</th>
                        <th>Descripción</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody id="tablaCursos">
                    <tr>
                        <td colspan="4" class="text-center text-muted">Cargando cursos...</td>
                    </tr>
                </tbody>
            </table>

            <div id="formularioCurso" class="card p-4 mt-4 shadow"
                style="display:none; border-left: 5px solid #198754;">
                <div class="d-flex justify-content-between mb-3">
                    <h4 id="tituloForm" class="m-0">Crear / Editar Curso</h4>
                    <button class="btn-close"
                        onclick="document.getElementById('formularioCurso').style.display='none'"></button>
                </div>

                <input type="hidden" id="cursoId">

                <div class="mb-3">
                    <label class="form-label">Nombre del curso</label>
                    <input type="text" id="nombreCurso" class="form-control" placeholder="Ej: Matemáticas Avanzadas">
                </div>

                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <textarea id="descripcionCurso" class="form-control" rows="3"
                        placeholder="Describe de qué trata el curso..."></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Imagen de Portada</label>
                    <input type="file" id="archivoCurso" class="form-control">
                </div>

                <div class="d-flex gap-2">
                    <button class="btn btn-primary" onclick="guardarCurso()">Guardar Curso</button>
                    <button class="btn btn-secondary"
                        onclick="document.getElementById('formularioCurso').style.display='none'">Cancelar</button>
                </div>
            </div>
        </div>

    </section>


    <?php include 'php/footer.php'; ?>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script src="<?php echo $ruta; ?>js/maestroAdminCursos.js"></script>

    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>
</body>

</html>