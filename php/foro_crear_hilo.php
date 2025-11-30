<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id_curso = $input['id_curso'] ?? '';
$titulo = trim($input['titulo'] ?? '');
$mensaje = trim($input['mensaje'] ?? '');
$id_usuario = $_SESSION['user_id'];

if (empty($titulo) || empty($mensaje)) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos.']);
    exit;
}

try {
    $pdo->beginTransaction(); // Iniciamos transacción para asegurar que se guarden los dos

    // 1. Crear el Hilo
    $sqlHilo = "INSERT INTO foro_hilos (id_curso, titulo) VALUES (:c, :t)";
    $stmtH = $pdo->prepare($sqlHilo);
    $stmtH->execute([':c' => $id_curso, ':t' => $titulo]);
    $id_hilo = $pdo->lastInsertId();

    // 2. Crear el Primer Post (El mensaje inicial)
    $sqlPost = "INSERT INTO foro_posts (id_hilo, id_usuario, mensaje) VALUES (:h, :u, :m)";
    $stmtP = $pdo->prepare($sqlPost);
    $stmtP->execute([':h' => $id_hilo, ':u' => $id_usuario, ':m' => $mensaje]);

    $pdo->commit(); // Guardamos cambios
    echo json_encode(['success' => true, 'message' => 'Tema creado exitosamente.']);

} catch (Exception $e) {
    $pdo->rollBack(); // Si falla, deshacemos todo
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>