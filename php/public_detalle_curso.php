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

    // TEMARIO 
    $sqlTemas = "SELECT titulo, descripcion, archivo FROM temas WHERE id_curso = :id ORDER BY id ASC";
    $stmtT = $pdo->prepare($sqlTemas);
    $stmtT->execute([':id' => $id_curso]);
    $temas = $stmtT->fetchAll(PDO::FETCH_ASSOC);

    // 3. Reseñas (Se mantiene igual por ahora)
    $resenas = []; 
    // Si ya tienes tabla de reseñas, aquí iría la consulta real.

    echo json_encode([
        'success' => true,
        'curso' => $curso,
        'temas' => $temas,   // Ahora enviamos los temas reales
        'resenas' => $resenas
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>