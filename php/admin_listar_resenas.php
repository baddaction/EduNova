<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    // Traemos la reseña + Título del Curso + Nombre del Alumno
    $sql = "SELECT r.id, r.comentario, r.fecha, r.estado, 
                   c.titulo as curso, 
                   u.nombre as alumno 
            FROM resenas r
            JOIN cursos c ON r.id_curso = c.id
            JOIN usuarios u ON r.id_alumno = u.id
            ORDER BY r.fecha DESC"; // Las más recientes primero

    $stmt = $pdo->query($sql);
    $resenas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'resenas' => $resenas]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>