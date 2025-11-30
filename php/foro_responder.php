<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id_hilo = $input['id_hilo'] ?? '';
$mensaje = trim($input['mensaje'] ?? '');
$id_usuario = $_SESSION['user_id'];

if (empty($mensaje)) {
    echo json_encode(['success' => false, 'message' => 'Escribe un mensaje.']);
    exit;
}

try {
    $sql = "INSERT INTO foro_posts (id_hilo, id_usuario, mensaje) VALUES (:h, :u, :m)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':h' => $id_hilo, ':u' => $id_usuario, ':m' => $mensaje]);

    echo json_encode(['success' => true, 'message' => 'Respuesta enviada.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>