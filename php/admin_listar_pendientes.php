<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Seguridad: Solo admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

try {
    // Buscamos cursos con estado 'pendiente'
    $sql = "SELECT c.id, c.titulo, c.descripcion, c.fecha_creacion, u.nombre as instructor 
            FROM cursos c
            JOIN usuarios u ON c.id_instructor = u.id
            WHERE c.estado = 'pendiente'
            ORDER BY c.fecha_creacion ASC";
            
    $stmt = $pdo->query($sql);
    $pendientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolvemos la lista (aunque esté vacía, success es true)
    echo json_encode(['success' => true, 'cursos' => $pendientes]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>