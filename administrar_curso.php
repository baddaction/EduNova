<?php
$ruta = './';
session_start();

// Seguridad
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    header("Location: login.html");
    exit;
}

//OBTENER Y VALIDAR EL ID DEL CURSO
$id_curso = $_GET['id'] ?? null;

//Si no hay ID o no es un número, mostrar el error y redirigir
if (empty($id_curso) || !is_numeric($id_curso)) {
    // Usamos el script para mostrar el mensaje antes de redirigir
    echo "<script>
        alert('Curso no especificado.');
        window.location.href='maestro.php';
    </script>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Administrar Temario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php include 'php/navbar.php'; ?>

    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Gestionar Contenido del Curso</h2>
            <a href="adminCursos.php" class="btn btn-outline-secondary">Volver a Mis Cursos</a>
        </div>

        <div class="card p-4 mb-4 shadow-sm border-primary" style="border-left: 5px solid blue;">
            <h4 class="mb-3">Agregar Nuevo Tema</h4>
            <form id="formTema">
                <div class="mb-3">
                    <label>Título del Tema</label>
                    <input type="text" id="tituloTema" class="form-control" placeholder="Ej: 1. Introducción..."
                        required>
                </div>
                <div class="mb-3">
                    <label>Descripción</label>
                    <textarea id="descTema" class="form-control" rows="2"
                        placeholder="De qué trata este tema..."></textarea>
                </div>
                <div class="mb-3">
                    <label>Material (PDF / Video / Imagen)</label>
                    <input type="file" id="archivoTema" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Guardar Tema</button>
            </form>
        </div>

        <h4 class="mb-3">Temario Actual</h4>
        <table class="table table-bordered table-hover">
            <thead class="table-light">
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Archivo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaTemas">
            </tbody>
        </table>
    </div>

    <?php include 'php/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
    <script> 
        const basePath = "<?php echo $ruta; ?>"; 
        const cursoId = <?php echo json_encode($id_curso); ?>; 
    </script>
    <script src="js/navbar.js"></script>
    <script src="js/maestroAdminTemas.js"></script>

</body>

</html>