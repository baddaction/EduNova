<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Verificar si es maestro
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$id_maestro = $_SESSION['user_id'];

try {
    // Traer cursos del maestro logueado
    $sql = "SELECT id, titulo, descripcion, imagen, estado, fecha_creacion 
            FROM cursos 
            WHERE id_instructor = :id 
            ORDER BY fecha_creacion DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_maestro]);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'cursos' => $cursos]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>