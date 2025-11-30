<?php
require 'conexion.php';
header('Content-Type: application/json');

$id_curso = $_GET['id_curso'] ?? '';

if (empty($id_curso)) {
    echo json_encode(['success' => false, 'message' => 'Falta el ID del curso']);
    exit;
}

try {
    // Traemos todos los temas de ese curso en orden
    $sql = "SELECT * FROM temas WHERE id_curso = :id ORDER BY id ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_curso]);
    $temas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'temas' => $temas]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>