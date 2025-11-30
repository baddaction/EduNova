<?php
require 'conexion.php';
header('Content-Type: application/json');

$id_hilo = $_GET['id_hilo'] ?? null;

if (!$id_hilo) {
    echo json_encode([]);
    exit;
}

try {
    // 1. Datos del Hilo (Título)
    $stmtH = $pdo->prepare("SELECT titulo FROM foro_hilos WHERE id = :id");
    $stmtH->execute([':id' => $id_hilo]);
    $hilo = $stmtH->fetch(PDO::FETCH_ASSOC);

    // 2. Posts del Hilo con nombre del usuario
    $sql = "SELECT p.id, p.mensaje, p.fecha, u.nombre as autor, u.rol 
            FROM foro_posts p
            JOIN usuarios u ON p.id_usuario = u.id
            WHERE p.id_hilo = :id
            ORDER BY p.fecha ASC"; // Cronológico

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_hilo]);
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'titulo' => $hilo['titulo'], 'posts' => $posts]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>