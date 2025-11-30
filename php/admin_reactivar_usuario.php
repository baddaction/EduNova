<?php
// php/admin_reactivar_usuario.php
require 'conexion.php';
header('Content-Type: application/json');
session_start();

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? '';

if (empty($id)) {
    echo json_encode(["success" => false, "message" => "ID no recibido."]);
    exit;
}

try {
    $check = $pdo->prepare("SELECT id, estado FROM usuarios WHERE id = ?");
    $check->execute([$id]);
    if ($check->rowCount() === 0) {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
        exit;
    }

    $row = $check->fetch(PDO::FETCH_ASSOC);
    if ($row['estado'] === 'activo') {
        echo json_encode(["success" => false, "message" => "Usuario ya está activo."]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE usuarios SET estado = 'activo' WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => true, "message" => "Usuario reactivado correctamente."]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
