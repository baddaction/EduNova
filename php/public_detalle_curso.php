<?php
require 'conexion.php';
header('Content-Type: application/json');

$id_curso = $_GET['id'] ?? null;

if (!$id_curso) {
    echo json_encode(['success' => false, 'message' => 'Falta el ID del curso']);
    exit;
}

try {
    // Datos del Curso e Instructor
    $sql = "SELECT c.id, c.titulo, c.descripcion, c.imagen, c.fecha_creacion, u.nombre as instructor 
            FROM cursos c
            JOIN usuarios u ON c.id_instructor = u.id
            WHERE c.id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_curso]);
    $curso = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$curso) {
        echo json_encode(['success' => false, 'message' => 'Curso no encontrado']);
        exit;
    }

    // 2. Temario (Aún no tenemos tabla 'temas', así que enviamos vacío por ahora para que no falle el JS)
    // Cuando creemos la tabla 'temas' más adelante, descomentaremos esto.
    /*
    $sqlTemas = "SELECT titulo, descripcion FROM temas WHERE id_curso = :id";
    $stmtT = $pdo->prepare($sqlTemas);
    $stmtT->execute([':id' => $id_curso]);
    $temas = $stmtT->fetchAll(PDO::FETCH_ASSOC);
    */
    $temas = []; // Array vacío temporal

    // Reseñas (Igual, vacío por ahora)
    $resenas = [];

    echo json_encode([
        'success' => true,
        'curso' => $curso,
        'temas' => $temas,
        'resenas' => $resenas
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>