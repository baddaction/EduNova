<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Verificar si es alumno
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'alumno') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$id_alumno = $_SESSION['user_id'];

try {
    // Consulta JOIN corregida
    $sql = "SELECT c.id, c.titulo, c.descripcion, c.imagen 
            FROM cursos c
            INNER JOIN inscripciones i ON c.id = i.id_curso
            WHERE i.id_alumno = :id
            ORDER BY i.fecha DESC"; 
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_alumno]);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'cursos' => $cursos]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>