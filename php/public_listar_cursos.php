<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    // JOIN con usuarios para saber el nombre del instructor
    $sql = "SELECT c.id, c.titulo, c.descripcion, c.imagen, u.nombre as instructor 
            FROM cursos c
            JOIN usuarios u ON c.id_instructor = u.id
            WHERE c.estado = 'activo' 
            ORDER BY c.fecha_creacion DESC";
            
    $stmt = $pdo->query($sql);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'cursos' => $cursos]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>