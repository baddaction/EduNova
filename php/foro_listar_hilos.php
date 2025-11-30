<?php
require 'conexion.php';
header('Content-Type: application/json');

$id_curso = $_GET['id_curso'] ?? null;

if (!$id_curso) {
    echo json_encode([]);
    exit;
}

try {
    // Seleccionamos los hilos y contamos cuántas respuestas tiene cada uno
    $sql = "SELECT h.id, h.titulo, h.fecha,
            (SELECT COUNT(*) FROM foro_posts p WHERE p.id_hilo = h.id) as respuestas
            FROM foro_hilos h
            WHERE h.id_curso = :id
            ORDER BY h.fecha DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_curso]);
    $hilos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'hilos' => $hilos]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>