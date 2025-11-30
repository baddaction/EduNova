<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Acceso denegado.']);
    exit;
}

$id_curso = $_GET['id'] ?? null;

if (!$id_curso || !is_numeric($id_curso)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de curso inválido.']);
    exit;
}

try {
    // Obtener información principal del curso
    $sql_curso = "SELECT c.id, c.titulo, c.descripcion, u.nombre as nombre_maestro, c.estado, c.motivo_rechazo 
              FROM cursos c 
              JOIN usuarios u ON c.id_instructor = u.id 
              WHERE c.id = :id";



    $stmt_curso = $pdo->prepare($sql_curso);
    $stmt_curso->execute([':id' => $id_curso]);
    $curso = $stmt_curso->fetch(PDO::FETCH_ASSOC);

    if (!$curso) {
        echo json_encode(['success' => false, 'message' => 'Curso no encontrado.']);
        exit;
    }

    // Obtener el temario y archivos
    $sql_temas = "SELECT titulo, archivo FROM temas WHERE id_curso = :id ORDER BY id ASC";
    $stmt_temas = $pdo->prepare($sql_temas);
    $stmt_temas->execute([':id' => $id_curso]);
    $temas = $stmt_temas->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los resultados en un solo JSON
    echo json_encode([
        'success' => true,
        'curso' => $curso,
        'temario' => $temas
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de BD: ' . $e->getMessage()]);
}
?>